"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail } from "lucide-react";
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

export function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      toast.error(
        "Preencha email e senha"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.error ||
            "Erro ao fazer login"
        );
        return;
      }

      toast.success("Login realizado");

      router.push("/dashboard");
      router.refresh();
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
          Acesse sua conta
        </h2>

        <p className="mt-3 leading-7 text-muted-foreground">
          Insira suas credenciais para continuar utilizando o BarberHub.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Email */}

        <div className="space-y-3">

          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <div className="relative">

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

          </div>

        </div>

        {/* Senha */}

        <div className="space-y-3">

          <div className="flex items-center justify-between">

            <label
              htmlFor="password"
              className="text-sm font-medium"
            >
              Senha
            </label>

            <Link
          href=" /forgot-password"
          className="ml-2
              font-medium
              text-primary
              transition-opacity
              hover:opacity-80"
        >
          Esqueceu sua senha?
        </Link>

          </div>

          <div className="relative">

            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Digite sua senha"
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
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        {/* Divider */}

        <div className="relative py-2">

          <div className="absolute inset-0 flex items-center">

            <span className="w-full border-t border-border" />

          </div>

          <div className="relative flex justify-center">

            <span className="bg-card px-4 text-xs uppercase tracking-wider text-muted-foreground ">
              ou
            </span>

          </div>

        </div>

        {/* Cadastro */}

        <div className="text-center text-sm">

          <span className="text-muted-foreground">
            Ainda não possui uma conta?
          </span>

          <Link
          href="/register"
          className="ml-2
              font-medium
              text-primary
              transition-opacity
              hover:opacity-80"
        >
          Criar conta
        </Link>

        </div>

      </form>

    </CardContent>

  </Card>
);
}