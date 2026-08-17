"use client";

import {
  CalendarDays,
  Mail,
  UserRound,
  CheckCircle2,
  Shield,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type ClientProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type ProfilePageClientProps = {
  profile: ClientProfile;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function ProfilePageClient({
  profile,
}: ProfilePageClientProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserRound size={22} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Meu perfil
          </h1>
        </div>
        <p className="ml-13 text-muted-foreground">
          Consulte seus dados cadastrados no BarberHub.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Informações principais */}
        <Card className="overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm transition-all hover:shadow-md lg:col-span-2">
          <CardHeader className="border-b border-border/70 bg-linear-to-br from-primary/5 via-primary/3 to-transparent px-6 py-5">
            <CardTitle className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserRound size={18} strokeWidth={1.5} />
              </div>
              Informações pessoais
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Nome
              </p>
              <p className="mt-2 font-semibold transition-colors group-hover:text-primary">
                {profile.name}
              </p>
            </div>

            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                E-mail
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Mail size={16} strokeWidth={1.5} className="text-muted-foreground transition-colors group-hover:text-primary" />
                <p className="font-semibold transition-colors group-hover:text-primary">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Tipo de conta
              </p>
              <div className="mt-2">
                <Badge className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                  Cliente
                </Badge>
              </div>
            </div>

            <div className="group rounded-2xl border border-border/70 bg-muted/20 p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Cliente desde
              </p>
              <div className="mt-2 flex items-center gap-2">
                <CalendarDays size={16} strokeWidth={1.5} className="text-muted-foreground transition-colors group-hover:text-primary" />
                <p className="font-semibold capitalize transition-colors group-hover:text-primary">
                  {formatDate(profile.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de conta */}
        <Card className="overflow-hidden rounded-3xl border-border/70 bg-card shadow-sm transition-all hover:shadow-md">
          <CardHeader className="border-b border-border/70 bg-linear-to-br from-primary/5 via-primary/3 to-transparent px-6 py-5">
            <CardTitle className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield size={18} strokeWidth={1.5} />
              </div>
              Conta
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-col items-center rounded-2xl border border-border/70 bg-linear-to-br from-muted/20 to-muted/5 p-6 text-center transition-all hover:border-primary/30 hover:shadow-sm">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-sm" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-primary/5 text-primary shadow-sm">
                  <UserRound size={32} strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-1 ring-2 ring-background">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
              </div>

              <h2 className="mt-4 text-lg font-bold">
                {profile.name}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Cliente BarberHub
              </p>

              <Badge className="mt-4 rounded-full border border-emerald-200 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-emerald-600">
                Conta ativa
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}