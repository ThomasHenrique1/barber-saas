import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentsPage() {
  return (
    <AppContainer>
      <PageHeader
        title="Pagamentos"
        description="Gerencie os pagamentos do sistema."
      />

      <Card>
        <CardHeader>
          <CardTitle>
            Pagamentos
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