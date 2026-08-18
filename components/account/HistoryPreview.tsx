"use client";

import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Scissors,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type HistoryItem = {
  id: string;
  service: string;
  barber: string;
  date: string;
  status: string;
};

type HistoryPreviewProps = {
  history: HistoryItem[];
};

const statusColors = {
  CONCLUÍDO: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  CANCELADO: "bg-rose-500/10 text-rose-600 border-rose-200",
  PENDENTE: "bg-amber-500/10 text-amber-600 border-amber-200",
  AGENDADO: "bg-blue-500/10 text-blue-600 border-blue-200",
};

function formatTime(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryPreview({
  history,
}: HistoryPreviewProps) {
  return (
    <Card className="overflow-hidden rounded-3xl border-border bg-card shadow-sm transition-all hover:shadow-md">
      <CardHeader className="border-b border-border/70 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays size={20} strokeWidth={1.5} />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight">
              Histórico recente
            </CardTitle>
          </div>

          <Link
            href="/account/history"
            className="group flex items-center gap-2 text-sm font-medium text-primary transition-all hover:opacity-80"
          >
            Ver histórico
            <ArrowRight 
              size={16} 
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-6">
        {history.map((item) => {
          const statusKey = item.status.toUpperCase() as keyof typeof statusColors;
          const statusColor = statusColors[statusKey] || statusColors.PENDENTE;

          return (
            <div
              key={item.id}
              className="
                group
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-border/70
                bg-muted/20
                p-4
                transition-all
                duration-300
                hover:border-primary/30
                hover:bg-primary/5
                hover:shadow-sm
                hover:-translate-y-0.5
                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-primary/20
                  "
                >
                  <Scissors size={20} strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="font-semibold transition-colors group-hover:text-primary">
                    {item.service}
                  </h3>

                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {item.barber}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays size={16} strokeWidth={1.5} />
                  <span>{formatTime(item.date)}</span>
                </div>

                <Badge 
                  className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${statusColor}`}
                >
                  {item.status}
                </Badge>

                <ChevronRight 
                  size={18} 
                  strokeWidth={1.5}
                  className="hidden text-muted-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary/50 md:block"
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}