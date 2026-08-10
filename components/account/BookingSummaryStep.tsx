"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Scissors,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

type BookingSummaryStepProps = {
  service: Service;
  barber: Barber;
  selectedDate: Date;
  selectedTime: string;
  onBack: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function BookingSummaryStep({
  service,
  barber,
  selectedDate,
  selectedTime,
  onBack,
  onConfirm,
  isLoading = false,
}: BookingSummaryStepProps) {
  const formattedDate =
    selectedDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const formattedPrice =
    service.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold">
          Confirme seu agendamento
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Confira os detalhes antes de confirmar.
        </p>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border">
        <CardContent className="p-0">
          <div className="border-b border-border bg-muted/30 p-6">
            <div className="flex items-center gap-3">
              <CheckCircle2
                size={22}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Serviço selecionado
                </p>

                <h4 className="text-lg font-semibold">
                  {service.name}
                </h4>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Scissors
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Serviço
                </p>

                <p className="font-medium">
                  {service.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <UserRound
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Barbeiro
                </p>

                <p className="font-medium">
                  {barber.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Data
                </p>

                <p className="font-medium capitalize">
                  {formattedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock3
                size={20}
                className="text-primary"
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Horário
                </p>

                <p className="font-medium">
                  {selectedTime}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Duração
              </p>

              <p className="font-medium">
                {service.duration} minutos
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Valor
              </p>

              <p className="text-xl font-bold">
                {formattedPrice}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
        >
          Voltar
        </Button>

        <Button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading
            ? "Confirmando..."
            : "Confirmar agendamento"}
        </Button>
      </div>
    </div>
  );
}