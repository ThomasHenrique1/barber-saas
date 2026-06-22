import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function PATCH(req: Request) {
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

    const body = await req.json();

    const {
      currentPassword,
      newPassword,
    } = body;

    if (
      !currentPassword ||
      !newPassword
    ) {
      return NextResponse.json(
        {
          error: "Campos obrigatórios não informados",
        },
        {
          status: 400,
        }
      );
    }

    const result = await db.query(
      `
      SELECT password
      FROM "User"
      WHERE id = $1
      `,
      [user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Usuário não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        currentPassword,
        result.rows[0].password
      );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error: "Senha atual incorreta",
        },
        {
          status: 401,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await db.query(
      `
      UPDATE "User"
      SET password = $1
      WHERE id = $2
      `,
      [
        hashedPassword,
        user.id,
      ]
    );

    return NextResponse.json({
      message:
        "Senha alterada com sucesso",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao alterar senha",
      },
      {
        status: 500,
      }
    );
  }
}