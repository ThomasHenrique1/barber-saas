import {
  CalendarPlus2,
  LayoutDashboard,
  Scissors,
  Wallet,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Agendamento",
    description:
      "O cliente escolhe o serviço, o barbeiro e um horário disponível para realizar seu agendamento.",
    icon: CalendarPlus2,
  },
  {
    number: "02",
    title: "Atendimento",
    description:
      "O barbeiro acompanha sua agenda e realiza o atendimento com todas as informações organizadas.",
    icon: Scissors,
  },
  {
    number: "03",
    title: "Pagamento",
    description:
      "Após o atendimento, registre o pagamento e mantenha os valores recebidos e pendentes sob controle.",
    icon: Wallet,
  },
  {
    number: "04",
    title: "Gestão",
    description:
      "Acompanhe agendamentos, clientes, serviços, equipe e indicadores da sua barbearia em um único lugar.",
    icon: LayoutDashboard,
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(201,162,39,.04),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
            Como funciona
          </span>

          <h2 className="mt-8 text-4xl font-bold lg:text-5xl">
            Sua rotina, simplificada.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Do agendamento ao pagamento, o BarberHub organiza
            as principais etapas da operação da sua barbearia
            em um único sistema.
          </p>
        </div>

        {/* Timeline Desktop */}

        <div className="relative mt-24 hidden lg:block">
          {/* Linha */}

          <div className="absolute left-0 right-0 top-11 h-px bg-border" />

          <div className="grid grid-cols-4 gap-10">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative"
                >
                  {/* Circle */}

                  <div
                    className="
                      relative
                      z-10
                      mx-auto
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-primary/20
                      bg-card
                    "
                  >
                    <span
                      className="
                        absolute
                        text-5xl
                        font-black
                        text-primary/10
                      "
                    >
                      {step.number}
                    </span>

                    <Icon
                      size={28}
                      className="relative text-primary"
                    />
                  </div>

                  <div className="mt-10 text-center">
                    <h3 className="text-xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-4 leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Mobile */}

        <div className="mt-20 space-y-10 lg:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative pl-20"
              >
                {index !== steps.length - 1 && (
                  <div className="absolute left-9 top-20 h-24 w-px bg-border" />
                )}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    flex
                    h-18
                    w-18
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-primary/20
                    bg-card
                  "
                >
                  <Icon
                    size={24}
                    className="text-primary"
                  />
                </div>

                <span className="text-sm font-semibold text-primary">
                  {step.number}
                </span>

                <h3 className="mt-2 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}

        <div className="mx-auto mt-24 max-w-3xl text-center">
          <div className="mx-auto mb-10 h-px w-40 bg-linear-to-r from-transparent via-primary/30 to-transparent" />

          <h3 className="text-2xl font-semibold">
            Tudo organizado em um só lugar.
          </h3>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Sem planilhas. Sem informações espalhadas.
            O BarberHub reúne a rotina da sua barbearia
            para você acompanhar cada etapa com mais controle.
          </p>
        </div>
      </div>
    </section>
  );
}