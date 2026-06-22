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

    const totalPaymentsResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Payment"
      `);

    const pendingPaymentsResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Payment"
        WHERE status = 'PENDING'
      `);

    const paidPaymentsResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Payment"
        WHERE status = 'PAID'
      `);

    const refundedPaymentsResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Payment"
        WHERE status = 'REFUNDED'
      `);

    const totalRevenueResult =
      await db.query(`
        SELECT COALESCE(SUM(amount), 0)::float AS total
        FROM "Payment"
        WHERE status = 'PAID'
      `);

    const pixPaymentsResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Payment"
        WHERE method = 'PIX'
      `);

    const cardPaymentsResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Payment"
        WHERE method = 'CARD'
      `);

    const cashPaymentsResult =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM "Payment"
        WHERE method = 'CASH'
      `);

    return NextResponse.json({
      totalPayments:
        totalPaymentsResult.rows[0].total,
      pendingPayments:
        pendingPaymentsResult.rows[0].total,
      paidPayments:
        paidPaymentsResult.rows[0].total,
      refundedPayments:
        refundedPaymentsResult.rows[0].total,
      totalRevenue:
        totalRevenueResult.rows[0].total,
      pixPayments:
        pixPaymentsResult.rows[0].total,
      cardPayments:
        cardPaymentsResult.rows[0].total,
      cashPayments:
        cashPaymentsResult.rows[0].total,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao buscar estatísticas de pagamentos",
      },
      {
        status: 500,
      }
    );
  }
}