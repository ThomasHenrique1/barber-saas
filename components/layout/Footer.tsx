import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, GitBranch, Globe, Mail } from "lucide-react";

const navigation = [
  { label: "Recursos", href: "#recursos" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Contato", href: "#contato" },
];

const socialLinks = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: GitBranch, href: "#", label: "GitHub" },
  { icon: Globe, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer id="contato" className="border-t border-border/50 bg-linear-to-b from-background to-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Logo.png"
                alt="BarberHub"
                width={100}
                height={100}
                className="h-20 w-20 object-contain"
                priority
              />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold tracking-tight leading-none">
                BarberHub
              </h3>
              <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground/70">
                SaaS Platform
              </p>
            </div>
          </Link>

          {/* Descrição */}
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Plataforma moderna para gestão de barbearias.
            Organize clientes, barbeiros, serviços,
            agendamentos e pagamentos em um único lugar.
          </p>

          {/* Navegação */}
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-primary hover:-translate-y-0.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="mt-8 flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5"
                >
                  <Icon size={18} />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-primary/10 px-6 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md"
            >
              Começar agora
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Divider */}
          <div className="my-10 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

          {/* Bottom */}
          <div className="flex w-full flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © {new Date().getFullYear()} BarberHub.
              Todos os direitos reservados.
            </p>

            <p className="text-xs text-muted-foreground/60">
              Gestão simples. Operação organizada.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}