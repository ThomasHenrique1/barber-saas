"use server";

import { v4 as uuidv4 } from "uuid";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/audit";

type CreateAppointmentInput = {
  date: string;
  barberId: string;
  serviceId: string;
  notes?: string;
};

type CreateAppointmentResult = {
  success: boolean;
  data?: unknown;
  error?: string;
};

export async function createAppointmentAction(
  input: CreateAppointmentInput
): Promise<CreateAppointmentResult> {
  try {
    const user = await getUser();

    if (!user) {
      return {
        success: false,
        error: "Não autenticado",
      };
    }

    if (user.role !== "CLIENT") {
      return {
        success: false,
        error:
          "Apenas clientes podem realizar agendamentos.",
      };
    }

    if (
      !input.date ||
      !input.barberId ||
      !input.serviceId
    ) {
      return {
        success: false,
        error:
          "Dados do agendamento incompletos.",
      };
    }

    const appointmentDate =
      new Date(input.date);

    if (
      Number.isNaN(
        appointmentDate.getTime()
      )
    ) {
      return {
        success: false,
        error: "Data do agendamento inválida.",
      };
    }

    if (
      appointmentDate < new Date()
    ) {
      return {
        success: false,
        error:
          "Não é possível agendar no passado.",
      };
    }

    const hour =
      appointmentDate.getHours();

    if (
      hour < 8 ||
      hour >= 20
    ) {
      return {
        success: false,
        error:
          "Fora do horário de atendimento.",
      };
    }

    const serviceResult =
      await db.query(
        `
        SELECT
          id,
          duration,
          active
        FROM "Service"
        WHERE id = $1
        `,
        [input.serviceId]
      );

    if (
      serviceResult.rows.length === 0
    ) {
      return {
        success: false,
        error: "Serviço não encontrado.",
      };
    }

    const service =
      serviceResult.rows[0];

    if (!service.active) {
      return {
        success: false,
        error:
          "Este serviço não está disponível.",
      };
    }

    const barberResult =
      await db.query(
        `
        SELECT
          id,
          name
        FROM "User"
        WHERE
          id = $1
          AND role = 'BARBER'
          AND active = true
        `,
        [input.barberId]
      );

    if (
      barberResult.rows.length === 0
    ) {
      return {
        success: false,
        error:
          "Barbeiro não encontrado ou indisponível.",
      };
    }

    const duration =
      Number(service.duration);

    const startDate =
      new Date(appointmentDate);

    const endDate =
      new Date(startDate);

    endDate.setMinutes(
      endDate.getMinutes() +
        duration
    );

    const existingAppointments =
      await db.query(
        `
        SELECT
          a.id,
          a.date,
          s.duration
        FROM "Appointment" a
        JOIN "Service" s
          ON s.id = a."serviceId"
        WHERE
          a."barberId" = $1
          AND a.status != 'CANCELED'
        `,
        [input.barberId]
      );

    const hasConflict =
      existingAppointments.rows.some(
        (appointment: {
          date: string | Date;
          duration: number;
        }) => {
          const existingStart =
            new Date(
              appointment.date
            );

          const existingEnd =
            new Date(
              existingStart
            );

          existingEnd.setMinutes(
            existingEnd.getMinutes() +
              Number(
                appointment.duration
              )
          );

          return (
            startDate <
              existingEnd &&
            endDate >
              existingStart
          );
        }
      );

    if (hasConflict) {
      return {
        success: false,
        error:
          "Horário indisponível. Escolha outro horário.",
      };
    }

    const appointmentId =
      uuidv4();

    const result =
      await db.query(
        `
        INSERT INTO "Appointment"
        (
          id,
          date,
          "clientId",
          "barberId",
          "serviceId",
          notes
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6
        )
        RETURNING *
        `,
        [
          appointmentId,
          appointmentDate,
          user.id,
          input.barberId,
          input.serviceId,
          input.notes ?? null,
        ]
      );

    await createAuditLog(
      "CREATE_APPOINTMENT",
      user.id,
      `Agendamento criado: ${appointmentId}`
    );

    return {
      success: true,
      data: result.rows[0],
    };
  } catch (error) {
    console.error(
      "createAppointmentAction:",
      error
    );

    return {
      success: false,
      error:
        "Erro ao criar agendamento.",
    };
  }
}