"use client";

import Link from "next/link";

import {
  CalendarPlus,
  Clock3,
  UserRound,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const actions = [
  {
    title: "Novo agendamento",
    description:
      "Escolha um serviço e reserve um horário.",
    icon: CalendarPlus,
    href: "/account/appointments/new",
  },
  {
    title: "Meus horários",
    description:
      "Veja todos os seus próximos atendimentos.",
    icon: Clock3,
    href: "/account/appointments",
  },
  {
    title: "Meu perfil",
    description:
      "Atualize seus dados pessoais.",
    icon: UserRound,
    href: "/account/profile",
  },
];

export function QuickActions() {
  return (
    <Card className="overflow-hidden rounded-3xl border-border bg-card shadow-sm transition-all hover:shadow-md">
      <CardHeader className="border-b border-border/70 px-6 py-5">
        <CardTitle className="text-xl font-bold tracking-tight">
          Ações rápidas
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 p-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="
                group
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-border/70
                bg-muted/20
                p-4
                transition-all
                duration-300
                hover:border-primary/30
                hover:bg-primary/5
                hover:shadow-sm
                hover:-translate-y-0.5
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:bg-primary/20
                "
              >
                <Icon size={20} strokeWidth={1.5} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold transition-colors group-hover:text-primary">
                  {action.title}
                </h3>

                <p className="mt-0.5 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>

              <ChevronRight 
                size={18} 
                strokeWidth={1.5}
                className="text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary/50"
              />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}