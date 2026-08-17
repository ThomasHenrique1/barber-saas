import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { verifyToken } from "@/lib/jwt";

import { getServices } from "@/src/actions/services/get-services";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Clock3,
  DollarSign,
  Scissors,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type UserToken = {
  id: string;
  email: string;
  role: string;
};

export default async function ClientServicesPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    verifyToken(token) as UserToken;

    const services = await getServices();

    return (
      <AppContainer>
        <PageHeader
          title="Escolha um serviço"
          description="Selecione o serviço desejado para iniciar seu agendamento."
        />

        {services.length === 0 ? (
          <Card className="overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm">
            <CardHeader className="border-b border-border/70 px-6 py-5">
              <CardTitle className="text-xl font-bold tracking-tight">
                Nenhum serviço disponível
              </CardTitle>
              <CardDescription className="mt-1">
                Ainda não existem serviços cadastrados.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  border-border/70
                  bg-card
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1.5
                  hover:border-primary/30
                  hover:shadow-md
                "
              >
                <CardHeader className="space-y-4 px-6 pt-6">
                  {/* Cabeçalho com ícone e badge */}
                  <div className="flex items-start justify-between">
                    <div
                      className="
                        relative
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-linear-to-br
                        from-primary/20
                        to-primary/5
                        text-primary
                        shadow-sm
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:shadow-md
                      "
                    >
                      <Scissors size={24} strokeWidth={1.5} />
                      <div className="absolute -right-1 -top-1">
                        <Sparkles size={14} className="text-primary/60" />
                      </div>
                    </div>

                    <Badge className="rounded-full border border-emerald-200 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-emerald-600">
                      Disponível
                    </Badge>
                  </div>

                  {/* Título e descrição */}
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="mt-1.5 leading-relaxed">
                      {service.description ||
                        "Serviço profissional realizado por nossa equipe."}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5 px-6 pb-6">
                  {/* Detalhes do serviço */}
                  <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/20 p-3 transition-all group-hover:border-primary/30 group-hover:bg-primary/5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <Clock3 size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium">
                        {service.duration} min
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <DollarSign size={16} strokeWidth={1.5} />
                      </div>
                      <span className="text-base font-bold text-primary">
                        {service.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Botão de agendamento */}
                  <Button
                    asChild
                    className="group/btn w-full gap-2 shadow-sm transition-all hover:shadow-md"
                  >
                    <Link
                      href={`/account/appointments/new?service=${service.id}`}
                    >
                      Agendar
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/btn:translate-x-0.5"
                      />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </AppContainer>
    );
  } catch {
    redirect("/login");
  }
}