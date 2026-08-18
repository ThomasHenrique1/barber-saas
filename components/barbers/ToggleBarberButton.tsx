"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Ban, CheckCircle, Loader2 } from "lucide-react";
import type { UserItem } from "@/lib/users";
import { Button } from "@/components/ui/button";
import { toggleBarberAction } from "@/src/actions/barbers/toggleBarber";

type Props = {
  barber: UserItem;
};

export function ToggleBarberButton({ barber }: Props) {
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        await toggleBarberAction({
          id: barber.id,
          active: !barber.active,
        });
        toast.success(
          barber.active
            ? `Barbeiro "${barber.name}" desativado.`
            : `Barbeiro "${barber.name}" ativado.`
        );
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Erro ao alterar status."
        );
      }
    });
  }

  return (
    <Button
      size="sm"
      variant={barber.active ? "outline" : "default"}
      disabled={pending}
      onClick={handleToggle}
      className="gap-1.5"
    >
      {pending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : barber.active ? (
        <Ban size={14} />
      ) : (
        <CheckCircle size={14} />
      )}
      <span className="hidden sm:inline">
        {barber.active ? "Desativar" : "Ativar"}
      </span>
    </Button>
  );
}