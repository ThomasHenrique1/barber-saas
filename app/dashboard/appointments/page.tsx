import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/jwt";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

import { getDashboardAppointments } from "@/src/actions/dashboard/get-dashboard-appointments";

import { AppointmentsTable } from "@/components/appointments/AppointmentsTable";
import { AppointmentsFilters } from "@/components/appointments/AppointmentsFilters";

type UserToken = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AppointmentsPageProps = {
  searchParams: Promise<{
    date?: string;
    status?: string;
    barberId?: string;
  }>;
};

export default async function AppointmentsPage({
  searchParams,
}: AppointmentsPageProps) {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user =
      verifyToken(token) as UserToken;

    if (
      user.role !== "ADMIN" &&
      user.role !== "BARBER"
    ) {
      redirect("/dashboard");
    }

    const params = await searchParams;

    const date =
      params.date ??
      new Date()
        .toISOString()
        .split("T")[0];

    const status =
      params.status ?? "";

    const barberId =
      user.role === "ADMIN"
        ? params.barberId ?? ""
        : user.id;

    const appointments =
      await getDashboardAppointments({
        userId: user.id,
        role: user.role,
        date,
        status,
        barberId,
      });

    return (
      <AppContainer>
        <PageHeader
          title="Agendamentos"
          description="Organize a agenda da sua barbearia e acompanhe todos os atendimentos."
        />

        <div className="space-y-6">
          <AppointmentsFilters
            date={date}
            status={status}
            barberId={barberId}
            role={user.role}
          />

          <AppointmentsTable
            appointments={appointments}
          />
        </div>
      </AppContainer>
    );
  } catch (error) {
    console.error(error);

    redirect("/login");
  }
}