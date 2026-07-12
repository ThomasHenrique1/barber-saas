"use client";

import { useState } from "react";

import { toast } from "sonner";

import { updateService } from "@/src/actions/services/updateService";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  ServiceForm,
  type ServiceFormData,
} from "./ServiceForm";

import type { ServiceItem } from "@/src/actions/services/get-services";

type EditServiceDialogProps = {
  service: ServiceItem;
};

export function EditServiceDialog({
  service,
}: EditServiceDialogProps) {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    data: ServiceFormData
  ) {
    try {
      setLoading(true);

     await updateService({
        id: service.id,
        ...data,
      });

      toast.success(
        "Serviço atualizado com sucesso."
      );

      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao atualizar serviço."
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
            Editar serviço
          </DialogTitle>

          <DialogDescription>
            Atualize as informações do
            serviço.
          </DialogDescription>
        </DialogHeader>

        <ServiceForm
          defaultValues={{
            name: service.name,
            description:
              service.description ?? "",
            price: service.price,
            duration: service.duration,
          }}
          isLoading={loading}
          submitLabel="Salvar alterações"
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}