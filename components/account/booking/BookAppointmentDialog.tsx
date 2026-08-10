"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { BookingStepper } from "./BookingStepper";
import { SelectBarberStep } from "./SelectBarberStep";
import { SelectDateStep } from "./SelectDateStep";
import { SelectTimeStep } from "./SelectTimeStep";
import { BookingSummaryStep } from "../BookingSummaryStep";

import { createAppointmentAction } from "@/src/actions/account/create-appointment";

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

type BookAppointmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service;
  barbers: Barber[];
};

export function BookAppointmentDialog({
  open,
  onOpenChange,
  service,
  barbers,
}: BookAppointmentDialogProps) {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [barberId, setBarberId] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState<Date>();

  const [selectedTime, setSelectedTime] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const totalSteps = 4;

  const selectedBarber =
    barbers.find(
      (barber) =>
        barber.id === barberId
    );

  function nextStep() {
    setStep((current) =>
      Math.min(
        current + 1,
        totalSteps
      )
    );
  }

  function previousStep() {
    setStep((current) =>
      Math.max(
        current - 1,
        1
      )
    );
  }

  function handleClose(
    value: boolean
  ) {
    if (!value && !isLoading) {
      setStep(1);
      setBarberId("");
      setSelectedDate(undefined);
      setSelectedTime("");
    }

    onOpenChange(value);
  }

  async function handleConfirm() {
    if (
      !selectedDate ||
      !selectedTime ||
      !barberId
    ) {
      toast.error(
        "Dados do agendamento incompletos."
      );

      return;
    }

    try {
      setIsLoading(true);

      const [hours, minutes] =
        selectedTime
          .split(":")
          .map(Number);

      const appointmentDate =
        new Date(selectedDate);

      appointmentDate.setHours(
        hours,
        minutes,
        0,
        0
      );

      const result =
        await createAppointmentAction({
          date:
            appointmentDate.toISOString(),
          barberId,
          serviceId: service.id,
        });

      if (!result.success) {
        toast.error(
          result.error ??
            "Não foi possível realizar o agendamento."
        );

        return;
      }

      toast.success(
        "Agendamento realizado com sucesso!"
      );

      setStep(1);
      setBarberId("");
      setSelectedDate(undefined);
      setSelectedTime("");

      onOpenChange(false);

      router.refresh();
    } catch (error) {
      console.error(
        "handleConfirm:",
        error
      );

      toast.error(
        "Erro ao realizar o agendamento."
      );
    } finally {
      setIsLoading(false);
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
            Novo Agendamento
          </DialogTitle>

          <DialogDescription>
            {service.name}
          </DialogDescription>
        </DialogHeader>

        <BookingStepper
          step={step}
          totalSteps={totalSteps}
        />

        {step === 1 && (
          <SelectBarberStep
            service={service}
            barbers={barbers}
            barberId={barberId}
            setBarberId={setBarberId}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <SelectDateStep
            selectedDate={selectedDate}
            setSelectedDate={(date) => {
              setSelectedDate(date);
              setSelectedTime("");
            }}
            onBack={previousStep}
            onNext={nextStep}
          />
        )}

        {step === 3 && (
          <SelectTimeStep
            barberId={barberId}
            serviceId={service.id}
            date={selectedDate}
            selectedTime={selectedTime}
            setSelectedTime={
              setSelectedTime
            }
            onBack={previousStep}
            onNext={nextStep}
          />
        )}

        {step === 4 &&
          selectedBarber &&
          selectedDate &&
          selectedTime && (
            <BookingSummaryStep
              service={service}
              barber={selectedBarber}
              selectedDate={
                selectedDate
              }
              selectedTime={
                selectedTime
              }
              onBack={previousStep}
              onConfirm={
                handleConfirm
              }
              isLoading={isLoading}
            />
          )}
      </DialogContent>
    </Dialog>
  );
}