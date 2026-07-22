import { NextResponse } from "next/server";

import { getUser } from "@/lib/auth";

import {
  getBarbers,
  createBarber,
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

    const barbers =
      await getBarbers();

    return NextResponse.json(
      barbers
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao buscar barbeiros",
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

    const barber =
      await createBarber(body);

    return NextResponse.json(
      barber,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erro ao criar barbeiro",
      },
      {
        status: 500,
      }
    );
  }
}