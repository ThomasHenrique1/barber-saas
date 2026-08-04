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

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card/70
        p-8
        backdrop-blur
      "
    >
      {/* Glow */}

      <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/10 blur-[90px]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Esquerda */}

        <div>

          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Dashboard
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight">
            Olá, {userName} 👋
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
            Hoje é{" "}
            <span className="font-medium capitalize text-foreground">
              {today}
            </span>
            . Aqui está um resumo da operação da sua
            barbearia.
          </p>

        </div>

        {/* Direita */}

        <div className="grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl border border-border bg-background/70 p-5">

            <div className="flex items-center gap-3 text-primary">
              <CalendarDays size={20} />

              <span className="text-sm font-medium">
                Agendamentos Hoje
              </span>

            </div>

            <h2 className="mt-5 text-3xl font-bold">
              {appointmentsToday}
            </h2>

          </div>

          <div className="rounded-2xl border border-border bg-background/70 p-5">

            <div className="flex items-center gap-3 text-primary">
              <TrendingUp size={20} />

              <span className="text-sm font-medium">
                Receita Prevista
              </span>

            </div>

            <h2 className="mt-5 text-3xl font-bold">
              {expectedRevenue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>

          </div>

        </div>

      </div>

    </section>
  );
}