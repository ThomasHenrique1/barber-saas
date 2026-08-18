import Link from "next/link";
import { ArrowRight, CalendarPlus, CreditCard, Scissors } from "lucide-react";

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
    <section className="rounded-3xl border border-border bg-card">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-xl font-semibold">Ações rápidas</h2>
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
              className="group rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon size={22} />
                </div>
                <ArrowRight
                  size={18}
                  className="text-muted-foreground transition-colors group-hover:text-primary"
                />
              </div>

              <h3 className="mt-6 font-semibold">{action.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}