"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { UserItem } from "@/lib/users";

import { updateBarberAction } from "@/src/actions/barbers/updateBarber";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  BarberForm,
  type BarberFormData,
} from "./BarberForm";

type Props = {
  barber: UserItem;
};

export function EditBarberDialog({
  barber,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    data: BarberFormData
  ) {
    try {
      setLoading(true);

      await updateBarberAction({
        id: barber.id,
        name: data.name,
        email: data.email,
      });

      toast.success(
        "Barbeiro atualizado."
      );

      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Editar barbeiro
          </DialogTitle>

          <DialogDescription>
            Atualize as informações.
          </DialogDescription>
        </DialogHeader>

        <BarberForm
          defaultValues={{
            name: barber.name,
            email: barber.email,
          }}
          showPassword={false}
          submitLabel="Salvar alterações"
          isLoading={loading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}