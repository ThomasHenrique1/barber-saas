import { NextResponse } from "next/server";

import { getUser } from "@/lib/auth";

import {
  updateClient,
  toggleClient,
  deleteClient,
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
      const client =
        await toggleClient(
          id,
          body.active
        );

      if (!client) {
        return NextResponse.json(
          {
            error:
              "Cliente não encontrado",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        client
      );
    }

    const client =
      await updateClient(id, {
        name: body.name,
        email: body.email,
      });

    if (!client) {
      return NextResponse.json(
        {
          error:
            "Cliente não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      client
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao atualizar cliente",
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
      await deleteClient(id);

    if (!deleted) {
      return NextResponse.json(
        {
          error:
            "Cliente não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message:
        "Cliente removido com sucesso",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao remover cliente",
      },
      {
        status: 500,
      }
    );
  }
}