"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

type CancelAppointmentResult = {
  success: boolean;
  error?: string;
};

export async function cancelAppointment(
  appointmentId: string
): Promise<CancelAppointmentResult> {
  try {
    if (!appointmentId) {
      return {
        success: false,
        error: "Agendamento não informado",
      };
    }

    const user = await getUser();

    if (!user) {
      return {
        success: false,
        error: "Não autenticado",
      };
    }

    const appointmentResult = await db.query(
      `
        SELECT
          a.id,
          a.status,
          a."clientId",
          a."barberId",
          a.date,
          s.name AS "serviceName"
        FROM "Appointment" a
        INNER JOIN "Service" s
          ON s.id = a."serviceId"
        WHERE a.id = $1
        LIMIT 1
      `,
      [appointmentId]
    );

    if (appointmentResult.rows.length === 0) {
      return {
        success: false,
        error: "Agendamento não encontrado",
      };
    }

    const appointment = appointmentResult.rows[0];

    /*
     * CLIENT:
     * Pode cancelar apenas os próprios agendamentos.
     *
     * BARBER:
     * Pode cancelar apenas agendamentos vinculados a ele.
     *
     * ADMIN:
     * Pode cancelar qualquer agendamento.
     */

    const hasPermission =
      user.role === "ADMIN" ||
      (user.role === "CLIENT" &&
        appointment.clientId === user.id) ||
      (user.role === "BARBER" &&
        appointment.barberId === user.id);

    if (!hasPermission) {
      return {
        success: false,
        error:
          "Você não tem permissão para cancelar este agendamento",
      };
    }

    if (appointment.status === "CANCELED") {
      return {
        success: false,
        error: "Este agendamento já foi cancelado",
      };
    }

    if (appointment.status === "COMPLETED") {
      return {
        success: false,
        error:
          "Não é possível cancelar um agendamento concluído",
      };
    }

    const result = await db.query(
      `
        UPDATE "Appointment"
        SET status = 'CANCELED'
        WHERE id = $1
        RETURNING
          id,
          date,
          status,
          "clientId",
          "barberId",
          "serviceId"
      `,
      [appointmentId]
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        error: "Não foi possível cancelar o agendamento",
      };
    }

    await createAuditLog(
      "CANCEL_APPOINTMENT",
      user.id,
      `Agendamento cancelado: ${appointmentId} | Serviço: ${appointment.serviceName}`
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      "Erro ao cancelar agendamento:",
      error
    );

    return {
      success: false,
      error: "Erro ao cancelar agendamento",
    };
  }
}