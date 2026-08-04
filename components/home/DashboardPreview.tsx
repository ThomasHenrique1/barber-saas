import { Sparkles } from "lucide-react";

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
            Todos os indicadores da sua barbearia
            reunidos em um dashboard moderno,
            organizado e desenvolvido para facilitar
            a tomada de decisão.
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

                <div className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Atualizado agora
                </div>
              </div>

              {/* Conteúdo */}

              <div className="grid lg:grid-cols-[260px_1fr]">
                {/* Sidebar */}

                <aside className="border-r border-border bg-card p-7">
                  <div className="h-9 w-36 rounded-xl bg-primary/20" />

                  <div className="mt-12 space-y-5">
                    {[
                      "Dashboard",
                      "Clientes",
                      "Agenda",
                      "Barbeiros",
                      "Serviços",
                      "Financeiro",
                      "Configurações",
                    ].map((item) => (
                      <div
                        key={item}
                        className="
                          rounded-xl
                          px-4
                          py-3
                          transition-colors
                          hover:bg-background
                        "
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                {/* Área Principal */}

                <main className="bg-background p-8">
                  {/* KPIs */}

                  <div className="grid gap-5 md:grid-cols-4">
                    {[
                      {
                        title: "Receita",
                        value: "R$ 8.420",
                      },
                      {
                        title: "Clientes",
                        value: "248",
                      },
                      {
                        title: "Agendamentos",
                        value: "41",
                      },
                      {
                        title: "Equipe",
                        value: "6",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="
                          rounded-2xl
                          border
                          border-border
                          bg-card
                          p-6
                        "
                      >
                        <p className="text-sm text-muted-foreground">
                          {item.title}
                        </p>

                        <h3 className="mt-5 text-3xl font-bold">
                          {item.value}
                        </h3>
                      </div>
                    ))}
                  </div>

                  {/* Dashboard Inferior */}

                  <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_.8fr]">
                    {/* Receita */}

                    <section className="rounded-2xl border border-border bg-card p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          Receita semanal
                        </h3>

                        <span className="text-sm text-muted-foreground">
                          Últimos 7 dias
                        </span>
                      </div>

                      <div className="mt-8 flex h-60 items-end gap-4">
                        {[35, 58, 48, 82, 64, 96, 75].map(
                          (height, index) => (
                            <div
                              key={index}
                              className="flex-1 rounded-t-xl bg-primary transition-all duration-300 hover:opacity-80"
                              style={{
                                height: `${height}%`,
                              }}
                            />
                          )
                        )}
                      </div>
                    </section>

                    {/* Agenda */}

                    <section className="rounded-2xl border border-border bg-card p-6">
                      <h3 className="font-semibold">
                        Próximos atendimentos
                      </h3>

                      <div className="mt-6 space-y-4">
                        {[
                          {
                            time: "09:00",
                            client: "João Henrique",
                          },
                          {
                            time: "10:30",
                            client: "Carlos Mendes",
                          },
                          {
                            time: "13:00",
                            client: "Lucas Alves",
                          },
                          {
                            time: "15:15",
                            client: "Pedro Gomes",
                          },
                        ].map((appointment) => (
                          <div
                            key={appointment.time}
                            className="
                              flex
                              items-center
                              justify-between
                              rounded-xl
                              bg-background
                              px-4
                              py-3
                            "
                          >
                            <div>
                              <p className="font-medium">
                                {appointment.client}
                              </p>

                              <p className="text-sm text-muted-foreground">
                                Corte Premium
                              </p>
                            </div>

                            <span className="text-sm font-semibold text-primary">
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
