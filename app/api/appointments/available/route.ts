import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams =
      req.nextUrl.searchParams;

    const barberId =
      searchParams.get("barberId");

    const serviceId =
      searchParams.get("serviceId");

    const date =
      searchParams.get("date");

    if (
      !barberId ||
      !serviceId ||
      !date
    ) {
      return NextResponse.json(
        {
          error:
            "barberId, serviceId e date são obrigatórios",
        },
        {
          status: 400,
        }
      );
    }

    // Serviço

    const serviceResult =
      await db.query(
        `
        SELECT duration
        FROM "Service"
        WHERE id = $1
        `,
        [serviceId]
      );

    if (
      serviceResult.rows.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Serviço não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const duration =
      serviceResult.rows[0].duration;

    // Agendamentos do barbeiro

    const appointments =
      await db.query(
        `
        SELECT
          a.date,
          s.duration
        FROM "Appointment" a
        JOIN "Service" s
          ON s.id = a."serviceId"
        WHERE
          a."barberId" = $1
          AND DATE(a.date) = DATE($2)
          AND a.status != 'CANCELED'
        `,
        [
          barberId,
          date,
        ]
      );

    // Configuração

    const OPEN_HOUR = 8;

    const CLOSE_HOUR = 20;

    const slots: string[] = [];

    const current =
      new Date(date);

    current.setHours(
      OPEN_HOUR,
      0,
      0,
      0
    );

    while (
      current.getHours() <
      CLOSE_HOUR
    ) {
      const slotStart =
        new Date(current);

      const slotEnd =
        new Date(slotStart);

      slotEnd.setMinutes(
        slotEnd.getMinutes() +
          duration
      );

      const closing =
        new Date(current);

      closing.setHours(
        CLOSE_HOUR,
        0,
        0,
        0
      );

      if (slotEnd > closing) {
        break;
      }

      const conflict =
        appointments.rows.some(
          (
            appointment: {
              date: string;
              duration: number;
            }
          ) => {
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
                appointment.duration
            );

            return (
              slotStart <
                existingEnd &&
              slotEnd >
                existingStart
            );
          }
        );

      if (!conflict) {
        slots.push(
          slotStart.toLocaleTimeString(
            "pt-BR",
            {
              hour: "2-digit",
              minute:
                "2-digit",
              hour12: false,
            }
          )
        );
      }

      current.setMinutes(
        current.getMinutes() +
          duration
      );
    }

    return NextResponse.json(
      slots
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao buscar horários disponíveis",
      },
      {
        status: 500,
      }
    );
  }
}