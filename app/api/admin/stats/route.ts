import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function GET() {
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

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Não autorizado",
        },
        {
          status: 403,
        }
      );
    }

    const usersResult = await db.query(`
      SELECT COUNT(*)::int AS total
      FROM "User"
    `);

    const clientsResult = await db.query(`
      SELECT COUNT(*)::int AS total
      FROM "User"
      WHERE role = 'CLIENT'
    `);

    const appointmentsResult = await db.query(`
      SELECT COUNT(*)::int AS total
      FROM "Appointment"
    `);

    const appointmentsTodayResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Appointment"
        WHERE DATE(date) = CURRENT_DATE
      `);

    const appointmentsMonthResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Appointment"
        WHERE DATE_TRUNC('month', date)
          = DATE_TRUNC('month', CURRENT_DATE)
      `);

    const servicesResult = await db.query(`
      SELECT COUNT(*)::int AS total
      FROM "Service"
    `);

    const activeServicesResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Service"
        WHERE active = true
      `);

    const revenueResult = await db.query(`
      SELECT
        COALESCE(SUM(s.price), 0)::float AS total
      FROM "Appointment" a
      JOIN "Service" s
        ON s.id = a."serviceId"
      WHERE a.status = 'COMPLETED'
    `);

    return NextResponse.json({
      users:
        usersResult.rows[0].total,

      clients:
        clientsResult.rows[0].total,

      appointments:
        appointmentsResult.rows[0].total,

      appointmentsToday:
        appointmentsTodayResult.rows[0].total,

      appointmentsMonth:
        appointmentsMonthResult.rows[0].total,

      services:
        servicesResult.rows[0].total,

      activeServices:
        activeServicesResult.rows[0].total,

      revenue:
        revenueResult.rows[0].total,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao buscar estatísticas",
      },
      {
        status: 500,
      }
    );
  }
}