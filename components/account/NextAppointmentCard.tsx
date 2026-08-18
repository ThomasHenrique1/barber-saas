"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Scissors,
  ChevronRight,
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
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function NextAppointmentCard({ appointment }: NextAppointmentCardProps) {
  if (!appointment) {
    return null;
  }

  const statusColors = {
    CONFIRMED: "bg-primary/10 text-primary border-primary/20",
    PENDING: "bg-amber-500/10 text-amber-600 border-amber-200",
    CANCELED: "bg-destructive/10 text-destructive border-destructive/20",
    COMPLETED: "bg-blue-500/10 text-blue-600 border-blue-200",
  };

  const statusLabel = {
    CONFIRMED: "Confirmado",
    PENDING: "Pendente",
    CANCELED: "Cancelado",
    COMPLETED: "Concluído",
  };

  const status = appointment.status as keyof typeof statusColors;

  return (
    <Card className="overflow-hidden rounded-3xl border-border bg-card shadow-sm transition-all hover:shadow-md">
      <CardHeader className="border-b border-border/70 px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-xl bg-primary/20 blur-sm" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                <CalendarDays size={22} strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <CardTitle className="text-xl font-bold tracking-tight">
                Próximo agendamento
              </CardTitle>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {formatDate(appointment.date)} • {formatTime(appointment.date)}
              </p>
            </div>
          </div>

          <Badge
            className={`w-fit rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider ${statusColors[status]}`}
          >
            {statusLabel[status] || appointment.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Informações principais */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Serviço */}
            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Scissors size={18} strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Serviço
                  </p>
                  <p className="mt-1 truncate font-semibold">
                    {appointment.service.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {appointment.service.duration} min
                  </p>
                </div>
              </div>
            </div>

            {/* Horário */}
            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Clock3 size={18} strokeWidth={1.5} color="purple" />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Horário
                  </p>
                  <p className="mt-1 font-semibold">
                    {formatTime(appointment.date)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(appointment.date)}
                  </p>
                </div>
              </div>
            </div>

            {/* Barbeiro */}
            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <MapPin size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Barbeiro
                  </p>
                  <p className="mt-1 font-semibold">
                    {appointment.barber.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Preço */}
            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <span className="text-sm font-bold text-green-500">R$</span>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Preço
                  </p>
                  <p className="mt-1 text-lg font-bold text-primary">
                    {appointment.service.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lembrete e Ações */}
          <div className="flex flex-col justify-between rounded-2xl border border-primary/15 bg-primary/5 p-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">📌</span>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Lembrete
                </p>
              </div>

              <h3 className="mt-3 text-base font-bold leading-relaxed">
                Chegue com 10 minutos de antecedência
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Caso precise remarcar ou cancelar seu atendimento, faça isso com
                antecedência para liberar o horário.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button className="group w-full gap-1 shadow-sm transition-all hover:shadow-md">
                Ver detalhes
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Button
                variant="outline"
                className="w-full bg-background/50 transition-all hover:bg-primary/5"
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