"use client";

import { useState } from "react";
import { Plus, Scissors, Loader2 } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate(data: ServiceFormData) {
    try {
      setIsLoading(true);
      await createService(data);
      toast.success("Serviço cadastrado com sucesso!");
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao cadastrar serviço."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm hover:shadow transition-all">
          <Plus size={16} />
          Novo serviço
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Scissors size={22} />
            </div>
            <div className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold">
                Cadastrar serviço
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Preencha as informações abaixo para adicionar um novo serviço ao catálogo da sua barbearia.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-2">
          <ServiceForm
            isLoading={isLoading}
            submitLabel="Cadastrar serviço"
            onSubmit={handleCreate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}