"use server";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/audit";

type MarkAppointmentPaidResult = {
  success: boolean;
  error?: string;
  data?: {
    paymentId: string;
    appointmentId: string;
    status: string;
    method: string;
  };
};

const ALLOWED_METHODS = [
  "PIX",
  "CASH",
  "CARD",
] as const;

type PaymentMethod =
  (typeof ALLOWED_METHODS)[number];

export async function markAppointmentPaid(
  appointmentId: string,
  method: PaymentMethod
): Promise<MarkAppointmentPaidResult> {
  try {
    const user = await getUser();

    if (!user) {
      return {
        success: false,
        error: "Não autenticado.",
      };
    }

    if (
      user.role !== "ADMIN" &&
      user.role !== "BARBER"
    ) {
      return {
        success: false,
        error:
          "Você não possui permissão para registrar pagamentos.",
      };
    }

    if (!appointmentId) {
      return {
        success: false,
        error:
          "Agendamento não informado.",
      };
    }

    if (
      !ALLOWED_METHODS.includes(method)
    ) {
      return {
        success: false,
        error:
          "Método de pagamento inválido.",
      };
    }

    const appointmentResult =
      await db.query(
        `
        SELECT
          a.id,
          a."barberId",
          a.status AS appointment_status,

          p.id AS payment_id,
          p.status AS payment_status

        FROM "Appointment" a

        LEFT JOIN "Payment" p
          ON p."appointmentId" = a.id

        WHERE a.id = $1

        LIMIT 1
        `,
        [appointmentId]
      );

    if (
      appointmentResult.rows.length === 0
    ) {
      return {
        success: false,
        error:
          "Agendamento não encontrado.",
      };
    }

    const appointment =
      appointmentResult.rows[0];

    if (
      user.role === "BARBER" &&
      appointment.barberId !== user.id
    ) {
      return {
        success: false,
        error:
          "Você não possui permissão para alterar este pagamento.",
      };
    }

    if (
      appointment.appointment_status ===
      "CANCELED"
    ) {
      return {
        success: false,
        error:
          "Não é possível registrar pagamento de um agendamento cancelado.",
      };
    }

    if (!appointment.payment_id) {
      return {
        success: false,
        error:
          "Este agendamento não possui um pagamento registrado.",
      };
    }

    if (
      appointment.payment_status ===
      "PAID"
    ) {
      return {
        success: false,
        error:
          "Este pagamento já foi registrado como pago.",
      };
    }

    await db.query("BEGIN");

    try {
      const paymentResult =
        await db.query(
          `
          UPDATE "Payment"
          SET
            status = 'PAID',
            method = $1
          WHERE
            id = $2
          RETURNING
            id,
            "appointmentId",
            status,
            method
          `,
          [
            method,
            appointment.payment_id,
          ]
        );

      if (
        paymentResult.rows.length === 0
      ) {
        throw new Error(
          "Pagamento não encontrado durante a atualização."
        );
      }

      await db.query("COMMIT");

      await createAuditLog(
        "PAYMENT_RECEIVED",
        user.id,
        `Pagamento recebido: agendamento ${appointmentId}, método ${method}`
      );

      const payment =
        paymentResult.rows[0];

      return {
        success: true,
        data: {
          paymentId: payment.id,
          appointmentId:
            payment.appointmentId,
          status: payment.status,
          method: payment.method,
        },
      };
    } catch (error) {
      await db.query("ROLLBACK");

      throw error;
    }
  } catch (error) {
    console.error(
      "markAppointmentPaid:",
      error
    );

    return {
      success: false,
      error:
        "Erro ao registrar pagamento.",
    };
  }
}