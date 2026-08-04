import { CalendarDays } from "lucide-react";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function AppointmentsPage() {
  return (
    <AppContainer>
      <PageHeader
        title="Agendamentos"
        description="Organize a agenda da sua barbearia e acompanhe todos os atendimentos em um só lugar."
      />

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-24 text-center">

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <CalendarDays size={30} />
          </div>

          <h2 className="text-2xl font-semibold">
            Agenda em desenvolvimento
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
            Em breve você poderá visualizar todos os agendamentos,
            controlar horários disponíveis, acompanhar atendimentos
            do dia e organizar a agenda completa da sua equipe.
          </p>

        </CardContent>
      </Card>
    </AppContainer>
  );
}