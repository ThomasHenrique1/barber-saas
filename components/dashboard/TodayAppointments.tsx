import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
} from "lucide-react";

type Appointment = {
  id: string;
  time: string;
  client: string;
  service: string;
  barber: string;
  status:
    | "CONFIRMED"
    | "PENDING"
    | "FINISHED";
};

type TodayAppointmentsProps = {
  appointments: Appointment[];
};

const statusMap = {
  CONFIRMED: {
    label: "Confirmado",
    color: "bg-emerald-500",
  },
  PENDING: {
    label: "Pendente",
    color: "bg-amber-500",
  },
  FINISHED: {
    label: "Finalizado",
    color: "bg-primary",
  },
};

export function TodayAppointments({
  appointments,
}: TodayAppointmentsProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-border
        bg-card/70
        backdrop-blur
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border p-6">

        <div>

          <h2 className="text-xl font-semibold">
            Agenda de Hoje
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {appointments.length} agendamentos
          </p>

        </div>

        <Link
          href="/dashboard/appointments"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-primary
            transition-opacity
            hover:opacity-80
          "
        >
          Ver agenda

          <ArrowRight size={16} />
        </Link>

      </div>

      {/* Lista */}

      <div className="divide-y divide-border">

        {appointments.map((appointment) => {

          const status =
            statusMap[appointment.status];

          return (
            <article
              key={appointment.id}
              className="
                flex
                items-center
                justify-between
                gap-6
                p-6
                transition-colors
                hover:bg-background/40
              "
            >
              {/* Horário */}

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <CalendarDays size={20} />
                </div>

                <div>

                  <p className="font-semibold">
                    {appointment.time}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {appointment.service}
                  </p>

                </div>

              </div>

              {/* Cliente */}

              <div className="hidden flex-1 lg:block">

                <p className="font-medium">
                  {appointment.client}
                </p>

                <p className="text-sm text-muted-foreground">
                  Cliente
                </p>

              </div>

              {/* Barbeiro */}

              <div className="hidden flex-1 xl:block">

                <p className="font-medium">
                  {appointment.barber}
                </p>

                <p className="text-sm text-muted-foreground">
                  Barbeiro
                </p>

              </div>

              {/* Status */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-border
                  px-3
                  py-1.5
                  text-sm
                "
              >
                <span
                  className={`h-2 w-2 rounded-full ${status.color}`}
                />

                {status.label}

              </div>

            </article>
          );
        })}

      </div>
    </section>
  );
}