"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/src/actions/services/deleteService";

type DeleteServiceButtonProps = {
  serviceId: string;
  serviceName?: string;
};

export function DeleteServiceButton({
  serviceId,
  serviceName,
}: DeleteServiceButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      serviceName
        ? `Tem certeza que deseja excluir o serviço "${serviceName}"?`
        : "Tem certeza que deseja excluir este serviço?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteService({ id: serviceId });
        toast.success(
          serviceName
            ? `Serviço "${serviceName}" excluído com sucesso.`
            : "Serviço excluído com sucesso."
        );
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Erro ao excluir serviço."
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
      className="gap-1.5 hover:bg-red-600/150"
    >
      {isPending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Trash2 size={14} />
      )}
      <span className="hidden sm:inline">
        {isPending ? "Excluindo..." : "Excluir"}
      </span>
    </Button>
  );
}