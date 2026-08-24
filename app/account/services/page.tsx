import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
  Star,
} from "lucide-react";

type UserToken = {
  id: string;
  email: string;
  role: string;
};

const serviceImages: Record<string, string> = {
  Cabelo: "/services/cabelo.png",
  Barba: "/services/barba.png",
  "Cabelo e Barba": "/services/cabelo-e-barba.png",
  Sobrancelha: "/services/sobrancelha.png",
  "Barba na Navalha": "/services/barba-na-navalha.png",
  Lavagem: "/services/lavagem.png",
  "Pomada / Finalização": "/services/pomada-finalizacao.png",
  "Hidratação da Barba": "/services/hidratacao-da-barba.png",
  "Mascara Facial": "/services/mascara-facial.png",
  Depilação: "/services/depilacao.png",
};

const defaultServiceImage = "/services/default.png";

function getServiceImage(serviceName: string) {
  return serviceImages[serviceName] ?? defaultServiceImage;
}

function formatPrice(price: number) {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

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
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
                <Scissors size={28} className="text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold">Nenhum serviço disponível</h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Ainda não existem serviços cadastrados. Volte em breve.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg"
              >
                {/* Imagem do serviço - MANTIDA A CONFIGURAÇÃO ORIGINAL */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-primary/5 via-muted/30 to-background">
                  <Image
                    src={getServiceImage(service.name)}
                    alt={`Serviço ${service.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    quality={100}
                    priority
                  />

                  {/* Gradiente overlay mais sutil */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute left-4 top-4">
                    <Badge className="rounded-full border-emerald-200/50 bg-emerald-500/90 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white shadow-md backdrop-blur-sm">
                      Disponível
                    </Badge>
                  </div>

                  {/* Avaliação com estrelas */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 rounded-full px-3 py-1.5 backdrop-blur-sm">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-white/20 text-white/20"}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-white/90">(4.7)</span>
                  </div>
                </div>

                {/* Conteúdo */}
                <CardHeader className="space-y-3 px-5 pt-4 pb-2">
                  {/* Ícone do serviço */}
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                    <Scissors size={20} strokeWidth={1.5} />
                    <div className="absolute -right-1 -top-1">
                      <Sparkles size={11} className="text-primary/60" />
                    </div>
                  </div>

                  {/* Título e descrição */}
                  <div>
                    <CardTitle className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="mt-1 line-clamp-2 text-sm leading-relaxed">
                      {service.description || "Serviço profissional realizado por nossa equipe."}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 px-5 pb-5">
                  {/* Detalhes do serviço */}
                  <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-muted/30 p-3 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <Clock3 size={15} strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium">{service.duration} min</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <DollarSign size={15} strokeWidth={1.5} />
                      </div>
                      <span className="text-base font-bold text-primary">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>

                  {/* Botão */}
                  <Button
                    asChild
                    className="group/btn w-full gap-2 shadow-sm transition-all hover:shadow-md"
                  >
                    <Link href={`/account/appointments/new?service=${service.id}`}>
                      Agendar
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
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