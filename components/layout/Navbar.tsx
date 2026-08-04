"use client";

import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";

const navigation = [
  {
    name: "Recursos",
    href: "#recursos",
  },
  {
    name: "Como Funciona",
    href: "#como-funciona",
  },
  {
    name: "Preços",
    href: "#precos",
  },
  {
    name: "Contato",
    href: "#contato",
  },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-5 z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="
            flex
            h-[72px]
            items-center
            justify-between
            rounded-2xl
            border
            border-primary/10
            bg-background/65
            px-6
            backdrop-blur-2xl
            transition-all  
          "
        >
          {/* Logo */}

          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-primary
                text-primary-foreground
                shadow-lg
                transition-transform
                duration-300
                group-hover:rotate-6
                group-hover:scale-105
              "
            >
              <Scissors size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight">
                BarberHub
              </h2>

              <p className="text-xs text-muted-foreground">
                SaaS Platform
              </p>
            </div>
          </Link>

          {/* Menu */}

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  group
                  relative
                  text-sm
                  font-medium
                  text-muted-foreground
                  transition-colors
                  duration-300
                  hover:text-foreground
                "
              >
                {item.name}

                <span
                  className="
                    absolute
                    -bottom-2
                    left-0
                    h-[2px]
                    w-0
                    rounded-full
                    bg-primary
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </Link>
            ))}
          </nav>

          {/* Botões */}

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="
                rounded-xl
                px-5
                py-2.5
                text-sm
                font-medium
                text-muted-foreground
                transition-all
                duration-300
                hover:bg-card
                hover:text-foreground
              "
            >
              Entrar
            </Link>

            <Link
              href="/login"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-primary
                px-5
                py-2.5
                text-sm
                font-semibold
                text-primary-foreground
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-primary/30
              "
            >
              Começar Agora

              <ArrowRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}