"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

type RescheduleAppointmentParams = {
  appointmentId: string;
  date: string | Date;
};

type RescheduleAppointmentResult = {
  success: boolean;
  error?: string;
  appointment?: {
    id: string;
    date: Date;
    status: string;
  };
};

export async function rescheduleAppointment({
  appointmentId,
  date,
}: RescheduleAppointmentParams): Promise<RescheduleAppointmentResult> {
  try {
    if (!appointmentId || !date) {
      return {
        success: false,
        error: "Agendamento e nova data são obrigatórios",
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
          a.date,
          a.status,
          a."clientId",
          a."barberId",
          a."serviceId",
          s.name AS "serviceName",
          s.duration
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
          "Você não tem permissão para reagendar este agendamento",
      };
    }

    if (appointment.status === "CANCELED") {
      return {
        success: false,
        error:
          "Não é possível reagendar um agendamento cancelado",
      };
    }

    if (appointment.status === "COMPLETED") {
      return {
        success: false,
        error:
          "Não é possível reagendar um agendamento concluído",
      };
    }

    const newDate = new Date(date);

    if (Number.isNaN(newDate.getTime())) {
      return {
        success: false,
        error: "Data inválida",
      };
    }

    if (newDate <= new Date()) {
      return {
        success: false,
        error:
          "Não é possível reagendar para uma data passada",
      };
    }

    const openingMinutes = 8 * 60;
    const closingMinutes = 20 * 60;

    const startMinutes =
      newDate.getHours() * 60 +
      newDate.getMinutes();

    if (
      startMinutes < openingMinutes ||
      startMinutes >= closingMinutes
    ) {
      return {
        success: false,
        error:
          "O novo horário está fora do horário de atendimento",
      };
    }

    const duration = Number(appointment.duration);

    const endDate = new Date(newDate);

    endDate.setMinutes(
      endDate.getMinutes() + duration
    );

    const endMinutes =
      endDate.getHours() * 60 +
      endDate.getMinutes();

    if (endMinutes > closingMinutes) {
      return {
        success: false,
        error:
          "O serviço não pode terminar após o horário de atendimento",
      };
    }

    const existingAppointments = await db.query(
      `
        SELECT
          a.id,
          a.date,
          s.duration
        FROM "Appointment" a
        INNER JOIN "Service" s
          ON s.id = a."serviceId"
        WHERE
          a."barberId" = $1
          AND a.id != $2
          AND a.status != 'CANCELED'
      `,
      [
        appointment.barberId,
        appointmentId,
      ]
    );

    const hasConflict =
      existingAppointments.rows.some(
        (existingAppointment) => {
          const existingStart = new Date(
            existingAppointment.date
          );

          const existingEnd =
            new Date(existingStart);

          existingEnd.setMinutes(
            existingEnd.getMinutes() +
              Number(
                existingAppointment.duration
              )
          );

          return (
            newDate < existingEnd &&
            endDate > existingStart
          );
        }
      );

    if (hasConflict) {
      return {
        success: false,
        error:
          "O horário selecionado não está disponível",
      };
    }

    const result = await db.query(
      `
        UPDATE "Appointment"
        SET date = $1
        WHERE id = $2
        RETURNING
          id,
          date,
          status
      `,
      [
        newDate,
        appointmentId,
      ]
    );

    if (result.rows.length === 0) {
      return {
        success: false,
        error:
          "Não foi possível reagendar o agendamento",
      };
    }

    await createAuditLog(
      "RESCHEDULE_APPOINTMENT",
      user.id,
      `Agendamento reagendado: ${appointmentId} | Serviço: ${appointment.serviceName} | Nova data: ${newDate.toISOString()}`
    );

    return {
      success: true,
      appointment: {
        id: result.rows[0].id,
        date: result.rows[0].date,
        status: result.rows[0].status,
      },
    };
  } catch (error) {
    console.error(
      "Erro ao reagendar agendamento:",
      error
    );

    return {
      success: false,
      error: "Erro ao reagendar agendamento",
    };
  }
}