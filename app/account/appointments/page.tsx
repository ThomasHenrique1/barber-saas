import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { verifyToken } from "@/lib/jwt";

import { getClientAppointments } from "@/src/actions/account/get-client-appointments";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  CalendarDays,
  Clock3,
  Scissors,
  User,
  ChevronRight,
  CalendarPlus,
} from "lucide-react";
import { CancelledError } from "@tanstack/react-query";
import { CancelAppointmentButton } from "@/components/appointments/CancelAppointmentButton";
import { RescheduleAppointmentButton } from "@/components/appointments/RescheduleAppointmentButton";

type UserToken = {
  id: string;
  name?: string;
  email: string;
  role: string;
};

const statusConfig = {
  COMPLETED: {
    label: "Concluído",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  PENDING: {
    label: "Pendente",
    className: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
  CANCELED: {
    label: "Cancelado",
    className: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
  CONFIRMED: {
    label: "Confirmado",
    className: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
};

function getStatusConfig(status: string) {
  return statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: "bg-muted/50 text-muted-foreground border-border/50",
  };
}

export default async function AppointmentsPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user = verifyToken(token) as UserToken;

    if (user.role !== "CLIENT") {
      redirect("/dashboard");
    }

    const appointments = await getClientAppointments(user.id);

    return (
      <AppContainer>
        <PageHeader
          title="Meus Agendamentos"
          description="Visualize seus próximos horários e seu histórico."
        >
          <Button asChild className="group gap-2 shadow-sm transition-all hover:shadow-md">
            <Link href="/account/appointments/new">
              <CalendarPlus size={18} strokeWidth={1.5} />
              Novo Agendamento
              <ChevronRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </PageHeader>

        {appointments.length === 0 ? (
          <Card className="overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CalendarDays size={28} strokeWidth={1.5} />
              </div>
              <CardTitle className="mt-4 text-xl font-bold tracking-tight">
                Nenhum agendamento encontrado
              </CardTitle>
              <CardDescription className="mt-2 max-w-md">
                Você ainda não possui horários agendados.
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => {
              const status = getStatusConfig(appointment.status);
              const date = new Date(appointment.date);

              return (
                <Card
                  key={appointment.id}
                  className="group overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      {/* Informações principais */}
                      <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="group/item rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                              <Scissors size={16} strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                                Serviço
                              </p>
                              <p className="mt-0.5 font-semibold transition-colors group-hover/item:text-primary">
                                {appointment.service.name}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group/item rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                              <User size={16} strokeWidth={1.5} />
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

                        <div className="group/item rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                              <CalendarDays size={16} strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                                Data
                              </p>
                              <p className="mt-0.5 font-semibold transition-colors group-hover/item:text-primary">
                                {date.toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="group/item rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary/20">
                              <Clock3 size={16} strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                                Horário
                              </p>
                              <p className="mt-0.5 font-semibold transition-colors group-hover/item:text-primary">
                                {date.toLocaleTimeString("pt-BR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex flex-col items-start gap-4 lg:min-w-35 lg:items-end">
                        <Badge
                          className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${status.className}`}
                        >
                          {status.label}
                        </Badge>

                        <div className="flex flex-wrap gap-2">
                            {appointment.status === "PENDING" && (
                            <>
                              <RescheduleAppointmentButton appointment={appointment} />

                              <CancelAppointmentButton appointmentId={appointment.id} />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </AppContainer>
    );
  } catch {
    redirect("/login");
  }
}