"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { RescheduleAppointmentDialog } from "./RescheduleAppointmentDialog";

type RescheduleAppointmentButtonProps = {
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

export function RescheduleAppointmentButton({
  appointment,
}: RescheduleAppointmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
      >
        Reagendar
      </Button>

      <RescheduleAppointmentDialog
        open={open}
        onOpenChange={setOpen}
        appointment={appointment}
      />
    </>
  );
}