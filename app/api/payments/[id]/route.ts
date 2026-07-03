import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function GET(
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

    const { id } = await params;

    const result = await db.query(
      `
      SELECT
        p.*,
        a.date AS appointment_date,
        a."clientId",
        a."barberId",
        c.name AS client_name,
        b.name AS barber_name,
        s.name AS service_name
      FROM "Payment" p
      JOIN "Appointment" a
        ON a.id = p."appointmentId"
      JOIN "User" c
        ON c.id = a."clientId"
      JOIN "User" b
        ON b.id = a."barberId"
      JOIN "Service" s
        ON s.id = a."serviceId"
      WHERE p.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Pagamento não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const payment = result.rows[0];

    if (
      user.role === "CLIENT" &&
      payment.clientId !== user.id
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

    return NextResponse.json(payment);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao buscar pagamento",
      },
      {
        status: 500,
      }
    );
  }
}