import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Scissors,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Clientes",
    description:
      "Cadastre clientes, acompanhe o histórico de atendimentos e mantenha todas as informações organizadas em um único lugar.",
    icon: Users,
  },
  {
    title: "Barbeiros",
    description:
      "Gerencie sua equipe, disponibilidade, permissões e produtividade de forma simples e intuitiva.",
    icon: Scissors,
  },
  {
    title: "Agendamentos",
    description:
      "Controle toda a agenda da barbearia, confirme horários e evite conflitos entre atendimentos.",
    icon: CalendarDays,
  },
  {
    title: "Financeiro",
    description:
      "Acompanhe receitas, pagamentos, formas de pagamento e desempenho financeiro em tempo real.",
    icon: CreditCard,
  },
  {
    title: "Dashboard",
    description:
      "Visualize indicadores importantes da operação através de gráficos e métricas inteligentes.",
    icon: LayoutDashboard,
  },
  {
    title: "Segurança",
    description:
      "Controle de acesso por níveis de usuário, autenticação segura e proteção das informações da empresa.",
    icon: ShieldCheck,
  },
];

export function Features() {
  return (
    <section
      id="recursos"
      className="relative overflow-hidden py-32"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(201,162,39,.06),transparent_65%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.20em] text-primary">
            Recursos
          </span>

          <h2 className="mt-8 text-4xl font-bold lg:text-5xl">
            Tudo o que você precisa para administrar
            sua barbearia.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            O BarberHub foi desenvolvido para centralizar
            toda a operação do seu negócio em uma única
            plataforma moderna e intuitiva.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-border
                  bg-card
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-primary/40
                "
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon size={26} />
                </div>

                <h3 className="mt-8 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-5 leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                <Link
                  href="/login"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 group-hover:gap-3"
                >
                  Conhecer módulo

                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}