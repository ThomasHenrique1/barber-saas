import { NextResponse } from "next/server";

import { getUser } from "@/lib/auth";
import {
  updateService,
  deleteService,
} from "@/lib/services";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      name,
      description,
      price,
      duration,
    } = body;

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

    const service =
      await updateService(id, {
        name,
        description,
        price: Number(price),
        duration: Number(duration),
      });

    if (!service) {
      return NextResponse.json(
        {
          error: "Serviço não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao atualizar serviço",
      },
      {
        status: 500,
      }
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
        {
          error: "Não autorizado",
        },
        {
          status: 403,
        }
      );
    }

    const deleted =
      await deleteService(id);

    if (!deleted) {
      return NextResponse.json(
        {
          error: "Serviço não encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message:
        "Serviço removido com sucesso",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao remover serviço",
      },
      {
        status: 500,
      }
    );
  }
}