import { WalletCards } from "lucide-react";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function PaymentsPage() {
  return (
    <AppContainer>
      <PageHeader

        title="Pagamentos"
        description="Acompanhe receitas, pagamentos e o desempenho financeiro da sua barbearia."
      />

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-24 text-center">

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <WalletCards size={30} />
          </div>

          <h2 className="text-2xl font-semibold">
            Módulo financeiro em desenvolvimento
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
            Em breve será possível acompanhar pagamentos,
            controlar receitas, visualizar relatórios financeiros
            e acompanhar o faturamento da sua barbearia em tempo real.
          </p>

        </CardContent>
      </Card>
    </AppContainer>
  );
}