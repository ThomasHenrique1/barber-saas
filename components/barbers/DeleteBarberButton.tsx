"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { UserItem } from "@/lib/users";

import { Button } from "@/components/ui/button";

import { deleteBarberAction } from "@/src/actions/barbers/deleteBarber";

type Props = {
  barber: UserItem;
};

export function DeleteBarberButton({
  barber,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  function handleDelete() {
    if (
      !confirm(
        `Excluir ${barber.name}?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteBarberAction({
          id: barber.id,
        });

        toast.success(
          "Barbeiro excluído."
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao excluir."
        );
      }
    });
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={handleDelete}
    >
      Excluir
    </Button>
  );
}