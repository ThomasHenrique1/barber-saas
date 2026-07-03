import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        {
          error: "Token e senha são obrigatórios",
        },
        {
          status: 400,
        }
      );
    }

    const tokenResult = await db.query(
      `
      SELECT *
      FROM "PasswordResetToken"
      WHERE token = $1
      `,
      [token]
    );

    if (tokenResult.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Token inválido",
        },
        {
          status: 404,
        }
      );
    }

    const resetToken = tokenResult.rows[0];

    if (
      new Date(resetToken.expires_at) <
      new Date()
    ) {
      return NextResponse.json(
        {
          error: "Token expirado",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await db.query(
      `
      UPDATE "User"
      SET password = $1
      WHERE id = $2
      `,
      [
        hashedPassword,
        resetToken.userId,
      ]
    );

    await db.query(
      `
      DELETE FROM "PasswordResetToken"
      WHERE token = $1
      `,
      [token]
    );

    return NextResponse.json({
      message:
        "Senha redefinida com sucesso",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao redefinir senha",
      },
      {
        status: 500,
      }
    );
  }
}