import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/audit";

export async function GET(req: Request) {
  try {
    const user = await getUser();

    const { searchParams } = new URL(req.url);

        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;

        const offset = (page - 1) * limit;
        const status = searchParams.get("status");
        const barberId = searchParams.get("barberId");
        const date = searchParams.get("date");

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

    let query = `
      SELECT
        a.*,
        c.name AS client_name,
        b.name AS barber_name,
        s.name AS service_name
      FROM "Appointment" a
      JOIN "User" c ON c.id = a."clientId"
      JOIN "User" b ON b.id = a."barberId"
      JOIN "Service" s ON s.id = a."serviceId"
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
          `a.status = $${values.length}`
        );
      }

      if (barberId) {
        values.push(barberId);

        conditions.push(
          `a."barberId" = $${values.length}`
        );
      }

      if (date) {
        values.push(date);

        conditions.push(
          `DATE(a.date) = DATE($${values.length})`
        );
      }

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(" AND ")} `;
      }

    query += `
      ORDER BY a.date
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const result = await db.query(query, values);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao buscar agendamentos",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      date,
      barberId,
      serviceId,
      notes,
    } = body;

    if (
      !date ||
      !barberId ||
      !serviceId
    )
    
    {
      return NextResponse.json(
        { error: "Campos obrigatórios não informados" },
        { status: 400 }
      );
    }

    const appointmentDate = new Date(date);

    if (appointmentDate < new Date()) {
      return NextResponse.json(
        {
          error: "Não é possível agendar no passado",
        },
        {
          status: 400,
        }
      );
    }

    const hour = appointmentDate.getHours();
      if (hour < 8 || hour >= 20) {
        return NextResponse.json(
          {
            error: "Fora do horário de atendimento",
          },
          {
            status: 400,
          }
        );
      }

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

    const serviceResult = await db.query(
  `
  SELECT duration
  FROM "Service"
  WHERE id = $1
  `,
  [serviceId]
);

if (serviceResult.rows.length === 0) {
  return NextResponse.json(
    {
      error: "Serviço não encontrado",
    },
    {
      status: 404,
    }
  );
}

const duration =
  serviceResult.rows[0].duration;

const startDate = new Date(date);

const endDate = new Date(startDate);

endDate.setMinutes(
  endDate.getMinutes() + duration
);

const existingAppointment = await db.query(
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
  [barberId]
);

const hasConflict =
  existingAppointment.rows.some(
    (appointment: {
      date: string;
      duration: number;
    }) => {
      const existingStart = new Date(
        appointment.date
      );

      const existingEnd = new Date(
        existingStart
      );

      existingEnd.setMinutes(
        existingEnd.getMinutes() +
          appointment.duration
      );

      return (
        startDate < existingEnd &&
        endDate > existingStart
      );
    }
  );

if (hasConflict) {
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
        uuidv4(),
        date,
        user.id,
        barberId,
        serviceId,
        notes ?? null,
      ]
    );

    await createAuditLog(
      "CREATE_APPOINTMENT",
      user.id,
      `Agendamento criado: ${result.rows[0].id}`
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
      { error: "Erro ao criar agendamento" },
      { status: 500 }
    );
  }
}