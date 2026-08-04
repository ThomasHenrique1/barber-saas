"use client";

import { useState } from "react";
import { Plus, Scissors } from "lucide-react";
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
        <Button className="gap-2">
          <Plus size={16} />

          Novo serviço
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="space-y-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Scissors size={24} />
          </div>

          <div className="space-y-2">
            <DialogTitle className="text-2xl">
              Cadastrar serviço
            </DialogTitle>

            <DialogDescription className="text-base leading-7">
              Preencha as informações abaixo para adicionar
              um novo serviço ao catálogo da sua barbearia.
            </DialogDescription>
          </div>

        </DialogHeader>

        <ServiceForm
          isLoading={isLoading}
          submitLabel="Cadastrar serviço"
          onSubmit={handleCreate}
        />
      </DialogContent>
    </Dialog>
  );
}