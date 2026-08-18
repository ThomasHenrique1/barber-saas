"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Pencil, Scissors, Loader2 } from "lucide-react";

import { updateService } from "@/src/actions/services/updateService";
import type { ServiceItem } from "@/src/actions/services/get-services";

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

type EditServiceDialogProps = {
  service: ServiceItem;
};

export function EditServiceDialog({ service }: EditServiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: ServiceFormData) {
    try {
      setLoading(true);
      await updateService({
        id: service.id,
        ...data,
      });
      toast.success(`Serviço "${service.name}" atualizado com sucesso.`);
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao atualizar serviço."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5 hover:bg-muted/50">
          <Pencil size={14} />
          <span className="hidden sm:inline">Editar</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Scissors size={22} />
            </div>
            <div className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold">
                Editar serviço
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Atualize as informações do serviço{" "}
                <strong className="text-foreground">"{service.name}"</strong>.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-2">
          <ServiceForm
            defaultValues={{
              name: service.name,
              description: service.description ?? "",
              price: service.price,
              duration: service.duration,
            }}
            isLoading={loading}
            submitLabel="Salvar alterações"
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}