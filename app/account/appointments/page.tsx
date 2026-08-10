import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { verifyToken } from "@/lib/jwt";

import { getClientAppointments } from "@/src/actions/account/get-client-appointments";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  CalendarDays,
  Clock3,
  Scissors,
  User,
} from "lucide-react";

type UserToken = {
  id: string;
  name?: string;
  email: string;
  role: string;
};

function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "COMPLETED":
      return "default";

    case "PENDING":
      return "secondary";

    case "CANCELED":
      return "destructive";

    default:
      return "outline";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "COMPLETED":
      return "Concluído";

    case "PENDING":
      return "Pendente";

    case "CANCELED":
      return "Cancelado";

    default:
      return status;
  }
}

export default async function AppointmentsPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user =
      verifyToken(token) as UserToken;

    if (user.role !== "CLIENT") {
      redirect("/dashboard");
    }

    const appointments =
      await getClientAppointments(
        user.id
      );

    return (
      <AppContainer>
        <PageHeader
          title="Meus Agendamentos"
          description="Visualize seus próximos horários e seu histórico."
        >
          <Button asChild>
            <Link href="/account/appointments/new">
              Novo Agendamento
            </Link>
          </Button>
        </PageHeader>

        {appointments.length === 0 ? (
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>
                Nenhum agendamento encontrado
              </CardTitle>

              <CardDescription>
                Você ainda não possui horários
                agendados.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {appointments.map(
              (appointment) => (
                <Card
                  key={appointment.id}
                  className="rounded-3xl"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                          <Scissors
                            size={18}
                          />

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Serviço
                            </p>

                            <p className="font-semibold">
                              {
                                appointment
                                  .service
                                  .name
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <User
                            size={18}
                          />

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Barbeiro
                            </p>

                            <p className="font-semibold">
                              {
                                appointment
                                  .barber
                                  .name
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <CalendarDays
                            size={18}
                          />

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Data
                            </p>

                            <p className="font-semibold">
                              {new Date(
                                appointment.date
                              ).toLocaleDateString(
                                "pt-BR"
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Clock3
                            size={18}
                          />

                          <div>
                            <p className="text-sm text-muted-foreground">
                              Horário
                            </p>

                            <p className="font-semibold">
                              {new Date(
                                appointment.date
                              ).toLocaleTimeString(
                                "pt-BR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-4 lg:items-end">
                        <Badge
                          variant={getStatusVariant(
                            appointment.status
                          )}
                        >
                          {getStatusLabel(
                            appointment.status
                          )}
                        </Badge>

                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="outline"
                          >
                            Detalhes
                          </Button>

                          {appointment.status ===
                            "PENDING" && (
                            <>
                              <Button
                                variant="outline"
                              >
                                Reagendar
                              </Button>

                              <Button variant="destructive">
                                Cancelar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        )}
      </AppContainer>
    );
  } catch {
    redirect("/login");
  }
}