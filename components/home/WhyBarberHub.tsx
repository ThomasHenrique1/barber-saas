import {
  FolderKanban,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

const items = [
  {
    title: "Tudo organizado.",
    description:
      "Clientes, barbeiros, serviços, agenda e pagamentos reunidos em um único lugar para facilitar sua rotina.",
    icon: FolderKanban,
    background: "ORGANIZAÇÃO",
  },
  {
    title: "Mais tempo para atender.",
    description:
      "Automatize tarefas repetitivas e reduza o tempo gasto com organização, focando no que realmente importa.",
    icon: Zap,
    background: "VELOCIDADE",
  },
  {
    title: "Acompanhe sua evolução.",
    description:
      "Visualize indicadores importantes e tome decisões baseadas em dados para fazer sua barbearia crescer.",
    icon: TrendingUp,
    background: "CRESCIMENTO",
  },
  {
    title: "Experiência moderna.",
    description:
      "Uma interface intuitiva, rápida e agradável para você e sua equipe utilizarem todos os dias.",
    icon: Sparkles,
    background: "EXPERIÊNCIA",
  },
];

export function WhyBarberHub() {
  return (
    <section className="relative overflow-hidden py-32">

      {/* Background */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(201,162,39,.05),transparent_60%)]" />

      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">
            Feito para quem vive da barbearia
          </span>

          <h2 className="mt-8 text-4xl font-bold leading-tight lg:text-5xl">
            Mais do que um sistema.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            O BarberHub foi desenvolvido pensando na rotina real de barbeiros
            e gestores, simplificando processos e centralizando tudo em uma
            plataforma moderna.
          </p>

        </div>

        {/* Grid */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-border
                  bg-card/70
                  p-8
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/30
                "
              >
                {/* Palavra ao fundo */}

                <span
                 className="
                 flex
                 absolute
                 left-1/6
                 top-1/9
                 text-6xl
                  font-black
                  uppercase
                  leading-none
                  tracking-tight
                  text-primary/[0.082]
                  pointer-events-auto
                  select-none
                  "
                >
                  {item.background}
                </span>

                {/* Glow */}

                <div
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-px
                    bg-linear-to-r
                    from-transparent
                    via-primary/50
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                {/* Ícone */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <Icon size={24} />
                </div>

                {/* Conteúdo */}

                <h3 className="mt-8 text-2xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                  {item.description}
                </p>

              </article>
            );
          })}

        </div>

        {/* Final */}

        <div className="mx-auto mt-24 max-w-4xl text-center">

          <div className="mx-auto mb-10 h-px w-40 bg-linear-to-r from-transparent via-primary/30 to-transparent" />

          <p className="text-2xl font-semibold leading-relaxed">

            O BarberHub não foi criado para ser apenas mais um sistema.

            <span className="mt-3 block text-muted-foreground">

              Ele foi desenvolvido para tornar a gestão da sua barbearia
              simples, organizada e eficiente, permitindo que você dedique
              mais tempo ao que realmente faz diferença: seus clientes.

            </span>

          </p>

        </div>

      </div>

    </section>
  );
}