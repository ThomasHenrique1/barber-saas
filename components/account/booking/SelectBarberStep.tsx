"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Clock3,
  DollarSign,
  Scissors,
  Check,
} from "lucide-react";

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

type SelectBarberStepProps = {
  service: Service;
  barbers: Barber[];

  barberId: string;
  setBarberId: (
    id: string
  ) => void;

  onNext: () => void;
};

export function SelectBarberStep({
  service,
  barbers,
  barberId,
  setBarberId,
  onNext,
}: SelectBarberStepProps) {
  return (
    <div className="space-y-8">

      {/* Serviço */}

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="space-y-4 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Scissors size={20} />
            </div>

            <div>

              <h3 className="font-semibold">
                {service.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {service.description ||
                  "Serviço profissional"}
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-6 text-sm">

            <div className="flex items-center gap-2">

              <Clock3
                size={16}
                className="text-primary"
              />

              {service.duration} minutos

            </div>

            <div className="flex items-center gap-2">

              <DollarSign
                size={16}
                className="text-primary"
              />

              {service.price.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}

            </div>

          </div>

        </CardContent>
      </Card>

      {/* Lista */}

      <div className="space-y-4">

        <h3 className="text-lg font-semibold">
          Escolha seu barbeiro
        </h3>

        <div className="grid gap-4">

          {barbers.map((barber) => {
            const selected =
              barber.id === barberId;

            return (
              <button
                key={barber.id}
                type="button"
                onClick={() =>
                  setBarberId(
                    barber.id
                  )
                }
                className={`
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  p-5
                  text-left
                  transition-all

                  ${
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }
                `}
              >

                <div className="flex items-center gap-4">

                  <Avatar className="h-12 w-12">

                    <AvatarFallback>
                      {barber.name
                        .split(" ")
                        .map((n) =>
                          n[0]
                        )
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>

                  </Avatar>

                  <div>

                    <p className="font-semibold">
                      {barber.name}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Barbeiro
                    </p>

                  </div>

                </div>

                {selected && (
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      text-primary-foreground
                    "
                  >
                    <Check size={16} />
                  </div>
                )}

              </button>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end">

        <Button
          disabled={!barberId}
          onClick={onNext}
        >
          Continuar
        </Button>

      </div>

    </div>
  );
}