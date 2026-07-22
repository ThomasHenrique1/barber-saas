"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { UserItem } from "@/lib/users";

import { Button } from "@/components/ui/button";

import { toggleBarberAction } from "@/src/actions/barbers/toggleBarber";

type Props = {
  barber: UserItem;
};

export function ToggleBarberButton({
  barber,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        await toggleBarberAction({
          id: barber.id,
          active: !barber.active,
        });

        toast.success(
          barber.active
            ? "Barbeiro desativado."
            : "Barbeiro ativado."
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro."
        );
      }
    });
  }

  return (
    <Button
      size="sm"
      variant="secondary"
      disabled={pending}
      onClick={handleToggle}
    >
      {barber.active
        ? "Desativar"
        : "Ativar"}
    </Button>
  );
}