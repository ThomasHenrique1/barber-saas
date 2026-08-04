import Link from "next/link";
import { Scissors } from "lucide-react";

const navigation = [
  {
    label: "Recursos",
    href: "#recursos",
  },
  {
    label: "Como Funciona",
    href: "#como-funciona",
  },
  {
    label: "Preços",
    href: "#precos",
  },
  {
    label: "Contato",
    href: "#contato",
  },
];

export function Footer() {
  return (
    <footer
      id="contato"
      className="border-t border-border bg-card"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Scissors size={18} />
            </div>

            <div className="text-left">
              <h3 className="text-lg font-bold tracking-tight">
                BarberHub
              </h3>

              <p className="text-xs text-muted-foreground">
                SaaS Platform
              </p>
            </div>
          </div>

          {/* Descrição */}

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
            Plataforma moderna para gestão de barbearias.
            Organize clientes, barbeiros, serviços,
            agendamentos e pagamentos em um único lugar.
          </p>

          {/* Navegação */}

          <nav className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="
                  text-sm
                  text-muted-foreground
                  transition-colors
                  duration-300
                  hover:text-primary
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}

          <div className="my-12 h-px w-full bg-border" />

          {/* Bottom */}

          <div className="flex w-full flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © {new Date().getFullYear()} BarberHub.
              Todos os direitos reservados.
            </p>

            <p>
              Desenvolvido com Next.js, React e
              TypeScript.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}