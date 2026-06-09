import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getUser } from "@/lib/auth";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query(`
      SELECT *
      FROM "Service"
      WHERE active = true
      ORDER BY name
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao buscar serviços" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, description, price, duration } = body;

    if (!name || !price || !duration) {
      return NextResponse.json(
        { error: "Nome, preço e duração são obrigatórios" },
        { status: 400 }
      );
    }

    const user = await getUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 403 }
      );
    }

    const result = await db.query(
      `
      INSERT INTO "Service"
      (
        id,
        name,
        description,
        price,
        duration
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        uuidv4(),
        name,
        description ?? null,
        Number(price),
        Number(duration),
      ]
    );

    return NextResponse.json(result.rows[0], {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao criar serviço" },
      { status: 500 }
    );
  }
}