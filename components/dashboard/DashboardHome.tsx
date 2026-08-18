import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TodayAppointments } from "@/components/dashboard/TodayAppointments";
import { AppContainer } from "@/components/layout/AppContainer";

import type { TodayAppointment } from "@/src/actions/dashboard/get-today-appointments";

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
  appointments: TodayAppointment[];
};

export function DashboardHome({
  user,
  stats,
  appointments,
}: DashboardHomeProps) {
  return (
    <AppContainer>
      <DashboardHero
        userName={user.name}
        appointmentsToday={
          stats?.appointmentsToday ??
          appointments.length
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
          appointments={appointments}
        />

        <QuickActions />
      </section>

    </AppContainer>
  );
}