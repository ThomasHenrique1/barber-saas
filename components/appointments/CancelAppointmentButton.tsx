"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cancelAppointment } from "@/src/actions/appointments/cancel-appointment";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2, XCircle, AlertTriangle } from "lucide-react";

type CancelAppointmentButtonProps = {
  appointmentId: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onCancelSuccess?: () => void;
};

export function CancelAppointmentButton({
  appointmentId,
  variant = "destructive",
  size = "default",
  className = "",
  onCancelSuccess,
}: CancelAppointmentButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleCancel() {
    setLoading(true);

    try {
      const result = await cancelAppointment(appointmentId);

      if (!result.success) {
        // Usar toast ou alerta mais amigável
        alert(result.error ?? "Não foi possível cancelar o agendamento.");
        setDialogOpen(false);
        return;
      }

      setDialogOpen(false);
      
      // Callback de sucesso
      if (onCancelSuccess) {
        onCancelSuccess();
      } else {
        // Recarregar a página ou redirecionar
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao cancelar o agendamento.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`group gap-2 transition-all duration-300 ${
          variant === "destructive" 
            ? "hover:bg-rose-600 hover:shadow-md hover:shadow-rose-500/20" 
            : "hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
        } ${className}`}
        onClick={() => setDialogOpen(true)}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" strokeWidth={2} />
            Cancelando...
          </>
        ) : (
          <>
            <XCircle size={16} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
            Cancelar
          </>
        )}
      </Button>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="rounded-3xl border-border/70 shadow-xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                <AlertTriangle size={24} strokeWidth={1.5} />
              </div>
              <AlertDialogTitle className="text-xl font-bold tracking-tight">
                Cancelar agendamento
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="mt-4 text-base leading-relaxed">
              Tem certeza que deseja cancelar este agendamento?
              <br />
              <span className="text-sm text-muted-foreground">
                Esta ação não pode ser desfeita.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 sm:gap-2">
            <AlertDialogCancel 
              className="rounded-xl border-border/70 transition-all hover:bg-muted/50"
              disabled={loading}
            >
              Manter agendamento
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={loading}
              className="rounded-xl bg-rose-500 text-white transition-all hover:bg-rose-600 hover:shadow-md hover:shadow-rose-500/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" strokeWidth={2} />
                  Cancelando...
                </>
              ) : (
                "Sim, cancelar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}