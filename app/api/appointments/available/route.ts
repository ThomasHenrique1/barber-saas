import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const barberId = searchParams.get("barberId");
    const date = searchParams.get("date");

    if (!barberId || !date) {
      return NextResponse.json(
        {
          error: "barberId e date são obrigatórios",
        },
        {
          status: 400,
        }
      );
    }

    const appointments = await db.query(
      `
      SELECT date
      FROM "Appointment"
      WHERE
        "barberId" = $1
        AND DATE(date) = DATE($2)
        AND status != 'CANCELED'
      `,
      [barberId, date]
    );

    const bookedHours = appointments.rows.map((item) => {
        const appointmentDate = new Date(item.date);

        return appointmentDate.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        });

    const availableHours = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ].filter((hour) => !bookedHours.includes(hour));

    return NextResponse.json(availableHours);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao buscar horários disponíveis",
      },
      {
        status: 500,
      }
    );
  }
}