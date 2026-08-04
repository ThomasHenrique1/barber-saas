"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  UserCircle2,
} from "lucide-react";

import { LogoutButton } from "@/components/auth/LogoutButton";

type TopbarProps = {
  user: {
    name?: string;
    email: string;
    role: string;
  };
};

export function Topbar({
  user,
}: TopbarProps) {
  const today = new Intl.DateTimeFormat(
    "pt-BR",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  ).format(new Date());

  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-border
        bg-background/80
        backdrop-blur-xl
      "
    >
      <div className="flex h-20 items-center justify-between px-8">

        {/* Esquerda */}

        <div>

          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h1>

          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

            <CalendarDays size={15} />

            <span className="capitalize">
              {today}
            </span>

          </div>

        </div>

        {/* Direita */}

        <div className="flex items-center gap-4">

          {/* Notificações */}

          <button
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-border
              bg-card
              transition-all
              hover:border-primary/30
              hover:bg-primary/5
            "
          >
            <Bell size={19} />

            <span
              className="
                absolute
                right-3
                top-3
                h-2
                w-2
                rounded-full
                bg-primary
              "
            />
          </button>

          {/* Usuário */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-border
              bg-card
              px-4
              py-2
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-primary
              "
            >
              <UserCircle2 size={22} />
            </div>

            <div className="hidden text-left md:block">

              <p className="text-sm font-semibold leading-none">
                {user.name ?? user.email}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {user.role}
              </p>

            </div>

            <ChevronDown
              size={18}
              className="text-muted-foreground"
            />

          </div>

          {/* Temporário */}

          <LogoutButton />

        </div>

      </div>

    </header>
  );
}