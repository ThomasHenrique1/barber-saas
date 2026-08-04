"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Scissors,
  UserCircle,
  Users,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
   {
    label: "Serviços",
    href: "/dashboard/services",
    icon: Scissors,
  },
  {
    label: "Agendamentos",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    label: "Pagamentos",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    label: "Barbeiros",
    href: "/dashboard/barbers",
    icon: UserCircle,
  }
];

const accountItems = [
  {
    label: "Perfil",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        hidden
        w-72
        shrink-0
        border-r
        border-border
        bg-card/70
        backdrop-blur-xl
        lg:flex
        lg:flex-col
      "
    >
      {/* Branding */}

      <div className="border-b border-border px-8 py-8">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >
            <Scissors size={22} />
          </div>

          <div>

            <h2 className="text-xl font-bold tracking-tight">
              BarberHub
            </h2>

            <p className="text-sm text-muted-foreground">
              Gestão Inteligente
            </p>

          </div>

        </div>

      </div>

      {/* Navegação */}

      <nav className="flex-1 px-5 py-8">

        <span className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Navegação
        </span>

        <div className="mt-5 space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-200

                  ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                  }
                `}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}

        </div>

      </nav>

      {/* Conta */}

      <div className="border-t border-border p-5">

        <span className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Conta
        </span>

        <div className="mt-5 space-y-2">

          {accountItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition-all

                  ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                  }
                `}
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}

        </div>

      </div>

    </aside>
  );
}