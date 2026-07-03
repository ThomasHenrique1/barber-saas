import { NextResponse } from "next/server";

import { getUser } from "@/lib/auth";
import {
  getServices,
  createService,
} from "@/lib/services";

export async function GET() {
  try {
    const services = await getServices();

    return NextResponse.json(
      services.filter(
        (service) => service.active
      )
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao buscar serviços",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      price,
      duration,
    } = body;

    if (
      !name ||
      !price ||
      !duration
    ) {
      return NextResponse.json(
        {
          error:
            "Nome, preço e duração são obrigatórios",
        },
        {
          status: 400,
        }
      );
    }

    const user = await getUser();

    if (
      !user ||
      user.role !== "ADMIN"
    ) {
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
      await createService({
        name,
        price: Number(price),
        duration: Number(duration),
      });

    return NextResponse.json(
      service,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao criar serviço",
      },
      {
        status: 500,
      }
    );
  }
}