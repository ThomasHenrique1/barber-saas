import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await db.query(
      `
      UPDATE "Appointment"
      SET status = 'CANCELED'
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Agendamento não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao cancelar agendamento",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const {
      date,
      barberId,
    } = body;

    if (!date || !barberId) {
      return NextResponse.json(
        {
          error: "date e barberId são obrigatórios",
        },
        {
          status: 400,
        }
      );
    }

    const existingAppointment = await db.query(
      `
      SELECT id
      FROM "Appointment"
      WHERE
        "barberId" = $1
        AND date = $2
        AND status != 'CANCELED'
        AND id != $3
      `,
      [barberId, date, id]
    );

    if (existingAppointment.rows.length > 0) {
      return NextResponse.json(
        {
          error: "Horário indisponível",
        },
        {
          status: 409,
        }
      );
    }

    const result = await db.query(
      `
      UPDATE "Appointment"
      SET date = $1
      WHERE id = $2
      RETURNING *
      `,
      [date, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Agendamento não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao reagendar",
      },
      {
        status: 500,
      }
    );
  }
}