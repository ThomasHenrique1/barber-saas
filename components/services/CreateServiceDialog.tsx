"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createService } from "@/src/actions/services/createService";

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
  ServiceForm,
  type ServiceFormData,
} from "./ServiceForm";

export function CreateServiceDialog() {
  const [open, setOpen] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  async function handleCreate(
    data: ServiceFormData
  ) {
    try {
      setIsLoading(true);

      await createService(data);

      toast.success(
        "Serviço cadastrado com sucesso."
      );

      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar serviço."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          Novo serviço
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Novo serviço
          </DialogTitle>

          <DialogDescription>
            Cadastre um novo serviço para
            disponibilizar aos clientes.
          </DialogDescription>
        </DialogHeader>

        <ServiceForm
          isLoading={isLoading}
          submitLabel="Cadastrar"
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
}