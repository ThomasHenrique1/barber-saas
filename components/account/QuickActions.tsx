"use client";

import Link from "next/link";

import {
  CalendarPlus,
  Clock3,
  UserRound,
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
    <Card className="rounded-3xl border-border">
      <CardHeader>
        <CardTitle>
          Ações rápidas
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className="
                group
                flex
                items-start
                gap-4
                rounded-2xl
                border
                border-border
                p-4
                transition-all
                duration-200
                hover:border-primary/40
                hover:bg-primary/5
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
                  transition-transform
                  group-hover:scale-105
                "
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}