import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const items = [
    {
      title: "Usuários",
      value: stats.users,
    },
    {
      title: "Clientes",
      value: stats.clients,
    },
    {
      title: "Agendamentos",
      value: stats.appointments,
    },
    {
      title: "Agendamentos hoje",
      value: stats.appointmentsToday,
    },
    {
      title: "Agendamentos no mês",
      value: stats.appointmentsMonth,
    },
    {
      title: "Serviços",
      value: stats.services,
    },
    {
      title: "Serviços ativos",
      value: stats.activeServices,
    },
    {
      title: "Receita",
      value: `R$ ${Number(
        stats.revenue
      ).toFixed(2)}`,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle className="text-base">
              {item.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}