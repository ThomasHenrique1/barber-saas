"use client";

import { useState, useTransition } from "react";
import {
  CalendarDays,
  Clock3,
  Scissors,
  User,
  CheckCircle2,
  XCircle,
  Loader2,
  CreditCard,
  Wallet,
  Banknote,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { markAppointmentPaid } from "@/src/actions/dashboard/mark-appointment-paid";
import type { DashboardAppointment } from "@/src/actions/dashboard/get-dashboard-appointments";

type AppointmentsTableProps = {
  appointments: DashboardAppointment[];
};

type PaymentMethod = "PIX" | "CASH" | "CARD";

const statusConfig = {
  PENDING: { label: "Pendente", variant: "secondary" as const, icon: Clock3 },
  CONFIRMED: { label: "Confirmado", variant: "default" as const, icon: CheckCircle2 },
  COMPLETED: { label: "Concluído", variant: "outline" as const, icon: CheckCircle2 },
  CANCELED: { label: "Cancelado", variant: "destructive" as const, icon: XCircle },
};

const paymentMethodConfig = {
  PIX: { label: "PIX", icon: CreditCard },
  CASH: { label: "Dinheiro", icon: Banknote },
  CARD: { label: "Cartão", icon: Wallet },
};

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function AppointmentsTable({ appointments }: AppointmentsTableProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedMethods, setSelectedMethods] = useState<Record<string, PaymentMethod>>({});
  const [processingAppointmentId, setProcessingAppointmentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleMethodChange(appointmentId: string, method: PaymentMethod) {
    setSelectedMethods((current) => ({
      ...current,
      [appointmentId]: method,
    }));
  }

  function handleMarkAsPaid(appointmentId: string) {
    const method = selectedMethods[appointmentId] ?? "PIX";
    setError(null);
    setProcessingAppointmentId(appointmentId);

    startTransition(async () => {
      const result = await markAppointmentPaid(appointmentId, method);
      setProcessingAppointmentId(null);

      if (!result.success) {
        setError(result.error ?? "Erro ao registrar pagamento.");
        return;
      }

      window.location.reload();
    });
  }

  if (appointments.length === 0) {
    return (
      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalendarDays size={28} />
          </div>
          <h3 className="text-lg font-semibold">Nenhum agendamento encontrado</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Não existem agendamentos para os filtros selecionados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
          <XCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <Card className="overflow-hidden rounded-3xl border-border/70 shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {appointments.map((appointment) => {
              const paymentStatus = appointment.payment?.status ?? "PENDING";
              const isPaid = paymentStatus === "PAID";
              const isProcessing = isPending && processingAppointmentId === appointment.id;
              const selectedMethod = selectedMethods[appointment.id] ?? "PIX";
              const status = statusConfig[appointment.status as keyof typeof statusConfig] || statusConfig.PENDING;
              const StatusIcon = status.icon;

              return (
                <article
                  key={appointment.id}
                  className="p-5 transition-colors hover:bg-muted/30 sm:p-6"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    {/* Horário e serviço */}
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Clock3 size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-lg">{formatTime(appointment.date)}</p>
                        <div className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
                          <Scissors size={14} />
                          <span className="truncate">{appointment.service.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Cliente */}
                    <div className="flex min-w-0 items-center gap-3 xl:max-w-45 xl:flex-1">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted/50 text-xs font-semibold text-muted-foreground">
                        {appointment.client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{appointment.client.name}</p>
                        <p className="text-xs text-muted-foreground">Cliente</p>
                      </div>
                    </div>

                    {/* Barbeiro */}
                    <div className="min-w-0 xl:max-w-45 xl:flex-1">
                      <p className="truncate font-medium">{appointment.barber.name}</p>
                      <p className="text-xs text-muted-foreground">Barbeiro</p>
                    </div>

                    {/* Data */}
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} className="text-muted-foreground" />
                      <div>
                        <p className="font-medium">{formatDate(appointment.date)}</p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.service.duration} min
                        </p>
                      </div>
                    </div>

                    {/* Valor, status e pagamento */}
                    <div className="flex flex-col gap-3 xl:min-w-50">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-bold text-primary">
                            {formatPrice(appointment.service.price)}
                          </p>
                          <Badge
                            variant={status.variant}
                            className="mt-1.5 gap-1.5"
                          >
                            <StatusIcon size={12} />
                            {status.label}
                          </Badge>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Pagamento</p>
                          <div className="mt-1 flex items-center gap-1.5 justify-end">
                            {isPaid ? (
                              <CheckCircle2 size={14} className="text-emerald-500" />
                            ) : (
                              <Clock3 size={14} className="text-amber-500" />
                            )}
                            <span
                              className={`text-sm font-medium ${
                                isPaid ? "text-emerald-600" : "text-amber-600"
                              }`}
                            >
                              {isPaid ? "Pago" : "Pendente"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {!isPaid && appointment.status !== "CANCELED" && (
                        <div className="flex flex-col gap-2 sm:flex-row xl:flex-col">
                          <Select
                            value={selectedMethod}
                            onValueChange={(value) =>
                              handleMethodChange(appointment.id, value as PaymentMethod)
                            }
                            disabled={isProcessing}
                          >
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="Método" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(paymentMethodConfig).map(([key, config]) => {
                                const Icon = config.icon;
                                return (
                                  <SelectItem key={key} value={key} className="gap-2">
                                    <span className="flex items-center gap-2">
                                      <Icon size={14} />
                                      {config.label}
                                    </span>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>

                          <Button
                            size="sm"
                            onClick={() => handleMarkAsPaid(appointment.id)}
                            disabled={isProcessing}
                            className="gap-1.5"
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 size={14} className="animate-spin" />
                                Registrando...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={14} />
                                Marcar como pago
                              </>
                            )}
                          </Button>
                        </div>
                      )}

                      {isPaid && (
                        <div className="flex items-center gap-1.5 text-sm text-emerald-600">
                          <CheckCircle2 size={14} />
                          Pagamento confirmado
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
}