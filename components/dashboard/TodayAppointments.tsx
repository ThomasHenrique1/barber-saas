import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, CheckCircle2, AlertCircle } from "lucide-react";

type Appointment = {
  id: string;
  time: string;
  client: string;
  service: string;
  barber: string;
  status: "CONFIRMED" | "PENDING" | "FINISHED";
};

type TodayAppointmentsProps = {
  appointments: Appointment[];
};

const statusMap = {
  CONFIRMED: {
    label: "Confirmado",
    color: "bg-emerald-500",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-600",
    icon: CheckCircle2,
  },
  PENDING: {
    label: "Pendente",
    color: "bg-amber-500",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-600",
    icon: Clock,
  },
  FINISHED: {
    label: "Finalizado",
    color: "bg-blue-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600",
    icon: AlertCircle,
  },
};

export function TodayAppointments({ appointments }: TodayAppointmentsProps) {
  return (
    <section className="rounded-3xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold">Agenda de Hoje</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {appointments.length} agendamento{appointments.length !== 1 && "s"}
          </p>
        </div>

        <Link
          href="/dashboard/appointments"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
        >
          Ver agenda
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Lista */}
      <div className="divide-y divide-border">
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            const status = statusMap[appointment.status];
            const StatusIcon = status.icon;

            return (
              <article
                key={appointment.id}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-muted/30"
              >
                {/* Horário */}
                <div className="flex items-center gap-4 min-w-[140px]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CalendarDays size={19} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{appointment.time}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[100px]">
                      {appointment.service}
                    </p>
                  </div>
                </div>

                {/* Cliente */}
                <div className="hidden flex-1 lg:block min-w-[120px]">
                  <p className="font-medium text-sm">{appointment.client}</p>
                  <p className="text-xs text-muted-foreground">Cliente</p>
                </div>

                {/* Barbeiro */}
                <div className="hidden xl:flex flex-1 items-center gap-2 min-w-[120px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {appointment.barber
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{appointment.barber}</p>
                    <p className="text-xs text-muted-foreground">Barbeiro</p>
                  </div>
                </div>

                {/* Status */}
                <div className={`inline-flex items-center gap-2 rounded-full ${status.bgColor} px-3 py-1.5 text-sm ${status.textColor}`}>
                  <StatusIcon size={14} className={status.textColor} />
                  <span className="font-medium">{status.label}</span>
                </div>
              </article>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
              <CalendarDays size={28} className="text-muted-foreground/50" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Nenhum agendamento hoje
            </h3>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Aproveite para organizar a agenda
            </p>
          </div>
        )}
      </div>
    </section>
  );
}