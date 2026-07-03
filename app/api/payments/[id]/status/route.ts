import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

const validStatus = [
  "PENDING",
  "PAID",
  "REFUNDED",
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

    const paymentResult = await db.query(
      `
      SELECT
        p.*,
        a."barberId"
      FROM "Payment" p
      JOIN "Appointment" a
        ON a.id = p."appointmentId"
      WHERE p.id = $1
      `,
      [id]
    );

    if (paymentResult.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Pagamento não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const payment =
      paymentResult.rows[0];

    if (
      user.role === "BARBER" &&
      payment.barberId !== user.id
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

    if (
      payment.status === "REFUNDED" &&
      status !== "REFUNDED"
    ) {
      return NextResponse.json(
        {
          error:
            "Pagamento já foi reembolsado",
        },
        {
          status: 400,
        }
      );
    }

    const result = await db.query(
      `
      UPDATE "Payment"
      SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id]
    );

    return NextResponse.json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao atualizar pagamento",
      },
      {
        status: 500,
      }
    );
  }
}