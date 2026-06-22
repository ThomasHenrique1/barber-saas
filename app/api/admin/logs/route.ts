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

    const result = await db.query(
      `
      SELECT
        a.*,
        u.name AS user_name,
        u.email AS user_email
      FROM "AuditLog" a
      JOIN "User" u
        ON u.id = a."userId"
      ORDER BY a."createdAt" DESC
      `
    );

    return NextResponse.json(
      result.rows
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao buscar logs",
      },
      {
        status: 500,
      }
    );
  }
}