"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3, DollarSign, Scissors, Sparkles } from "lucide-react";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { BookAppointmentDialog } from "@/components/account/booking/BookAppointmentDialog";

type Service = {
  id: string;
  name: string;
  description?: string | null;
  duration: number;
  price: number;
};

type Barber = {
  id: string;
  name: string;
};

type NewAppointmentClientProps = {
  services: Service[];
  barbers: Barber[];
};

export function NewAppointmentClient({
  services,
  barbers,
}: NewAppointmentClientProps) {
  const router = useRouter();

  const [selectedService, setSelectedService] =
    useState<Service>();

  const [dialogOpen, setDialogOpen] =
    useState(false);

  function handleSelectService(
    service: Service
  ) {
    setSelectedService(service);
    setDialogOpen(true);
  }

  function handleBack() {
    router.push("/account/services");
  }

  return (
    <AppContainer>
      <PageHeader
        title="Novo agendamento"
        description="Escolha um serviço para começar seu agendamento."
      />

      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="group gap-2 transition-all hover:bg-primary/5"
        >
          <ArrowLeft size={16} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-0.5" />
          Voltar
        </Button>
      </div>

      {services.length === 0 ? (
        <Card className="overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Scissors size={28} strokeWidth={1.5} />
            </div>
            <h2 className="mt-4 text-xl font-bold tracking-tight">
              Nenhum serviço disponível
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              No momento não existem serviços ativos para agendamento.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              <CardContent className="flex h-full flex-col p-6">
                {/* Ícone e badge */}
                <div className="flex items-start justify-between">
                  <div
                    className="
                      flex
                      h-12
                      w-12
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
                    <Scissors size={22} strokeWidth={1.5} />
                  </div>
                  <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                    Disponível
                  </Badge>
                </div>

                {/* Informações do serviço */}
                <div className="mt-4 flex-1 space-y-3">
                  <h2 className="text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
                    {service.name}
                  </h2>

                  {service.description && (
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  )}

                  {/* Detalhes */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 p-3 transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                          <Clock3 size={16} strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-medium">
                          {service.duration} min
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
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
                  </div>
                </div>

                {/* Botão */}
                <Button
                  className="mt-6 w-full gap-2 shadow-sm transition-all hover:shadow-md"
                  onClick={() => handleSelectService(service)}
                  disabled={barbers.length === 0}
                >
                  Escolher serviço
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Button>

                {barbers.length === 0 && (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Nenhum barbeiro disponível no momento
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedService && (
        <BookAppointmentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          service={selectedService}
          barbers={barbers}
        />
      )}
    </AppContainer>
  );
}