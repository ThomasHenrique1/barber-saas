"use client";

import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  Scissors,
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

export function HistoryPreview({
  history,
}: HistoryPreviewProps) {
  return (
    <Card className="rounded-3xl border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Histórico recente
        </CardTitle>

        <Link
          href="/account/history"
          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-primary
            transition-opacity
            hover:opacity-80
          "
        >
          Ver histórico

          <ArrowRight size={16} />
        </Link>
      </CardHeader>

      <CardContent className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-border
              p-5
              transition-colors
              hover:bg-muted/30
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
              >
                <Scissors size={20} />
              </div>

              <div>
                <h3 className="font-semibold">
                  {item.service}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.barber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
                <CalendarDays size={16} />

                {item.date}
              </div>

              <Badge variant="secondary">
                {item.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}