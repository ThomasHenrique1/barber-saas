"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarDays,
  Clock3,
  Home,
  Scissors,
  User,
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
        border-border
        bg-card/60
        backdrop-blur-xl
        lg:flex
        lg:flex-col
      "
    >
      {/* Branding */}

      <div className="border-b border-border px-8 py-8">
        <div className="flex items-center gap-3">
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
            <Scissors size={20} />
          </div>

          <div>
            <h2 className="font-bold">
              BarberHub
            </h2>

            <p className="text-sm text-muted-foreground">
              Área do Cliente
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={18} />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-border px-6 py-5">
        <p className="text-xs leading-6 text-muted-foreground">
          BarberHub © 2026
        </p>
      </div>
    </aside>
  );
}