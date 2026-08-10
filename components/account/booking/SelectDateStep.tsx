"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

type SelectDateStepProps = {
  selectedDate?: Date;

  setSelectedDate: (
    date: Date | undefined
  ) => void;

  onNext: () => void;

  onBack: () => void;
};

export function SelectDateStep({
  selectedDate,
  setSelectedDate,
  onNext,
  onBack,
}: SelectDateStepProps) {
  const today = new Date();

  return (
    <div className="space-y-8">

      <div>

        <h3 className="text-xl font-semibold">
          Escolha uma data
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Selecione o dia desejado para visualizar os horários disponíveis.
        </p>

      </div>

      <div className="flex justify-center">

        <div className="rounded-3xl border border-border p-4">

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) =>
              date < today
            }
          />

        </div>

      </div>

      {selectedDate && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">

          <span className="text-sm text-muted-foreground">
            Data selecionada
          </span>

          <h4 className="mt-1 text-lg font-semibold">
            {selectedDate.toLocaleDateString(
              "pt-BR",
              {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          </h4>

        </div>
      )}

      <div className="flex justify-between">

        <Button
          variant="outline"
          onClick={onBack}
        >
          Voltar
        </Button>

        <Button
          disabled={!selectedDate}
          onClick={onNext}
        >
          Continuar
        </Button>

      </div>

    </div>
  );
}