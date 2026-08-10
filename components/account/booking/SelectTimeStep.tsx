"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type SelectTimeStepProps = {
  barberId: string;

  serviceId: string;

  date: Date | undefined;

  selectedTime?: string;

  setSelectedTime: (
    time: string
  ) => void;

  onNext: () => void;

  onBack: () => void;
};

export function SelectTimeStep({
  barberId,
  serviceId,
  date,
  selectedTime,
  setSelectedTime,
  onNext,
  onBack,
}: SelectTimeStepProps) {
  const [availableTimes, setAvailableTimes] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    async function loadTimes() {
      if (
        !barberId ||
        !serviceId ||
        !date
      ) {
        setAvailableTimes([]);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `/api/appointments/available?barberId=${barberId}&serviceId=${serviceId}&date=${date.toISOString()}`
        );

        const data =
          await response.json();

        if (!response.ok) {
          console.error(data.error);
          setAvailableTimes([]);
          return;
        }

        setAvailableTimes(data);
      } catch (error) {
        console.error(error);
        setAvailableTimes([]);
      } finally {
        setLoading(false);
      }
    }

    loadTimes();
  }, [
    barberId,
    serviceId,
    date,
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold">
          Escolha um horário
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Selecione um horário disponível.
        </p>
      </div>

      {loading ? (
        <div className="py-10 text-center text-muted-foreground">
          Carregando horários...
        </div>
      ) : availableTimes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
          Nenhum horário disponível para esta data.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {availableTimes.map((time) => {
            const selected =
              selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() =>
                  setSelectedTime(time)
                }
                className={`
                  rounded-xl
                  border
                  p-3
                  text-center
                  font-medium
                  transition-all

                  ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }
                `}
              >
                {time}
              </button>
            );
          })}
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
          disabled={
            !selectedTime ||
            loading
          }
          onClick={onNext}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}