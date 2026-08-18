"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Loader2 } from "lucide-react";

export type BarberFormData = {
  name: string;
  email: string;
  password?: string;
};

type BarberFormProps = {
  defaultValues?: BarberFormData;
  isLoading?: boolean;
  submitLabel?: string;
  showPassword?: boolean;
  onSubmit: (data: BarberFormData) => Promise<void> | void;
};

export function BarberForm({
  defaultValues,
  isLoading = false,
  submitLabel = "Salvar",
  showPassword = true,
  onSubmit,
}: BarberFormProps) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [email, setEmail] = useState(defaultValues?.email ?? "");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSubmit({ name, email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nome */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome completo
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do barbeiro"
            disabled={isLoading}
            className="pl-9"
            required
          />
        </div>
      </div>

      {/* E-mail */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          E-mail
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="barbeiro@email.com"
            disabled={isLoading}
            className="pl-9"
            required
          />
        </div>
      </div>

      {/* Senha */}
      {showPassword && (
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite uma senha segura"
              disabled={isLoading}
              className="pl-9"
              required={showPassword}
              minLength={6}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Mínimo 6 caracteres
          </p>
        </div>
      )}

      {/* Botão */}
      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}