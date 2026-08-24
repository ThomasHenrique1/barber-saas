import Link from "next/link";
import {
  ArrowRight,
  Scissors,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="absolute left-1/2 top-0 -z-10 h-175 w-175 -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="absolute right-0 top-40 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />

      <div className="absolute bottom-20 left-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-[140px]" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-5 py-2 text-sm font-medium text-primary backdrop-blur">
            <Scissors size={15} />

            Gestão completa para barbearias
          </div>

          {/* Título */}

          <h1 className="mt-10 text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
            Sua barbearia
            <span className="relative text-primary">
              {" "}
              organizada.
              <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />
            </span>

            <br />

            Sua operação sob controle.
          </h1>

          {/* Descrição */}

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Gerencie clientes, barbeiros, agendamentos, serviços e
            pagamentos em um único sistema desenvolvido para
            simplificar a rotina da sua barbearia.
          </p>

          {/* Botões */}

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                hover:shadow-[0_0_30px_rgba(201,162,39,.18)]
              "
            >
              Criar minha conta

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#dashboard"
              className="
                inline-flex
                h-14
                items-center
                justify-center
                rounded-xl
                border
                border-primary/20
                bg-card/60
                px-8
                font-medium
                backdrop-blur
                transition-all
                duration-300
                hover:border-primary/40
                hover:bg-card
              "
            >
              Conhecer a plataforma
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}