
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    router.push("/account");
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
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      {services.length === 0 ? (
        <Card className="rounded-3xl border-border">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold">
              Nenhum serviço disponível
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              No momento não existem serviços ativos
              para agendamento.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="
                rounded-3xl
                border-border
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-primary/50
              "
            >
              <CardContent className="flex h-full flex-col p-6">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    {service.name}
                  </h2>

                  {service.description && (
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {service.description}
                    </p>
                  )}

                  <div className="mt-6 space-y-2 text-sm">
                    <p className="text-muted-foreground">
                      Duração:{" "}
                      <span className="font-medium text-foreground">
                        {service.duration} min
                      </span>
                    </p>

                    <p className="text-muted-foreground">
                      Valor:{" "}
                      <span className="font-semibold text-foreground">
                        {service.price.toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </span>
                    </p>
                  </div>
                </div>

                <Button
                  className="mt-6 w-full"
                  onClick={() =>
                    handleSelectService(
                      service
                    )
                  }
                  disabled={
                    barbers.length === 0
                  }
                >
                  Escolher serviço
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedService && (
        <BookAppointmentDialog
          open={dialogOpen}
          onOpenChange={
            setDialogOpen
          }
          service={selectedService}
          barbers={barbers}
        />
      )}
    </AppContainer>
  );
}