"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.error ||
            "Erro ao sair da conta"
        );
        return;
      }

      toast.success("Logout realizado");

      router.push("/login");
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
    <Button
      variant="destructive"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Saindo...
        </>
      ) : (
        "Sair"
      )}
    </Button>
  );
} 