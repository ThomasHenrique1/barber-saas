import { NextResponse } from "next/server";

import { getUser } from "@/lib/auth";

import {
  getClients,
  createClient,
} from "@/lib/users";

export async function GET() {
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

    const clients =
      await getClients();

    return NextResponse.json(
      clients
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao buscar clientes",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
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

    const body =
      await req.json();

    const client =
      await createClient(body);

    return NextResponse.json(
      client,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao criar cliente",
      },
      {
        status: 500,
      }
    );
  }
}