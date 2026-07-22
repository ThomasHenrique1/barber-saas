"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  onSubmit: (
    data: BarberFormData
  ) => Promise<void> | void;
};

export function BarberForm({
  defaultValues,
  isLoading = false,
  submitLabel = "Salvar",
  showPassword = true,
  onSubmit,
}: BarberFormProps) {
  const [name, setName] = useState(
    defaultValues?.name ?? ""
  );

  const [email, setEmail] = useState(
    defaultValues?.email ?? ""
  );

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await onSubmit({
      name,
      email,
      password,
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
          placeholder="Nome do barbeiro"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          E-mail
        </label>

        <Input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="barbeiro@email.com"
          disabled={isLoading}
        />
      </div>

      {showPassword && (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Senha
          </label>

          <Input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="********"
            disabled={isLoading}
          />
        </div>
      )}

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