"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type ServiceFormData = {
  name: string;
  price: number;
  duration: number;
};

type ServiceFormProps = {
  defaultValues?: ServiceFormData;
  isLoading?: boolean;
  submitLabel?: string;
  onSubmit: (
    data: ServiceFormData
  ) => Promise<void> | void;
};

export function ServiceForm({
  defaultValues,
  isLoading = false,
  submitLabel = "Salvar",
  onSubmit,
}: ServiceFormProps) {
  const [name, setName] = useState(
    defaultValues?.name ?? ""
  );

  const [price, setPrice] = useState(
    defaultValues?.price?.toString() ?? ""
  );

  const [duration, setDuration] = useState(
    defaultValues?.duration?.toString() ?? ""
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await onSubmit({
      name,
      price: Number(price),
      duration: Number(duration),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Nome
        </label>

        <Input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Corte Masculino"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Preço
        </label>

        <Input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="35.00"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Duração (minutos)
        </label>

        <Input
          type="number"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
          placeholder="30"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {submitLabel}
      </Button>
    </form>
  );
}