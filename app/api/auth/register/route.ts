import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { registerSchema } from "@/validators/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    const existingUser = await db.query(
      'SELECT id FROM "User" WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Email já cadastrado" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      `
      INSERT INTO "User"
      (id, name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
      `,
      [uuidv4(), name, email, hashedPassword]
    );

    return NextResponse.json(
      {
        message: "Usuário criado com sucesso",
        user: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}