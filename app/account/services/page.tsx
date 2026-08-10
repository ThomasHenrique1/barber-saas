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
} from "lucide-react";

type UserToken = {
  id: string;
  email: string;
  role: string;
};

export default async function ClientServicesPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    verifyToken(token) as UserToken;

    const services =
      await getServices();

    return (
      <AppContainer>

        <PageHeader
          title="Escolha um serviço"
          description="Selecione o serviço desejado para iniciar seu agendamento."
        />

        {services.length === 0 ? (
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>
                Nenhum serviço disponível
              </CardTitle>

              <CardDescription>
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
                  rounded-3xl
                  transition-all
                  hover:-translate-y-1
                  hover:border-primary
                "
              >
                <CardHeader>

                  <div className="mb-4 flex items-center justify-between">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-primary/10
                        text-primary
                      "
                    >
                      <Scissors size={22} />
                    </div>

                    <Badge>
                      Disponível
                    </Badge>

                  </div>

                  <CardTitle>
                    {service.name}
                  </CardTitle>

                  <CardDescription>
                    {service.description ||
                      "Serviço profissional realizado por nossa equipe."}
                  </CardDescription>

                </CardHeader>

                <CardContent className="space-y-6">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <Clock3
                        size={18}
                        className="text-primary"
                      />

                      <span className="text-sm">
                        {service.duration} min
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <DollarSign
                        size={18}
                        className="text-primary"
                      />

                      <span className="font-semibold">
                        {service.price.toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </span>

                    </div>

                  </div>

                  <Button
                    asChild
                    className="w-full"
                  >
                    <Link
                      href={`/account/appointments/new?service=${service.id}`}
                    >
                      Agendar
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