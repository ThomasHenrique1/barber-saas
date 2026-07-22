import { NextResponse } from "next/server";

import { getUser } from "@/lib/auth";

import {
  updateBarber,
  toggleBarber,
  deleteBarber,
} from "@/lib/users";

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const user = await getUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Não autorizado",
        },
        {
          status: 403,
        }
      );
    }

    const { id } =
      await params;

    const body =
      await req.json();

    if (
      typeof body.active ===
        "boolean" &&
      body.name === undefined
    ) {
      const barber =
        await toggleBarber(
          id,
          body.active
        );

      if (!barber) {
        return NextResponse.json(
          {
            error:
              "Barbeiro não encontrado",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        barber
      );
    }

    const barber =
      await updateBarber(id, {
        name: body.name,
        email: body.email,
      });

    if (!barber) {
      return NextResponse.json(
        {
          error:
            "Barbeiro não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      barber
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao atualizar barbeiro",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const user = await getUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Não autorizado",
        },
        {
          status: 403,
        }
      );
    }

    const { id } =
      await params;

    const deleted =
      await deleteBarber(id);

    if (!deleted) {
      return NextResponse.json(
        {
          error:
            "Barbeiro não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message:
        "Barbeiro removido com sucesso",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao remover barbeiro",
      },
      {
        status: 500,
      }
    );
  }
}