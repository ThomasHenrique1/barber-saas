import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          error: "Email obrigatório",
        },
        {
          status: 400,
        }
      );
    }

    const userResult = await db.query(
      `
      SELECT id
      FROM "User"
      WHERE email = $1
      `,
      [email]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Usuário não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const userId = userResult.rows[0].id;

    const token = uuidv4();

    const expiresAt = new Date();

    expiresAt.setHours(
      expiresAt.getHours() + 1
    );

    await db.query(
      `
      INSERT INTO "PasswordResetToken"
      (
        id,
        token,
        "userId",
        expires_at
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4
      )
      `,
      [
        uuidv4(),
        token,
        userId,
        expiresAt,
      ]
    );

    return NextResponse.json({
      message:
        "Token de recuperação gerado",
      token,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao gerar recuperação de senha",
      },
      {
        status: 500,
      }
    );
  }
}