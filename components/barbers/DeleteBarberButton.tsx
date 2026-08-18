"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import type { UserItem } from "@/lib/users";
import { Button } from "@/components/ui/button";
import { deleteBarberAction } from "@/src/actions/barbers/deleteBarber";

type Props = {
  barber: UserItem;
};

export function DeleteBarberButton({ barber }: Props) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Tem certeza que deseja excluir "${barber.name}"?`)) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteBarberAction({ id: barber.id });
        toast.success(`Barbeiro "${barber.name}" excluído com sucesso.`);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Erro ao excluir barbeiro."
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
      className="gap-1.5 hover:bg-red-300/90"
    >
      {pending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Trash2 size={14} />
      )}
      <span className="hidden sm:inline">Excluir</span>
    </Button>
  );
}