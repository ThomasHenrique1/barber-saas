import {
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
      "Centralize os dados dos clientes, acompanhe seus atendimentos e mantenha o histórico organizado em um único lugar.",
    icon: Users,
  },
  {
    title: "Barbeiros",
    description:
      "Organize sua equipe, gerencie barbeiros e mantenha as informações dos profissionais centralizadas.",
    icon: Scissors,
  },
  {
    title: "Agendamentos",
    description:
      "Organize os horários da barbearia, acompanhe os atendimentos e evite conflitos na agenda da equipe.",
    icon: CalendarDays,
  },
  {
    title: "Financeiro",
    description:
      "Acompanhe pagamentos, receitas e o status financeiro dos atendimentos realizados pela sua barbearia.",
    icon: CreditCard,
  },
  {
    title: "Dashboard",
    description:
      "Tenha uma visão geral da operação com indicadores de agendamentos, clientes, serviços e receitas.",
    icon: LayoutDashboard,
  },
  {
    title: "Segurança",
    description:
      "Controle o acesso às informações de acordo com o perfil de cada usuário e mantenha os dados da operação protegidos.",
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
            O BarberHub centraliza os principais processos
            da sua barbearia em uma única plataforma,
            facilitando a organização da equipe e da rotina.
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}