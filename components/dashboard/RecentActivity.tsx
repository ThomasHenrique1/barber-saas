import Link from "next/link";
import {
  ArrowRight,
  CalendarPlus,
  CreditCard,
  Scissors,
  UserPlus,
} from "lucide-react";

type Activity = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "appointment" | "client" | "payment" | "service";
};

const activities: Activity[] = [
  {
    id: "1",
    title: "Novo agendamento",
    description: "João Pedro agendou um Corte Degradê.",
    time: "Há 5 minutos",
    type: "appointment",
  },
  {
    id: "2",
    title: "Pagamento recebido",
    description: "Pagamento de R$ 85,00 confirmado.",
    time: "Há 18 minutos",
    type: "payment",
  },
  {
    id: "3",
    title: "Cliente cadastrado",
    description: "Maria Oliveira foi adicionada ao sistema.",
    time: "Há 42 minutos",
    type: "client",
  },
  {
    id: "4",
    title: "Serviço atualizado",
    description: "Barba Premium teve o valor alterado.",
    time: "Hoje",
    type: "service",
  },
];

const icons = {
  appointment: CalendarPlus,
  payment: CreditCard,
  client: UserPlus,
  service: Scissors,
};

export function RecentActivity() {
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
            Atividade recente
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Últimas movimentações do sistema.
          </p>

        </div>

        <Link
          href="/dashboard/activity"
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
          Ver tudo

          <ArrowRight size={16} />
        </Link>

      </div>

      {/* Timeline */}

      <div className="divide-y divide-border">

        {activities.map((activity) => {
          const Icon = icons[activity.type];

          return (
            <article
              key={activity.id}
              className="
                flex
                items-start
                gap-5
                p-6
                transition-colors
                hover:bg-background/40
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
              >
                <Icon size={20} />
              </div>

              <div className="flex-1">

                <div className="flex flex-wrap items-center justify-between gap-2">

                  <h3 className="font-medium">
                    {activity.title}
                  </h3>

                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>

                </div>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {activity.description}
                </p>

              </div>

            </article>
          );
        })}

      </div>
    </section>
  );
}