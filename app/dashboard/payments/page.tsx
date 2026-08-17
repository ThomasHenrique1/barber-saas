import { redirect } from "next/navigation";
import {
  CheckCircle2,
  Clock3,
  CreditCard,
  WalletCards,
  ArrowUpRight,
  ArrowDownRight,
  Banknote,
  Wallet,
} from "lucide-react";

import { getUser } from "@/lib/auth";
import { getPaymentStats } from "@/src/actions/dashboard/get-payment-stats";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const paymentStatusConfig = {
  PAID: { label: "Pago", variant: "default" as const, icon: CheckCircle2 },
  PENDING: { label: "Pendente", variant: "secondary" as const, icon: Clock3 },
  CANCELED: { label: "Cancelado", variant: "destructive" as const, icon: CheckCircle2 },
};

const paymentMethodConfig = {
  PIX: { label: "PIX", icon: Wallet },
  CASH: { label: "Dinheiro", icon: Banknote },
  CARD: { label: "Cartão", icon: CreditCard },
};

export default async function PaymentsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN" && user.role !== "BARBER") {
    redirect("/account");
  }

  const { stats, payments } = await getPaymentStats();

  return (
    <AppContainer>
      <PageHeader
        title="Pagamentos"
        description="Acompanhe receitas, pagamentos e o desempenho financeiro da sua barbearia."
      />

      {/* Indicadores */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Receita recebida */}
        <Card className="rounded-3xl border-border/70 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-emerald-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <WalletCards size={20} />
                </div>
                <span className="text-sm font-medium">Receita recebida</span>
              </div>
              <ArrowUpRight size={16} className="text-emerald-500" />
            </div>

            <p className="mt-5 text-3xl font-bold text-emerald-600">
              {formatCurrency(stats.totalReceived)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              pagamentos confirmados
            </p>
          </CardContent>
        </Card>

        {/* Pagamentos pendentes */}
        <Card className="rounded-3xl border-border/70 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-amber-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Clock3 size={20} />
                </div>
                <span className="text-sm font-medium">Pagamentos pendentes</span>
              </div>
              <ArrowDownRight size={16} className="text-amber-500" />
            </div>

            <p className="mt-5 text-3xl font-bold text-amber-600">
              {formatCurrency(stats.totalPending)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              aguardando confirmação
            </p>
          </CardContent>
        </Card>

        {/* Recebido hoje */}
        <Card className="rounded-3xl border-border/70 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-primary">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm font-medium">Recebido hoje</span>
              </div>
              <ArrowUpRight size={16} className="text-primary" />
            </div>

            <p className="mt-5 text-3xl font-bold text-primary">
              {formatCurrency(stats.receivedToday)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              pagamentos confirmados hoje
            </p>
          </CardContent>
        </Card>

        {/* Total de pagamentos */}
        <Card className="rounded-3xl border-border/70 shadow-sm hover:shadow-md transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground">
                  <CreditCard size={20} />
                </div>
                <span className="text-sm font-medium">Pagamentos</span>
              </div>
            </div>

            <div className="mt-5 flex items-end gap-2">
              <p className="text-3xl font-bold">{stats.paidCount}</p>
              <p className="pb-1 text-sm text-muted-foreground">pagos</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {stats.pendingCount} pendentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Histórico */}
      <Card className="mt-6 overflow-hidden rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="border-b border-border/50 px-6 py-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Histórico de pagamentos
            </CardTitle>
            <Badge variant="outline" className="gap-1.5">
              <WalletCards size={12} />
              {payments.length} pagamentos
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                <WalletCards size={28} className="text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold">Nenhum pagamento encontrado</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Os pagamentos registrados aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {payments.map((payment) => {
                const status = paymentStatusConfig[payment.status as keyof typeof paymentStatusConfig] || paymentStatusConfig.PENDING;
                const StatusIcon = status.icon;
                const method = paymentMethodConfig[payment.method as keyof typeof paymentMethodConfig] || paymentMethodConfig.PIX;
                const MethodIcon = method.icon;

                return (
                  <article
                    key={payment.id}
                    className="p-5 transition-colors hover:bg-muted/30 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      {/* Cliente */}
                      <div className="min-w-0 lg:flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {payment.client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                          <div>
                            <p className="truncate font-semibold">
                              {payment.client.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {payment.service.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Barbeiro */}
                      <div className="lg:flex-1">
                        <p className="text-xs text-muted-foreground">Barbeiro</p>
                        <p className="mt-0.5 font-medium">{payment.barber.name}</p>
                      </div>

                      {/* Data */}
                      <div>
                        <p className="text-xs text-muted-foreground">Atendimento</p>
                        <p className="mt-0.5 font-medium">{formatDate(payment.appointmentDate)}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(payment.appointmentDate)}
                        </p>
                      </div>

                      {/* Método */}
                      <div>
                        <p className="text-xs text-muted-foreground">Método</p>
                        <div className="mt-0.5 flex items-center gap-1.5 font-medium">
                          <MethodIcon size={14} className="text-muted-foreground" />
                          {method.label}
                        </div>
                      </div>

                      {/* Valor e Status */}
                      <div className="lg:min-w-32 lg:text-right">
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(payment.amount)}
                        </p>
                        <Badge
                          variant={status.variant}
                          className="mt-1.5 gap-1.5"
                        >
                          <StatusIcon size={12} />
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </AppContainer>
  );
}