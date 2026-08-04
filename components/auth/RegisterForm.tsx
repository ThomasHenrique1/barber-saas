"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Loader2,
  Mail,
  Lock,
  User,
} from "lucide-react";

export function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] =
    useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      toast.error(
        "Preencha todos os campos"
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error(
        "As senhas não coincidem"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.error ||
            "Erro ao cadastrar"
        );
        return;
      }

      toast.success(
        "Conta criada com sucesso"
      );

      router.push("/login");
    } catch {
      toast.error(
        "Erro ao conectar com o servidor"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
  <Card
    className="
      w-full
      rounded-3xl
      border-border/70
      bg-card/70
      shadow-none
      backdrop-blur-xl
    "
  >
    <CardContent className="p-8">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold tracking-tight">
          Crie sua conta
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          Comece a organizar sua barbearia em poucos minutos.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Nome */}

        <div className="space-y-3">

          <label
            htmlFor="name"
            className="text-sm font-medium"
          >
            Nome completo
          </label>

          <div className="relative">

            <User
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="
                h-12
                rounded-xl
                border-border
                bg-background/60
                pl-11
                transition-all
                focus-visible:border-primary
                focus-visible:ring-2
                focus-visible:ring-primary/20
              "
            />

          </div>

        </div>

        {/* Email */}

        <div className="space-y-3">

          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <div className="relative">

            <Mail
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              id="email"
              type="email"
              name="email"
              placeholder="voce@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="
                h-12
                rounded-xl
                border-border
                bg-background/60
                pl-11
                transition-all
                focus-visible:border-primary
                focus-visible:ring-2
                focus-visible:ring-primary/20
              "
            />

          </div>

        </div>

        {/* Senha */}

        <div className="space-y-3">

          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Senha
          </label>

          <div className="relative">

            <Lock
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Crie uma senha"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="
                h-12
                rounded-xl
                border-border
                bg-background/60
                pl-11
                transition-all
                focus-visible:border-primary
                focus-visible:ring-2
                focus-visible:ring-primary/20
              "
            />

          </div>

        </div>

        {/* Confirmar senha */}

        <div className="space-y-3">

          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium"
          >
            Confirmar senha
          </label>

          <div className="relative">

            <Lock
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-muted-foreground
              "
            />

            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Repita sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className="
                h-12
                rounded-xl
                border-border
                bg-background/60
                pl-11
                transition-all
                focus-visible:border-primary
                focus-visible:ring-2
                focus-visible:ring-primary/20
              "
            />

          </div>

        </div>

        {/* Botão */}

        <Button
          type="submit"
          disabled={loading}
          className="
            mt-2
            h-12
            w-full
            rounded-xl
            text-base
            font-semibold
            transition-all
            duration-300
            hover:-translate-y-0.5
          "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Criando conta...
            </>
          ) : (
            "Criar conta"
          )}
        </Button>

        {/* Divider */}

        <div className="relative py-2">

          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-card px-4 text-xs uppercase tracking-wider text-muted-foreground">
              ou
            </span>
          </div>

        </div>

        {/* Login */}

        <div className="text-center text-sm">

          <span className="text-muted-foreground">
            Já possui uma conta?
          </span>

          <Link
            href="/login"
            className="
              ml-2
              font-medium
              text-primary
              transition-opacity
              hover:opacity-80
            "
          >
            Entrar
          </Link>

        </div>

      </form>

    </CardContent>
  </Card>
);
}