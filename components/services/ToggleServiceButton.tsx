"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Ban, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleService } from "@/src/actions/services/toggleService";
import type { ServiceItem } from "@/src/actions/services/get-services";

type ToggleServiceButtonProps = {
  service: ServiceItem;
};

export function ToggleServiceButton({ service }: ToggleServiceButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        await toggleService({
          id: service.id,
          active: !service.active,
        });
        toast.success(
          service.active
            ? `Serviço "${service.name}" desativado.`
            : `Serviço "${service.name}" ativado.`
        );
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Erro ao atualizar serviço."
        );
      }
    });
  }

  return (
    <Button
      size="sm"
      variant={service.active ? "outline" : "default"}
      disabled={isPending}
      onClick={handleToggle}
      className="gap-1.5"
    >
      {isPending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : service.active ? (
        <Ban size={14} />
      ) : (
        <CheckCircle size={14} />
      )}
      <span className="hidden sm:inline">
        {service.active ? "Desativar" : "Ativar"}
      </span>
    </Button>
  );
}