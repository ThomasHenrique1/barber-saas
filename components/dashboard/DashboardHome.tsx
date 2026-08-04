import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TodayAppointments } from "@/components/dashboard/TodayAppointments";
import { AppContainer } from "@/components/layout/AppContainer";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

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

type DashboardHomeProps = {
  user: User;
  stats?: AdminStats | null;
};

export function DashboardHome({
  user,
  stats,
}: DashboardHomeProps) {
  return (
    <AppContainer>

      <DashboardHero
        userName={user.name}
        appointmentsToday={
          stats?.appointmentsToday ?? 0
        }
        expectedRevenue={
          stats?.revenue ?? 0
        }
      />

      {stats && (
        <StatsCards stats={stats} />
      )}

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">

        <TodayAppointments
          appointments={[
            {
              id: "1",
              time: "09:00",
              client: "João Pedro",
              service: "Corte Degradê",
              barber: "Carlos",
              status: "CONFIRMED",
            },
            {
              id: "2",
              time: "10:30",
              client: "Marcos Silva",
              service: "Barba Premium",
              barber: "Rafael",
              status: "PENDING",
            },
            {
              id: "3",
              time: "13:00",
              client: "Lucas Oliveira",
              service: "Corte + Barba",
              barber: "Gabriel",
              status: "FINISHED",
            },
          ]}
        />

        <QuickActions />

      </section>

      <RecentActivity />

    </AppContainer>
  );
}