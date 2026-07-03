import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";
import { createAuditLog } from "@/lib/audit";

const validStatus = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELED",
];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Não autenticado",
        },
        {
          status: 401,
        }
      );
    }

    if (
      user.role !== "ADMIN" &&
      user.role !== "BARBER"
    ) {
      return NextResponse.json(
        {
          error: "Não autorizado",
        },
        {
          status: 403,
        }
      );
    }

    const { id } = await params;

    const body = await req.json();

    const { status } = body;

    if (!validStatus.includes(status)) {
      return NextResponse.json(
        {
          error: "Status inválido",
        },
        {
          status: 400,
        }
      );
    }

    const appointmentResult = await db.query(
  `
  SELECT status
  FROM "Appointment"
  WHERE id = $1
  `,
  [id]
);

if (appointmentResult.rows.length === 0) {
  return NextResponse.json(
    {
      error: "Agendamento não encontrado",
    },
    {
      status: 404,
    }
  );
}

const currentStatus =
  appointmentResult.rows[0].status;

if (currentStatus === "CANCELED" &&
  status !== "CANCELED") {
  return NextResponse.json(
    {
      error: "Agendamento já cancelado",
    },
    {
      status: 400,
    }
  );
}

if (currentStatus === "COMPLETED" &&
  status !== "COMPLETED") {
  return NextResponse.json(
    {
      error: "Agendamento já finalizado",
    },
    {
      status: 400,
    }
  );
}

    const result = await db.query(
      `
      UPDATE "Appointment"
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
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

      if (status === "CONFIRMED") {
        await createAuditLog(
          "CONFIRM_APPOINTMENT",
          user.id,
          `Agendamento confirmado: ${id}`
        );
      }

      if (status === "COMPLETED") {
        await createAuditLog(
          "COMPLETE_APPOINTMENT",
          user.id,
          `Agendamento finalizado: ${id}`
        );
      }

      if (status === "CANCELED") {
        await createAuditLog(
          "CANCEL_APPOINTMENT",
          user.id,
          `Agendamento cancelado: ${id}`
        );
      }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao atualizar status",
      },
      {
        status: 500,
      }
    );
  }
}