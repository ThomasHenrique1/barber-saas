import Link from "next/link";
import {
  ArrowRight,
  CalendarPlus,
  CreditCard,
  Scissors,
  } from "lucide-react";

const actions = [
  {
    title: "Novo Agendamento",
    description: "Agende um novo horário.",
    href: "/dashboard/appointments",
    icon: CalendarPlus,
  },
    {
    title: "Novo Serviço",
    description: "Adicione um serviço.",
    href: "/dashboard/services",
    icon: Scissors,
  },
  {
    title: "Registrar Pagamento",
    description: "Lançe um novo pagamento.",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
];

export function QuickActions() {
  return (
    <section
      className="
        rounded-3xl
        border
        border-border
        bg-card/70
        backdrop-blur
      "
    >
      {/* Header */}

      <div className="border-b border-border p-6">

        <h2 className="text-xl font-semibold">
          Ações rápidas
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Acesse rapidamente as funções mais utilizadas.
        </p>

      </div>

      {/* Grid */}

      <div className="grid gap-4 p-6 sm:grid-cols-2">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-background/60
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/30
              "
            >
              {/* Glow */}

              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon size={22} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="
                      text-muted-foreground
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-primary
                    "
                  />

                </div>

                <h3 className="mt-6 font-semibold">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {action.description}
                </p>

              </div>

            </Link>
          );
        })}

      </div>

    </section>
  );
}