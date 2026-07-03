import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

const validMethods = [
  "PIX",
  "CARD",
  "CASH",
];

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);

    const page =
      Number(searchParams.get("page")) || 1;
    const limit =
      Number(searchParams.get("limit")) || 10;

    const offset = (page - 1) * limit;

    const status = searchParams.get("status");
    const method = searchParams.get("method");
    const appointmentId =
      searchParams.get("appointmentId");
    const barberId =
      searchParams.get("barberId");
    const clientId =
      searchParams.get("clientId");

    let query = `
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
    `;

    const values: (string | number)[] = [];
    const conditions: string[] = [];

    if (user.role === "CLIENT") {
      values.push(user.id);

      conditions.push(
        `a."clientId" = $${values.length}`
      );
    }

    if (user.role === "BARBER") {
      values.push(user.id);

      conditions.push(
        `a."barberId" = $${values.length}`
      );
    }

    if (status) {
      values.push(status);

      conditions.push(
        `p.status = $${values.length}`
      );
    }

    if (method) {
      values.push(method);

      conditions.push(
        `p.method = $${values.length}`
      );
    }

    if (appointmentId) {
      values.push(appointmentId);

      conditions.push(
        `p."appointmentId" = $${values.length}`
      );
    }

    if (barberId && user.role === "ADMIN") {
      values.push(barberId);

      conditions.push(
        `a."barberId" = $${values.length}`
      );
    }

    if (clientId && user.role === "ADMIN") {
      values.push(clientId);

      conditions.push(
        `a."clientId" = $${values.length}`
      );
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")} `;
    }

    query += `
      ORDER BY p."createdAt" DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const result = await db.query(
      query,
      values
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao buscar pagamentos",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
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

    const body = await req.json();

    const {
      appointmentId,
      method,
    } = body;

    if (
      !appointmentId ||
      !method
    ) {
      return NextResponse.json(
        {
          error:
            "Campos obrigatórios não informados",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !validMethods.includes(method)
    ) {
      return NextResponse.json(
        {
          error:
            "Método de pagamento inválido",
        },
        {
          status: 400,
        }
      );
    }

    const appointmentResult =
      await db.query(
        `
        SELECT
          a.id,
          s.price
        FROM "Appointment" a
        JOIN "Service" s
          ON s.id = a."serviceId"
        WHERE a.id = $1
        `,
        [appointmentId]
      );

    if (
      appointmentResult.rows.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Agendamento não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const existingPayment =
      await db.query(
        `
        SELECT id
        FROM "Payment"
        WHERE "appointmentId" = $1
        `,
        [appointmentId]
      );

    if (
      existingPayment.rows.length > 0
    ) {
      return NextResponse.json(
        {
          error:
            "Pagamento já existe para este agendamento",
        },
        {
          status: 409,
        }
      );
    }

    const amount =
      appointmentResult.rows[0].price;

    const result = await db.query(
      `
      INSERT INTO "Payment"
      (
        id,
        "appointmentId",
        amount,
        method,
        status
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        'PENDING'
      )
      RETURNING *
      `,
      [
        uuidv4(),
        appointmentId,
        amount,
        method,
      ]
    );

    return NextResponse.json(
      result.rows[0],
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao criar pagamento",
      },
      {
        status: 500,
      }
    );
  }
}