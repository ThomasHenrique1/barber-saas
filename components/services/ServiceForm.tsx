"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tag,
  DollarSign,
  Clock,
  FileText,
  Loader2,
  Scissors,
} from "lucide-react";

export type ServiceFormData = {
  name: string;
  description: string;
  price: number;
  duration: number;
};

type ServiceFormProps = {
  defaultValues?: ServiceFormData;
  isLoading?: boolean;
  submitLabel?: string;
  onSubmit: (data: ServiceFormData) => Promise<void> | void;
};

export function ServiceForm({
  defaultValues,
  isLoading = false,
  submitLabel = "Salvar",
  onSubmit,
}: ServiceFormProps) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [price, setPrice] = useState(defaultValues?.price?.toString() ?? "");
  const [duration, setDuration] = useState(defaultValues?.duration?.toString() ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit({
      name,
      description,
      price: Number(price),
      duration: Number(duration),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nome */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome do serviço
        </label>
        <div className="relative">
          <Scissors className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Corte Masculino"
            disabled={isLoading}
            className="pl-9"
            required
          />
        </div>
      </div>

      {/* Preço */}
      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium">
          Preço
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            disabled={isLoading}
            className="pl-9"
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Use ponto para separar os centavos (ex: 35.50)
        </p>
      </div>

      {/* Duração */}
      <div className="space-y-2">
        <label htmlFor="duration" className="text-sm font-medium">
          Duração
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="30"
            disabled={isLoading}
            className="pl-9"
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Tempo em minutos necessário para realizar o serviço
        </p>
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Descrição
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva os detalhes do serviço..."
            disabled={isLoading}
            className="min-h-20 pl-9 resize-y"
            rows={3}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Opcional. Descreva o que está incluso no serviço.
        </p>
      </div>

      {/* Botão */}
      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Salvando...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}