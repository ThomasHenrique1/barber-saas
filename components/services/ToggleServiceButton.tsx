"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { toggleService } from "@/src/actions/services/toggleService";

import type { ServiceItem } from "@/src/actions/services/get-services";

type ToggleServiceButtonProps = {
  service: ServiceItem;
};

export function ToggleServiceButton({
  service,
}: ToggleServiceButtonProps) {
  const [isPending, startTransition] =
    useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        await toggleService({
          id: service.id,
          active: !service.active,
        });

        toast.success(
          service.active
            ? "Serviço desativado."
            : "Serviço ativado."
        );
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Erro ao atualizar serviço."
        );
      }
    });
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      disabled={isPending}
      onClick={handleToggle}
    >
      {service.active
        ? "Desativar"
        : "Ativar"}
    </Button>
  );
}