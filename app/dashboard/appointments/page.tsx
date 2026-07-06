import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AppointmentsPage() {
  return (
    <AppContainer>
      <PageHeader
        title="Agendamentos"
        description="Gerencie os agendamentos do sistema."
      />

      <Card>
        <CardHeader>
          <CardTitle>
            Agendamentos
          </CardTitle>

          <CardDescription>
            Esta página será implementada nas próximas etapas.
          </CardDescription>
        </CardHeader>

        <CardContent>
          Em desenvolvimento...
        </CardContent>
      </Card>
    </AppContainer>
  );
}