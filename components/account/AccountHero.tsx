"use client";

import { CalendarDays } from "lucide-react";

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
        border-border
        bg-linear-to-br
        from-card
        via-card
        to-primary/5
        p-8
      "
    >
      <div
        className="
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-primary/10
          blur-3xl
        "
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/20
              bg-primary/10
              px-3
              py-1
              text-sm
              font-medium
              text-primary
            "
          >
            <CalendarDays size={16} />
            Área do Cliente
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            {greeting},
            <span className="text-primary">
              {" "}
              {user.name ?? user.email}.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Gerencie seus agendamentos, acompanhe seus atendimentos e mantenha
            seu perfil sempre atualizado.
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-border
            bg-background/60
            px-6
            py-5
            backdrop-blur
          "
        >
          <p className="text-sm text-muted-foreground">
            Próximo passo
          </p>

          <p className="mt-2 text-lg font-semibold">
            Confira seu próximo horário.
          </p>
        </div>
      </div>
    </section>
  );
}