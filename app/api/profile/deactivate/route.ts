import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function PATCH() {
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

    await db.query(
      `
      UPDATE "User"
      SET active = false
      WHERE id = $1
      `,
      [user.id]
    );

    return NextResponse.json({
      message: "Conta desativada com sucesso",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao desativar conta",
      },
      {
        status: 500,
      }
    );
  }
}