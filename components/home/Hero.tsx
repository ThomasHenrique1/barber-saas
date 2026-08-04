import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Scissors,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0 -z-20 bg-background" />

      <div className="absolute left-1/2 top-0 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="absolute right-0 top-40 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[140px]" />

      <div className="absolute left-0 bottom-20 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-[140px]" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-36">

        {/* Texto */}

        <div className="mx-auto max-w-4xl text-center">
  {/* Badge */}

  <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-5 py-2 text-sm font-medium text-primary backdrop-blur">
    <Scissors size={15} />

    Plataforma completa para barbearias
  </div>

  {/* Título */}

  <h1 className="mt-10 text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
    Organize sua{" "}

    <span className="relative text-primary">
      barbearia

      <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
    </span>

    <br />

    com uma gestão moderna.
  </h1>

  {/* Descrição */}

  <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
    Centralize clientes, barbeiros, agenda, pagamentos e acompanhe o
    crescimento do seu negócio em uma plataforma desenvolvida exclusivamente
    para barbearias.
  </p>

  {/* Botões */}

  <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
    <Link
      href="/login"
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
      Começar Agora

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
      Explorar Plataforma
    </Link>
  </div>

  {/* Linha */}

  <div className="mx-auto mt-14 h-px w-40 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

  {/* Trust Bar */}

  <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
    {[
      "Agenda Inteligente",
      "Financeiro Integrado",
      "Dashboard em Tempo Real",
    ].map((item) => (
      <div
        key={item}
        className="flex items-center gap-2"
      >
        <CheckCircle2
          size={17}
          className="text-primary"
        />

        <span>{item}</span>
      </div>
    ))}
  </div>
</div>
        
        <div className="mt-20 flex flex-col items-center">

          <span className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Conheça a plataforma
          </span>

          <ArrowDown
            size={22}
            className="mt-4 animate-bounce text-primary"
          />

        </div>

      </div>

    </section>
  );
}