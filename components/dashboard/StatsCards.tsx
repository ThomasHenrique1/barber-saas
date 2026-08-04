import {
  CalendarDays,
  DollarSign,
  Scissors,
  Users,
  TrendingUp,
} from "lucide-react";

type AdminStats = {
  users: number;
  clients: number;
  appointments: number;
  appointmentsToday: number;
  appointmentsMonth: number;
  services: number;
  activeServices: number;
  revenue: number;
};

type StatsCardsProps = {
  stats: AdminStats;
};

export function StatsCards({
  stats,
}: StatsCardsProps) {
  const cards = [
    {
      title: "Clientes",
      value: stats.clients,
      subtitle: "Clientes cadastrados",
      icon: Users,
    },
    {
      title: "Agenda",
      value: stats.appointmentsToday,
      subtitle: "Agendamentos hoje",
      icon: CalendarDays,
    },
    {
      title: "Serviços",
      value: stats.activeServices,
      subtitle: "Serviços ativos",
      icon: Scissors,
    },
    {
      title: "Receita",
      value: stats.revenue.toLocaleString(
        "pt-BR",
        {
          style: "currency",
          currency: "BRL",
        }
      ),
      subtitle: "Receita total",
      icon: DollarSign,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-card/70
              p-6
              backdrop-blur
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary/30
            "
          >
            {/* Glow */}

            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon size={22} />
                </div>

                <TrendingUp
                  size={18}
                  className="text-emerald-500"
                />

              </div>

              <h3 className="mt-8 text-3xl font-bold tracking-tight">
                {card.value}
              </h3>

              <p className="mt-2 font-medium">
                {card.title}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {card.subtitle}
              </p>

            </div>

          </article>
        );
      })}

    </section>
  );
}