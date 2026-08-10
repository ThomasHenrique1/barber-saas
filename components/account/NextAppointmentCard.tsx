"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Scissors,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NextAppointmentCardProps {
  appointment?: {
    id: string;
    date: Date | string;
    status: string;

    service: {
      name: string;
      duration: number;
      price: number;
    };

    barber: {
      id: string;
      name: string;
    };
  } | null;
}

function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NextAppointmentCard({ appointment }: NextAppointmentCardProps) {
  if (!appointment) {
    return null;
  }

  return (
    <Card className="overflow-hidden rounded-3xl border-border">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <CalendarDays size={20} />
            Próximo agendamento
          </CardTitle>

          <Badge>
            <Badge>
              {appointment.status}
            </Badge>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-8">
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Informações */}

          <div className="space-y-6">

            <div className="flex items-center gap-3">
              <Scissors
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Serviço
                </p>

                <p className="font-semibold">
                  {appointment.service.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock3
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Data e horário
                </p>

                <p className="font-semibold">
                  {formatDateTime(appointment.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Barbeiro
                </p>

                <p className="font-semibold">
                  {appointment.barber.name}
                </p>
              </div>
            </div>

          </div>

          {/* Resumo */}

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-muted/30
              p-6
            "
          >
            <p className="text-sm text-muted-foreground">
              Lembrete
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Chegue com 10 minutos de antecedência.
            </h3>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Caso precise remarcar ou cancelar seu
              atendimento, faça isso com antecedência
              para liberar o horário.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button>
                Ver detalhes
              </Button>

              <Button
                variant="outline"
              >
                Reagendar
              </Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}