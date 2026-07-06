import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <AppContainer>
      <PageHeader
        title="Perfil"
        description="Gerencie suas informações pessoais."
      />

      <Card>
        <CardHeader>
          <CardTitle>
            Perfil
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