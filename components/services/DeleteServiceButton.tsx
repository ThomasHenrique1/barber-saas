"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { deleteService } from "@/src/actions/services/deleteService";

type DeleteServiceButtonProps = {
  serviceId: string;
};

export function DeleteServiceButton({
  serviceId,
}: DeleteServiceButtonProps) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este serviço?"
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteService({
          id: serviceId,
        });

        toast.success(
          "Serviço excluído com sucesso."
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao excluir serviço."
        );
      }
    });
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending
        ? "Excluindo..."
        : "Excluir"}
    </Button>
  );
}