import { LogoutButton } from "@/components/auth/LogoutButton";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type User = {
  id: string;
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
      <PageHeader
        title="Dashboard"
        description="Área autenticada do sistema"
      >
        <LogoutButton />
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>
            Dados do usuário
          </CardTitle>

          <CardDescription>
            Informações da conta logada
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <span className="font-medium">
              Email:
            </span>{" "}
            {user.email}
          </div>

          <div>
            <span className="font-medium">
              Perfil:
            </span>{" "}
            {user.role}
          </div>

          <div>
            <span className="font-medium">
              ID:
            </span>{" "}
            {user.id}
          </div>
        </CardContent>
      </Card>

      {user.role === "ADMIN" && stats && (
        <StatsCards stats={stats} />
      )}

      {user.role !== "ADMIN" && (
        <Card>
          <CardHeader>
            <CardTitle>
              Painel do usuário
            </CardTitle>

            <CardDescription>
              Área inicial do sistema
            </CardDescription>
          </CardHeader>

          <CardContent>
            Seu painel ainda será montado.
          </CardContent>
        </Card>
      )}
    </AppContainer>
  );
}