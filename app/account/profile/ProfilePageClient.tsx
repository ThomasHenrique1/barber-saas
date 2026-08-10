"use client";

import {
  CalendarDays,
  Mail,
  UserRound,
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

function formatDate(
  date: string
) {
  return new Date(date).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
}

export function ProfilePageClient({
  profile,
}: ProfilePageClientProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Meu perfil
        </h1>

        <p className="mt-2 text-muted-foreground">
          Consulte seus dados cadastrados no BarberHub.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border lg:col-span-2">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <UserRound
                size={20}
                className="text-primary"
              />

              Informações pessoais
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6 p-8 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">
                Nome
              </p>

              <p className="mt-2 font-semibold">
                {profile.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                E-mail
              </p>

              <div className="mt-2 flex items-center gap-2">
                <Mail
                  size={16}
                  className="text-muted-foreground"
                />

                <p className="font-semibold">
                  {profile.email}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Tipo de conta
              </p>

              <div className="mt-2">
                <Badge>
                  Cliente
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Cliente desde
              </p>

              <div className="mt-2 flex items-center gap-2">
                <CalendarDays
                  size={16}
                  className="text-muted-foreground"
                />

                <p className="font-semibold capitalize">
                  {formatDate(
                    profile.createdAt
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border">
          <CardHeader>
            <CardTitle>
              Conta
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col items-center rounded-2xl border border-border bg-muted/20 p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <UserRound
                  size={28}
                  className="text-primary"
                />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                {profile.name}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Cliente BarberHub
              </p>

              <Badge
                variant="secondary"
                className="mt-4"
              >
                Conta ativa
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}