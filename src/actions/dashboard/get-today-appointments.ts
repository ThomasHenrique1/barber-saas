"use server";

import { db } from "@/lib/db";

export type TodayAppointment = {
  id: string;
  time: string;
  client: string;
  service: string;
  barber: string;
  status:
    | "CONFIRMED"
    | "PENDING"
    | "FINISHED";
};

export async function getTodayAppointments(
  userId: string,
  role: string
): Promise<TodayAppointment[]> {
  const values: string[] = [];

  const conditions: string[] = [
    `DATE(a.date) = CURRENT_DATE`,
  ];

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

  const result = await db.query(
    `
      SELECT
        a.id,
        a.date,
        a.status,

        c.name AS client_name,
        b.name AS barber_name,
        s.name AS service_name

      FROM "Appointment" a

      INNER JOIN "User" c
        ON c.id = a."clientId"

      INNER JOIN "User" b
        ON b.id = a."barberId"

      INNER JOIN "Service" s
        ON s.id = a."serviceId"

      WHERE ${conditions.join(" AND ")}

      ORDER BY a.date ASC
    `,
    values
  );

  return result.rows.map((row) => ({
    id: row.id,

    time: new Date(row.date).toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    ),

    client: row.client_name,

    service: row.service_name,

    barber: row.barber_name,

    status:
      row.status === "COMPLETED"
        ? "FINISHED"
        : row.status === "PENDING"
        ? "PENDING"
        : "CONFIRMED",
  }));
}