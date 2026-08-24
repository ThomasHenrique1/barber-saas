import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Scissors,
  Sparkles,
  Users,
} from "lucide-react";

export function DashboardPreview() {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-32
      "
    >
      {/* Background */}

      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="absolute left-1/2 top-20 -z-10 h-175 w-175 -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
            <Sparkles size={16} />

            Plataforma completa
          </div>

          <h2 className="mt-8 text-4xl font-bold leading-tight lg:text-6xl">
            Veja o
            <span className="block text-primary">
              BarberHub em ação.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Tenha uma visão completa da operação da sua
            barbearia, acompanhe sua agenda e mantenha
            as principais informações do negócio organizadas
            em um único lugar.
          </p>
        </div>

        {/* Dashboard */}

        <div className="relative mt-24">
          <div
            className="
              overflow-hidden
              rounded-4xl
              border
              border-border
              bg-card
              p-4
              shadow-2xl
            "
          >
            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              {/* Barra Superior */}

              <div className="flex items-center justify-between border-b border-border bg-card px-8 py-5">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-red-400" />

                  <span className="h-3 w-3 rounded-full bg-yellow-400" />

                  <span className="h-3 w-3 rounded-full bg-green-400" />

                  <div className="ml-6 rounded-lg bg-background px-4 py-2 text-xs text-muted-foreground">
                    dashboard.barberhub.app
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  Sistema operacional
                </div>
              </div>

              {/* Conteúdo */}

              <div className="grid lg:grid-cols-[260px_1fr]">
                {/* Sidebar */}

                <aside className="border-r border-border bg-card p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Scissors size={18} />
                    </div>

                    <div>
                      <p className="font-semibold">
                        BarberHub
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Gestão da barbearia
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 font-medium text-primary">
                      <Sparkles size={17} />

                      Dashboard
                    </div>

                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground">
                      <Users size={17} />

                      Clientes
                    </div>

                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground">
                      <CalendarDays size={17} />

                      Agendamentos
                    </div>

                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground">
                      <Scissors size={17} />

                      Barbeiros
                    </div>

                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground">
                      <Sparkles size={17} />

                      Serviços
                    </div>

                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-muted-foreground">
                      <CreditCard size={17} />

                      Pagamentos
                    </div>
                  </div>
                </aside>

                {/* Área Principal */}

                <main className="bg-background p-8">
                  {/* Saudação */}

                  <div className="mb-8">
                    <p className="text-sm text-muted-foreground">
                      Visão geral
                    </p>

                    <h3 className="mt-1 text-2xl font-bold">
                      Olá, administrador 👋
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Acompanhe os principais indicadores da
                      sua barbearia.
                    </p>
                  </div>

                  {/* KPIs */}

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-center gap-3 text-primary">
                        <CalendarDays size={18} />

                        <p className="text-sm font-medium">
                          Agendamentos hoje
                        </p>
                      </div>

                      <h4 className="mt-5 text-3xl font-bold">
                        12
                      </h4>

                      <p className="mt-2 text-xs text-muted-foreground">
                        3 atendimentos restantes
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-center gap-3 text-primary">
                        <CreditCard size={18} />

                        <p className="text-sm font-medium">
                          Receita prevista
                        </p>
                      </div>

                      <h4 className="mt-5 text-3xl font-bold">
                        R$ 1.240
                      </h4>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Baseada nos agendamentos de hoje
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-center gap-3 text-primary">
                        <Users size={18} />

                        <p className="text-sm font-medium">
                          Clientes ativos
                        </p>
                      </div>

                      <h4 className="mt-5 text-3xl font-bold">
                        248
                      </h4>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Clientes cadastrados
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-center gap-3 text-primary">
                        <Scissors size={18} />

                        <p className="text-sm font-medium">
                          Serviços ativos
                        </p>
                      </div>

                      <h4 className="mt-5 text-3xl font-bold">
                        8
                      </h4>

                      <p className="mt-2 text-xs text-muted-foreground">
                        Disponíveis para agendamento
                      </p>
                    </div>
                  </div>

                  {/* Conteúdo Inferior */}

                  <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
                    {/* Resumo financeiro */}

                    <section className="rounded-2xl border border-border bg-card p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">
                            Resumo financeiro
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Acompanhamento dos pagamentos
                          </p>
                        </div>

                        <CreditCard
                          size={20}
                          className="text-primary"
                        />
                      </div>

                      <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-background p-5">
                          <p className="text-sm text-muted-foreground">
                            Recebido
                          </p>

                          <p className="mt-2 text-2xl font-bold">
                            R$ 8.420
                          </p>

                          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-500">
                            <CheckCircle2 size={14} />

                            Pagamentos confirmados
                          </div>
                        </div>

                        <div className="rounded-xl bg-background p-5">
                          <p className="text-sm text-muted-foreground">
                            Pendente
                          </p>

                          <p className="mt-2 text-2xl font-bold">
                            R$ 420
                          </p>

                          <div className="mt-3 flex items-center gap-2 text-xs text-amber-500">
                            <Clock3 size={14} />

                            Aguardando pagamento
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Agenda */}

                    <section className="rounded-2xl border border-border bg-card p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">
                            Agenda de hoje
                          </h3>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Próximos atendimentos
                          </p>
                        </div>

                        <CalendarDays
                          size={20}
                          className="text-primary"
                        />
                      </div>

                      <div className="mt-6 space-y-3">
                        {[
                          {
                            time: "09:00",
                            client: "João Henrique",
                            service: "Corte Premium",
                            status: "Confirmado",
                          },
                          {
                            time: "10:30",
                            client: "Carlos Mendes",
                            service: "Corte + Barba",
                            status: "Pendente",
                          },
                          {
                            time: "13:00",
                            client: "Lucas Alves",
                            service: "Barba",
                            status: "Confirmado",
                          },
                          {
                            time: "15:15",
                            client: "Pedro Gomes",
                            service: "Corte Premium",
                            status: "Confirmado",
                          },
                        ].map((appointment) => (
                          <div
                            key={appointment.time}
                            className="
                              flex
                              items-center
                              justify-between
                              gap-4
                              rounded-xl
                              bg-background
                              px-4
                              py-3
                            "
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate font-medium">
                                  {appointment.client}
                                </p>

                                <span
                                  className={`
                                    hidden
                                    rounded-full
                                    px-2
                                    py-0.5
                                    text-[10px]
                                    font-medium
                                    sm:inline-flex
                                    ${
                                      appointment.status ===
                                      "Confirmado"
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-amber-500/10 text-amber-500"
                                    }
                                  `}
                                >
                                  {appointment.status}
                                </span>
                              </div>

                              <p className="mt-1 text-sm text-muted-foreground">
                                {appointment.service}
                              </p>
                            </div>

                            <span className="shrink-0 text-sm font-semibold text-primary">
                              {appointment.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}