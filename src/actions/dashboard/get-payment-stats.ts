"use server";

import { db } from "@/lib/db";

export type PaymentStats = {
  totalReceived: number;
  totalPending: number;
  receivedToday: number;
  pendingToday: number;
  paidCount: number;
  pendingCount: number;
};

export type DashboardPayment = {
  id: string;
  appointmentId: string;
  amount: number;
  method: string;
  status: string;
  createdAt: Date;

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
  };

  appointmentDate: Date;
};

export type PaymentDashboardData = {
  stats: PaymentStats;
  payments: DashboardPayment[];
};

export async function getPaymentStats(): Promise<PaymentDashboardData> {
  const statsResult = await db.query(`
    SELECT
      COALESCE(
        SUM(
          CASE
            WHEN p.status = 'PAID'
            THEN p.amount
            ELSE 0
          END
        ),
        0
      )::float AS total_received,

      COALESCE(
        SUM(
          CASE
            WHEN p.status = 'PENDING'
            THEN p.amount
            ELSE 0
          END
        ),
        0
      )::float AS total_pending,

      COALESCE(
        SUM(
          CASE
            WHEN p.status = 'PAID'
              AND DATE(p."createdAt") = CURRENT_DATE
            THEN p.amount
            ELSE 0
          END
        ),
        0
      )::float AS received_today,

      COALESCE(
        SUM(
          CASE
            WHEN p.status = 'PENDING'
              AND DATE(a.date) = CURRENT_DATE
            THEN p.amount
            ELSE 0
          END
        ),
        0
      )::float AS pending_today,

      COUNT(
        CASE
          WHEN p.status = 'PAID'
          THEN 1
        END
      )::int AS paid_count,

      COUNT(
        CASE
          WHEN p.status = 'PENDING'
          THEN 1
        END
      )::int AS pending_count

    FROM "Payment" p

    INNER JOIN "Appointment" a
      ON a.id = p."appointmentId"
  `);

  const paymentsResult = await db.query(`
    SELECT
      p.id,
      p."appointmentId",
      p.amount,
      p.method,
      p.status,
      p."createdAt",

      a.date AS appointment_date,

      c.id AS client_id,
      c.name AS client_name,

      b.id AS barber_id,
      b.name AS barber_name,

      s.id AS service_id,
      s.name AS service_name

    FROM "Payment" p

    INNER JOIN "Appointment" a
      ON a.id = p."appointmentId"

    INNER JOIN "User" c
      ON c.id = a."clientId"

    INNER JOIN "User" b
      ON b.id = a."barberId"

    INNER JOIN "Service" s
      ON s.id = a."serviceId"

    ORDER BY
      CASE
        WHEN p.status = 'PENDING'
        THEN 0
        ELSE 1
      END,
      a.date DESC
  `);

  const statsRow = statsResult.rows[0];

  return {
    stats: {
      totalReceived: Number(
        statsRow.total_received
      ),

      totalPending: Number(
        statsRow.total_pending
      ),

      receivedToday: Number(
        statsRow.received_today
      ),

      pendingToday: Number(
        statsRow.pending_today
      ),

      paidCount: Number(
        statsRow.paid_count
      ),

      pendingCount: Number(
        statsRow.pending_count
      ),
    },

    payments: paymentsResult.rows.map(
      (row) => ({
        id: row.id,

        appointmentId:
          row.appointmentId,

        amount: Number(row.amount),

        method: row.method,

        status: row.status,

        createdAt:
          row.createdAt,

        appointmentDate:
          row.appointment_date,

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
        },
      })
    ),
  };
}