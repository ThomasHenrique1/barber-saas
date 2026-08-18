"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { SelectDateStep } from "@/components/account/booking/SelectDateStep";
import { SelectTimeStep } from "@/components/account/booking/SelectTimeStep";

import { rescheduleAppointment } from "@/src/actions/appointments/reschedule-appointment";

type RescheduleAppointmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  appointment: {
    id: string;
    date: Date | string;

    service: {
      id: string;
      name: string;
      duration: number;
      price: number;
    };

    barber: {
      id: string;
      name: string;
    };
  };
};

export function RescheduleAppointmentDialog({
  open,
  onOpenChange,
  appointment,
}: RescheduleAppointmentDialogProps) {
  const [step, setStep] = useState(1);

  const [selectedDate, setSelectedDate] =
    useState<Date>();

  const [selectedTime, setSelectedTime] =
    useState("");

  const [availableTimes, setAvailableTimes] =
    useState<string[]>([]);

  const [loadingTimes, setLoadingTimes] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    const currentDate =
      new Date(appointment.date);

    setSelectedDate(currentDate);
    setSelectedTime("");
    setStep(1);
    setError("");
  }, [open, appointment.date]);

  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimes([]);
      return;
    }

    async function loadAvailableTimes() {
      setLoadingTimes(true);
      setError("");

      try {
        const params = new URLSearchParams({
          barberId: appointment.barber.id,
          serviceId: appointment.service.id,
          date: selectedDate!.toISOString(),
        });

        const response = await fetch(
          `/api/appointments/available?${params.toString()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ??
              "Não foi possível buscar os horários disponíveis."
          );
        }

        setAvailableTimes(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(error);

        setAvailableTimes([]);

        setError(
          error instanceof Error
            ? error.message
            : "Erro ao buscar horários disponíveis."
        );
      } finally {
        setLoadingTimes(false);
      }
    }

    loadAvailableTimes();
  }, [
    selectedDate,
    appointment.barber.id,
    appointment.service.id,
  ]);

  function handleClose(value: boolean) {
    if (!value && !saving) {
      setStep(1);
      setSelectedDate(undefined);
      setSelectedTime("");
      setAvailableTimes([]);
      setError("");
    }

    onOpenChange(value);
  }

  function handleDateNext() {
    if (!selectedDate) {
      return;
    }

    setSelectedTime("");
    setStep(2);
  }

  async function handleReschedule() {
    if (!selectedDate || !selectedTime) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const [hours, minutes] =
        selectedTime.split(":").map(Number);

      const newDate = new Date(selectedDate);

      newDate.setHours(
        hours,
        minutes,
        0,
        0
      );

      const result =
        await rescheduleAppointment({
          appointmentId: appointment.id,
          date: newDate,
        });

      if (!result.success) {
        setError(
          result.error ??
            "Não foi possível reagendar o agendamento."
        );

        return;
      }

      onOpenChange(false);

      window.location.reload();
    } catch (error) {
      console.error(error);

      setError(
        "Erro ao reagendar o agendamento."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Reagendar agendamento
          </DialogTitle>

          <DialogDescription>
            {appointment.service.name} com{" "}
            {appointment.barber.name}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <SelectDateStep
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onBack={() =>
              handleClose(false)
            }
            onNext={handleDateNext}
          />
        )}

        {step === 2 && (
          <div className="space-y-6">
            {loadingTimes ? (
              <div className="py-16 text-center">
                <p className="text-sm text-muted-foreground">
                  Buscando horários disponíveis...
                </p>
              </div>
            ) : (
              <>
                {availableTimes.length === 0 ? (
                  <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
                    <p className="font-medium">
                      Nenhum horário disponível
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      Escolha outra data para
                      continuar.
                    </p>
                  </div>
                ) : (
                  <SelectTimeStep
                    barberId={appointment.barber.id}
                    serviceId={appointment.service.id}
                    date={selectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    onBack={() =>
                      setStep(1)
                    }
                    onNext={() =>
                      setStep(3)
                    }
                  />
                )}
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">
                Confirmar reagendamento
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Confira as informações antes
                de confirmar.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Serviço
                  </span>

                  <span className="font-medium">
                    {appointment.service.name}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Barbeiro
                  </span>

                  <span className="font-medium">
                    {appointment.barber.name}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Nova data
                  </span>

                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString(
                      "pt-BR"
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Novo horário
                  </span>

                  <span className="font-medium">
                    {selectedTime}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Duração
                  </span>

                  <span className="font-medium">
                    {appointment.service.duration}{" "}
                    minutos
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex justify-between gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  setStep(2)
                }
                disabled={saving}
              >
                Voltar
              </Button>

              <Button
                onClick={handleReschedule}
                disabled={
                  saving ||
                  !selectedDate ||
                  !selectedTime
                }
              >
                {saving
                  ? "Reagendando..."
                  : "Confirmar reagendamento"}
              </Button>
            </div>
          </div>
        )}

        {error && step !== 3 && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}