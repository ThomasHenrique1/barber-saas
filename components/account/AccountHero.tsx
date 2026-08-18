"use client";

import { CalendarDays, ArrowRight, Sparkles } from "lucide-react";

type AccountHeroProps = {
  user: {
    id: string;
    name?: string;
    email: string;
    role: string;
  };
};

export function AccountHero({
  user,
}: AccountHeroProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Bom dia"
      : hour < 18
      ? "Boa tarde"
      : "Boa noite";

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border/70
        bg-linear-to-br
        from-card
        via-card
        to-primary/5
        p-8
        shadow-sm
        transition-all
        hover:shadow-md
        lg:p-10
      "
    >
      {/* Elementos decorativos */}
      <div
        className="
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-primary/10
          blur-3xl
          animate-pulse
        "
      />
      
      <div
        className="
          absolute
          -left-24
          -bottom-24
          h-48
          w-48
          rounded-full
          bg-primary/5
          blur-3xl
        "
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-4">
          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-primary/10
              px-4
              py-1.5
              text-sm
              font-medium
              text-primary
              backdrop-blur-sm
              transition-all
              hover:bg-primary/20
            "
          >
            <CalendarDays size={16} strokeWidth={1.5} />
            Área do Cliente
            <Sparkles size={14} className="text-primary/60" />
          </div>

          {/* Título */}
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {greeting},
            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {" "}
              {user.name ?? user.email.split("@")[0]}
              {user.name && "."}
            </span>
          </h1>

          {/* Descrição */}
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Gerencie seus agendamentos, acompanhe seus atendimentos e mantenha
            seu perfil sempre atualizado.
          </p>
        </div>

        {/* Card de próximo passo */}
        <div
          className="
            group
            relative
            min-w-50
            rounded-2xl
            border
            border-border/70
            bg-linear-to-br
            from-background/80
            to-background/40
            px-6
            py-5
            backdrop-blur-sm
            transition-all
            duration-300
            hover:border-primary/30
            hover:bg-primary/5
            hover:shadow-sm
            hover:-translate-y-0.5
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Próximo passo
              </p>
              <p className="mt-2 text-base font-semibold leading-tight">
                Confira seu próximo horário.
              </p>
            </div>
            <ArrowRight 
              size={18} 
              strokeWidth={1.5}
              className="mt-1 text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary/50"
            />
          </div>

          {/* Indicador de clique */}
          <div className="absolute bottom-3 right-3 flex h-2 w-2 rounded-full bg-primary/30">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-primary/20" />
          </div>
        </div>
      </div>
    </section>
  );
}