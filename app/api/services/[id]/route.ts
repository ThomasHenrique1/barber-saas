import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { name, description, price, duration, active } = body;

    const user = await getUser();

      if (!user || user.role !== "ADMIN") {
        return NextResponse.json(
          { error: "Não autorizado" },
          { status: 403 }
        );
      }



    const result = await db.query(
      `
      UPDATE "Service"
      SET
        name = $1,
        description = $2,
        price = $3,
        duration = $4,
        active = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        name,
        description,
        Number(price),
        Number(duration),
        Boolean(active),
        id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Serviço não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao atualizar serviço" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await getUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 403 }
      );
    }

    const result = await db.query(
      `
      DELETE FROM "Service"
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Serviço não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Serviço removido com sucesso",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Erro ao remover serviço" },
      { status: 500 }
    );
  }
}