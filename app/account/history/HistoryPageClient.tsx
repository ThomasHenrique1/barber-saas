"use client";

import {
  CalendarDays,
  Clock3,
  Scissors,
  UserRound,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type HistoryAppointment = {
  id: string;
  date: string | Date;
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
};

type HistoryPageClientProps = {
  history: HistoryAppointment[];
};

function getStatusLabel(status: string) {
  switch (status) {
    case "COMPLETED":
      return "Concluído";

    case "CONFIRMED":
      return "Confirmado";

    case "PENDING":
      return "Pendente";

    case "CANCELED":
      return "Cancelado";

    case "NO_SHOW":
      return "Não compareceu";

    default:
      return status;
  }
}

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "COMPLETED":
      return "default";

    case "CANCELED":
    case "NO_SHOW":
      return "destructive";

    case "CONFIRMED":
      return "secondary";

    default:
      return "outline";
  }
}

function formatDate(
  date: string | Date
) {
  return new Date(date).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
}

function formatTime(
  date: string | Date
) {
  return new Date(date).toLocaleTimeString(
    "pt-BR",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

export function HistoryPageClient({
  history,
}: HistoryPageClientProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Histórico de atendimentos
        </h1>

        <p className="mt-2 text-muted-foreground">
          Consulte seus agendamentos e atendimentos anteriores.
        </p>
      </div>

      {history.length === 0 ? (
        <Card className="rounded-3xl border-border">
          <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <CalendarDays
                size={26}
                className="text-primary"
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Nenhum atendimento encontrado
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Você ainda não possui atendimentos registrados no seu histórico.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map(
            (appointment) => (
              <Card
                key={appointment.id}
                className="rounded-3xl border-border"
              >
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Scissors
                          size={20}
                          className="text-primary"
                        />

                        {appointment.service.name}
                      </CardTitle>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Atendimento realizado na BarberHub
                      </p>
                    </div>

                    <Badge
                      variant={getStatusVariant(
                        appointment.status
                      )}
                    >
                      {getStatusLabel(
                        appointment.status
                      )}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                        <CalendarDays
                          size={18}
                          className="text-primary"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Data
                        </p>

                        <p className="text-sm font-medium capitalize">
                          {formatDate(
                            appointment.date
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                        <Clock3
                          size={18}
                          className="text-primary"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Horário
                        </p>

                        <p className="text-sm font-medium">
                          {formatTime(
                            appointment.date
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                        <UserRound
                          size={18}
                          className="text-primary"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Barbeiro
                        </p>

                        <p className="text-sm font-medium">
                          {appointment.barber.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-muted-foreground">
                      Duração:{" "}
                      <span className="font-medium text-foreground">
                        {appointment.service.duration} min
                      </span>
                    </div>

                    <div className="text-sm">
                      Valor:{" "}
                      <span className="font-semibold">
                        {appointment.service.price.toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}