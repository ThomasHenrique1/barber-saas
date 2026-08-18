"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarDays,
  Clock3,
  Home,
  Scissors,
  User,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "Início",
    icon: Home,
    href: "/account",
  },
  {
    label: "Agendamentos",
    icon: CalendarDays,
    href: "/account/appointments",
  },
  {
    label: "Histórico",
    icon: Clock3,
    href: "/account/history",
  },
  {
    label: "Meu Perfil",
    icon: User,
    href: "/account/profile",
  },
  {
    label: "Serviços",
    icon: Scissors,
    href: "/account/services",
  },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden
        w-72
        border-r
        border-border/70
        bg-card/80
        backdrop-blur-xl
        lg:flex
        lg:flex-col
        lg:sticky
        lg:top-0
        lg:h-screen
      "
    >
      {/* Branding */}
      <div className="border-b border-border/70 px-8 py-8">
        <div className="flex items-center gap-4">
          <div
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-linear-to-br
              from-primary/20
              to-primary/5
              text-primary
              shadow-sm
              transition-transform
              hover:scale-105
            "
          >
            <Scissors size={22} strokeWidth={1.5} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">
              BarberHub
            </h2>
            <p className="text-sm text-muted-foreground">
              Área do Cliente
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1.5 p-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                active
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:shadow-sm"
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-transparent text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                <Icon size={18} strokeWidth={1.5} />
              </div>

              <span className="flex-1">{item.label}</span>

              {active && (
                <div className="h-6 w-1 rounded-full bg-primary" />
              )}

              {!active && (
                <ChevronRight
                  size={16}
                  className="text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary/50"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/70 px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            BarberHub © 2026
          </p>
          <div className="flex h-2 w-2 rounded-full bg-emerald-500/70">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-500/30" />
          </div>
        </div>
      </div>
    </aside>
  );
}