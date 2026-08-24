import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32">
      {/* Glow */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(59,130,246,.08),transparent_65%)]" />

      <div className="mx-auto max-w-7xl px-6">
        <div
          className="
            relative
            overflow-hidden
            rounded-4xl
            border
            border-border
            bg-card/70
            px-10
            py-20
            text-center
            backdrop-blur
          "
        >
          {/* Glow superior */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-px
              bg-linear-to-r
              from-transparent
              via-primary/50
              to-transparent
            "
          />

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-primary/10
              text-primary
            "
          >
            <Sparkles size={30} />
          </div>

          <h2 className="mt-10 text-4xl font-bold leading-tight lg:text-5xl">
            Tenha o controle da sua
            <span className="block text-primary">
              barbearia em um só lugar.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Organize clientes, agenda, barbeiros, serviços e pagamentos
            em uma única plataforma. Mais controle para sua operação
            e mais clareza para tomar decisões.
          </p>

          {/* Botões */}

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="
                group
                inline-flex
                h-14
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-primary
                px-8
                font-semibold
                text-primary-foreground
                transition-all
                duration-300
                hover:-translate-y-0.5
              "
            >
              Começar agora

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/login"
              className="
                inline-flex
                h-14
                items-center
                justify-center
                rounded-xl
                border
                border-border
                bg-background
                px-8
                font-medium
                transition-colors
                hover:border-primary/30
              "
            >
              Acessar minha conta
            </Link>
          </div>

          {/* Benefícios */}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarCheck
                size={18}
                className="text-primary"
              />

              Agenda organizada
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-primary"
              />

              Controle da operação
            </div>

            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-primary"
              />

              Gestão centralizada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}