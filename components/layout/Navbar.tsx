"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scissors, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Recursos", href: "#recursos" },
  { name: "Como Funciona", href: "#como-funciona" },
  ];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-primary/10 bg-background/80 px-4 backdrop-blur-xl shadow-lg shadow-primary/5 transition-all sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/180 text-primary-foreground transition-transform duration-300 group-hover:scale-105 shadow-md shadow-primary/20 ">
              <Image
                src="/Logo.png"
                alt="BarberHub"
                width={100}
                height={100}
                className="h-20 w-20 object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-lg font-bold tracking-tight leading-none">
                BarberHub
              </h2>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                SaaS Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-muted/50"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 rounded-full bg-primary transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/50 hover:text-foreground"
            >
              Entrar
            </Link>

            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/40"
            >
              Começar Agora
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 rounded-lg hover:bg-muted/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 rounded-2xl border border-primary/10 bg-background/95 backdrop-blur-xl shadow-lg shadow-primary/5 p-4 lg:hidden animate-in slide-in-from-top-5 duration-200">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border/50 pt-4">
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Começar Agora
                  <ArrowRight size={16} />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}