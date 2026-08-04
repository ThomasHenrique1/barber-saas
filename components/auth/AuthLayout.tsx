"use client";

import Link from "next/link";
import { Scissors, ShieldCheck, Zap, MonitorSmartphone } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-background">

      {/* Background */}

      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="absolute left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="absolute right-0 top-40 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[150px]" />

      <div className="absolute left-0 bottom-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-[140px]" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2">

        {/* Branding */}

        <section className="hidden flex-col justify-between px-12 py-14 lg:flex">

          <div>

            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Scissors size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold">
                  BarberHub
                </h1>

                <p className="text-sm text-muted-foreground">
                  Gestão inteligente para barbearias
                </p>
              </div>
            </Link>

            <div className="mt-24 max-w-md">

              <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.20em] text-primary">
                Plataforma Profissional
              </span>

              <h2 className="mt-8 text-5xl font-bold leading-tight">
                {title}
              </h2>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {subtitle}
              </p>

            </div>

          </div>

          <div>

            <div className="mb-10 h-px w-40 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Zap size={18} />
                </div>

                <span className="text-muted-foreground">
                  Plataforma rápida e intuitiva
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <ShieldCheck size={18} />
                </div>

                <span className="text-muted-foreground">
                  Dados protegidos e seguros
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <MonitorSmartphone size={18} />
                </div>

                <span className="text-muted-foreground">
                  Interface moderna e responsiva
                </span>
              </div>

            </div>

            <p className="mt-14 text-sm text-muted-foreground">
              © 2026 BarberHub
            </p>

          </div>

        </section>

        {/* Formulário */}

        <section className="flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md">

            {/* Mobile */}

            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Scissors size={22} />
              </div>

              <div>
                <h1 className="font-bold">
                  BarberHub
                </h1>

                <p className="text-sm text-muted-foreground">
                  Gestão inteligente
                </p>
              </div>

            </div>

            {children}

          </div>

        </section>

      </div>

    </main>
  );
}