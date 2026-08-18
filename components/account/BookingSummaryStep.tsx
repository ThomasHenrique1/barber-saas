"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Scissors,
  UserRound,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CheckCircle2 size={22} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold tracking-tight">
            Confirme seu agendamento
          </h3>
        </div>
        <p className="ml-13 text-sm text-muted-foreground">
          Confira os detalhes antes de confirmar.
        </p>
      </div>

      <Card className="overflow-hidden rounded-3xl border-border bg-card shadow-sm transition-all hover:shadow-md">
        <CardContent className="p-0">
          {/* Cabeçalho do serviço */}
          <div className="border-b border-border/70 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                <Scissors size={22} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Serviço selecionado
                </p>
                <h4 className="mt-0.5 text-xl font-bold">
                  {service.name}
                </h4>
              </div>
            </div>
          </div>

          {/* Detalhes em grid */}
          <div className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Scissors size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Serviço
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {service.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <UserRound size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Barbeiro
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {barber.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <CalendarDays size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Data
                  </p>
                  <p className="mt-0.5 font-semibold capitalize">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Clock3 size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    Horário
                  </p>
                  <p className="mt-0.5 font-semibold">
                    {selectedTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo final */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-border/70 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent px-6 py-5 sm:flex-row">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Duração
                </p>
                <p className="mt-0.5 text-lg font-semibold">
                  {service.duration} min
                </p>
              </div>
              <div className="hidden h-8 w-px bg-border/70 sm:block" />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Valor total
                </p>
                <p className="mt-0.5 text-2xl font-bold text-primary">
                  {formattedPrice}
                </p>
              </div>
            </div>

            <Badge className="rounded-full border border-emerald-200 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-600">
              Pronto para confirmar
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="w-full transition-all hover:bg-primary/5 sm:w-auto"
        >
          Voltar
        </Button>

        <Button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="group w-full gap-2 shadow-sm transition-all hover:shadow-md sm:w-auto"
        >
          {isLoading ? (
            "Confirmando..."
          ) : (
            <>
              Confirmar agendamento
              <ChevronRight 
                size={16} 
                className="transition-transform group-hover:translate-x-0.5" 
              />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}