"use client";

import {
  CalendarDays,
  Clock3,
  Scissors,
  UserRound,
  CalendarClock,
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

const statusConfig = {
  COMPLETED: {
    label: "Concluído",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  CONFIRMED: {
    label: "Confirmado",
    className: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  PENDING: {
    label: "Pendente",
    className: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
  CANCELED: {
    label: "Cancelado",
    className: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
  NO_SHOW: {
    label: "Não compareceu",
    className: "bg-gray-500/10 text-gray-600 border-gray-200",
  },
};

function getStatusConfig(status: string) {
  return statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: "bg-muted/50 text-muted-foreground border-border/50",
  };
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryPageClient({
  history,
}: HistoryPageClientProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarClock size={22} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Histórico de atendimentos
          </h1>
        </div>
        <p className="ml-13 text-muted-foreground">
          Consulte seus agendamentos e atendimentos anteriores.
        </p>
      </div>

      {history.length === 0 ? (
        <Card className="overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm">
          <CardContent className="flex min-h-80 flex-col items-center justify-center p-12 text-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-2xl bg-primary/20 blur-sm" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-primary shadow-sm">
                <CalendarDays size={32} strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="mt-6 text-xl font-bold tracking-tight">
              Nenhum atendimento encontrado
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Você ainda não possui atendimentos registrados no seu histórico.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map((appointment) => {
            const status = getStatusConfig(appointment.status);

            return (
              <Card
                key={appointment.id}
                className="group overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
              >
                <CardHeader className="border-b border-border/70 bg-linear-to-br from-muted/20 to-transparent px-6 py-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                        <Scissors size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                          {appointment.service.name}
                        </CardTitle>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          Atendimento realizado na BarberHub
                        </p>
                      </div>
                    </div>

                    <Badge
                      className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${status.className}`}
                    >
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    {/* Data */}
                    <div className="group/item rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                          <CalendarDays size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                            Data
                          </p>
                          <p className="mt-0.5 font-semibold capitalize transition-colors group-hover/item:text-primary">
                            {formatDate(appointment.date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Horário */}
                    <div className="group/item rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                          <Clock3 size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                            Horário
                          </p>
                          <p className="mt-0.5 font-semibold transition-colors group-hover/item:text-primary">
                            {formatTime(appointment.date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Barbeiro */}
                    <div className="group/item rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                          <UserRound size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                            Barbeiro
                          </p>
                          <p className="mt-0.5 font-semibold transition-colors group-hover/item:text-primary">
                            {appointment.barber.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer com duração e valor */}
                  <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <Clock3 size={16} strokeWidth={1.5} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Duração:{" "}
                        <span className="font-medium text-foreground">
                          {appointment.service.duration} min
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Valor:</span>
                      <span className="text-base font-bold text-primary">
                        {appointment.service.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}