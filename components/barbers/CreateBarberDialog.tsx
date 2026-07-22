"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createBarberAction } from "@/src/actions/barbers/createBarber";

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

export function CreateBarberDialog() {
  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    data: BarberFormData
  ) {
    try {
      setLoading(true);

      await createBarberAction({
        name: data.name,
        email: data.email,
        password: data.password!,
      });

      toast.success(
        "Barbeiro cadastrado com sucesso."
      );

      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar barbeiro."
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
        <Button>
          Novo barbeiro
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Novo barbeiro
          </DialogTitle>

          <DialogDescription>
            Cadastre um novo barbeiro.
          </DialogDescription>
        </DialogHeader>

        <BarberForm
          onSubmit={handleSubmit}
          isLoading={loading}
          submitLabel="Cadastrar"
          showPassword
        />
      </DialogContent>
    </Dialog>
  );
}