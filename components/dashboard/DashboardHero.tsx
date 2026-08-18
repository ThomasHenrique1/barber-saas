import {
  CalendarDays,
  TrendingUp,
} from "lucide-react";

type DashboardHeroProps = {
  userName?: string;
  appointmentsToday?: number;
  expectedRevenue?: number;
};

export function DashboardHero({
  userName = "Administrador",
  appointmentsToday = 0,
  expectedRevenue = 0,
}: DashboardHeroProps) {
  const today = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date());

  const formattedRevenue =
    expectedRevenue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <section className="relative rounded-3xl border border-border bg-card p-8">
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Esquerda */}

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Dashboard
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight">
            Olá, {userName} 👋
          </h1>

          <p className="mt-4 max-w-xl text-muted-foreground">
            Hoje é{" "}
            <span className="font-medium capitalize text-foreground">
              {today}
            </span>
            . Aqui está um resumo da operação da sua barbearia.
          </p>
        </div>

        {/* Indicadores */}

        <div className="grid gap-4 sm:grid-cols-1">
          {/* Agendamentos */}

          <div className="rounded-2xl border border-border bg-background p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-primary">
                <CalendarDays size={20} />

                <span className="text-sm font-medium">
                  Agendamentos
                </span>
              </div>

              <span className="text-xs text-muted-foreground">
                Hoje
              </span>
            </div>

            <div className="mt-5">
              <h2 className="text-3xl font-bold">
                {appointmentsToday}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {appointmentsToday === 1
                  ? "atendimento previsto"
                  : "atendimentos previstos"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}