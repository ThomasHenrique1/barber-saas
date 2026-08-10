"use server";

import { db } from "@/lib/db";

export async function getClientAppointments(
  userId: string
) {
  const result = await db.query(
    `
      SELECT
        a.id,
        a.date,
        a.status,

        s.id AS "serviceId",
        s.name AS "serviceName",
        s.price,
        s.duration,

        b.id AS "barberId",
        b.name AS "barberName"

      FROM "Appointment" a

      INNER JOIN "Service" s
        ON s.id = a."serviceId"

      INNER JOIN "User" b
        ON b.id = a."barberId"

      WHERE a."clientId" = $1

      ORDER BY a.date DESC
    `,
    [userId]
  );

  return result.rows.map((row) => ({
    id: row.id,

    date: row.date,

    status: row.status,

    service: {
      id: row.serviceId,
      name: row.serviceName,
      price: Number(row.price),
      duration: row.duration,
    },

    barber: {
      id: row.barberId,
      name: row.barberName,
    },
  }));
}