import { Camera, ShieldCheck, UserCircle2 } from "lucide-react";

type ProfileHeroProps = {
  user: {
    name?: string;
    email: string;
    role: string;
  };
};

export function ProfileHero({
  user,
}: ProfileHeroProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card/70
        p-8
        backdrop-blur-xl
      "
    >
      {/* Glow */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.08),transparent_45%)]" />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Esquerda */}

        <div className="flex items-center gap-6">

          <div className="relative">

            <div
              className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                border
                border-primary/20
                bg-primary/10
                text-primary
              "
            >
              <UserCircle2 size={52} />
            </div>

            <button
              className="
                absolute
                -bottom-2
                -right-2
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-border
                bg-background
                shadow-lg
                transition-all
                hover:border-primary/30
                hover:bg-primary/5
              "
            >
              <Camera size={18} />
            </button>

          </div>

          <div>

            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-primary/20
                bg-primary/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-primary
              "
            >
              Minha Conta
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight">
              {user.name ?? "Usuário"}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">
              {user.email}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-primary/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-primary
                "
              >
                {user.role}
              </span>

            </div>

          </div>

        </div>

        {/* Direita */}

        <div
          className="
            flex
            items-center
            gap-4
            rounded-2xl
            border
            border-border
            bg-background/70
            px-5
            py-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-emerald-500/10
              text-emerald-500
            "
          >
            <ShieldCheck size={22} />
          </div>

          <div>

            <p className="font-semibold">
              Conta protegida
            </p>

            <p className="text-sm text-muted-foreground">
              Suas informações estão seguras.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}