"use server";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";

export type HistoryAppointment = {
  id: string;
  date: string;
  status: string;
  service: {
    name: string;
    duration: number;
    price: number;
  };
  barber: {
    id: string;
    name: string;
  };
};

export async function getHistory(): Promise<
  HistoryAppointment[]
> {
  try {
    const user = await getUser();

    if (!user) {
      return [];
    }

    if (user.role !== "CLIENT") {
      return [];
    }

    const result = await db.query(
      `
      SELECT
        a.id,
        a.date,
        a.status,

        s.name AS service_name,
        s.duration AS service_duration,
        s.price AS service_price,

        b.id AS barber_id,
        b.name AS barber_name

      FROM "Appointment" a

      INNER JOIN "Service" s
        ON s.id = a."serviceId"

      INNER JOIN "User" b
        ON b.id = a."barberId"

      WHERE
        a."clientId" = $1

      ORDER BY
        a.date DESC
      `,
      [user.id]
    );

    return result.rows.map(
      (appointment) => ({
        id: appointment.id,

        date:
          appointment.date instanceof Date
            ? appointment.date.toISOString()
            : appointment.date,

        status:
          appointment.status,

        service: {
          name:
            appointment.service_name,

          duration:
            Number(
              appointment.service_duration
            ),

          price:
            Number(
              appointment.service_price
            ),
        },

        barber: {
          id:
            appointment.barber_id,

          name:
            appointment.barber_name,
        },
      })
    );
  } catch (error) {
    console.error(
      "getHistory:",
      error
    );

    return [];
  }
}