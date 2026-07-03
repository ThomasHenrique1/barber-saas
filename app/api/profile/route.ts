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

    const result = await db.query(
      `
      SELECT
        id,
        name,
        email,
        role,
        "createdAt"
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

    return NextResponse.json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao buscar perfil",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: Request) {
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
      name,
      email,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        {
          error: "Nome e email são obrigatórios",
        },
        {
          status: 400,
        }
      );
    }

    const emailExists = await db.query(
      `
      SELECT id
      FROM "User"
      WHERE email = $1
      AND id != $2
      `,
      [email, user.id]
    );

    if (emailExists.rows.length > 0) {
      return NextResponse.json(
        {
          error: "Email já está em uso",
        },
        {
          status: 409,
        }
      );
    }

    const result = await db.query(
      `
      UPDATE "User"
      SET
        name = $1,
        email = $2
      WHERE id = $3
      RETURNING
        id,
        name,
        email,
        role,
        "createdAt"
      `,
      [
        name,
        email,
        user.id,
      ]
    );

    return NextResponse.json(
      result.rows[0]
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao atualizar perfil",
      },
      {
        status: 500,
      }
    );
  }
}