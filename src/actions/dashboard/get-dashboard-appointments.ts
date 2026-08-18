"use server";

import { db } from "@/lib/db";

export type DashboardAppointment = {
  id: string;
  date: Date;
  status: string;

  client: {
    id: string;
    name: string;
  };

  barber: {
    id: string;
    name: string;
  };

  service: {
    id: string;
    name: string;
    duration: number;
    price: number;
  };

  payment: {
    id: string | null;
    status: string;
  };
};

type GetDashboardAppointmentsParams = {
  userId: string;
  role: string;
  date?: string;
  status?: string;
  barberId?: string;
};

export async function getDashboardAppointments({
  userId,
  role,
  date,
  status,
  barberId,
}: GetDashboardAppointmentsParams): Promise<
  DashboardAppointment[]
> {
  const values: string[] = [];

  const conditions: string[] = [];

  if (role === "BARBER") {
    values.push(userId);

    conditions.push(
      `a."barberId" = $${values.length}`
    );
  }

  if (role === "CLIENT") {
    values.push(userId);

    conditions.push(
      `a."clientId" = $${values.length}`
    );
  }

  if (role === "ADMIN" && barberId) {
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

  if (status) {
    values.push(status);

    conditions.push(
      `a.status = $${values.length}`
    );
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  const result = await db.query(
    `
      SELECT
        a.id,
        a.date,
        a.status,

        c.id AS client_id,
        c.name AS client_name,

        b.id AS barber_id,
        b.name AS barber_name,

        s.id AS service_id,
        s.name AS service_name,
        s.duration AS service_duration,
        s.price AS service_price,

        p.id AS payment_id,
        p.status AS payment_status

      FROM "Appointment" a

      INNER JOIN "User" c
        ON c.id = a."clientId"

      INNER JOIN "User" b
        ON b.id = a."barberId"

      INNER JOIN "Service" s
        ON s.id = a."serviceId"

      LEFT JOIN "Payment" p
        ON p."appointmentId" = a.id

      ${whereClause}

      ORDER BY a.date ASC
    `,
    values
  );

  return result.rows.map((row) => ({
    id: row.id,

    date: row.date,

    status: row.status,

    client: {
      id: row.client_id,
      name: row.client_name,
    },

    barber: {
      id: row.barber_id,
      name: row.barber_name,
    },

    service: {
      id: row.service_id,
      name: row.service_name,
      duration: Number(row.service_duration),
      price: Number(row.service_price),
    },

    payment: {
      id: row.payment_id ?? null,
      status: row.payment_status ?? "PENDING",
    },
  }));
}