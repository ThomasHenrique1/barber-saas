"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AppointmentsFiltersProps = {
  date: string;
  status: string;
  barberId: string;
  role: string;
};

const statusOptions = [
  {
    value: "",
    label: "Todos os status",
  },
  {
    value: "PENDING",
    label: "Pendentes",
  },
  {
    value: "COMPLETED",
    label: "Concluídos",
  },
  {
    value: "CANCELED",
    label: "Cancelados",
  },
];

export function AppointmentsFilters({
  date,
  status,
  barberId,
  role,
}: AppointmentsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedDate, setSelectedDate] =
    useState(date);

  const [selectedStatus, setSelectedStatus] =
    useState(status);

  function applyFilters() {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (selectedDate) {
      params.set("date", selectedDate);
    } else {
      params.delete("date");
    }

    if (selectedStatus) {
      params.set(
        "status",
        selectedStatus
      );
    } else {
      params.delete("status");
    }

    if (role !== "ADMIN") {
      params.delete("barberId");
    } else if (barberId) {
      params.set("barberId", barberId);
    }

    router.push(
      `/dashboard/appointments?${params.toString()}`
    );
  }

  function clearFilters() {
    setSelectedDate("");
    setSelectedStatus("");

    router.push(
      "/dashboard/appointments"
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1 space-y-2">
          <label
            htmlFor="appointment-date"
            className="text-sm font-medium"
          >
            Data
          </label>

          <Input
            id="appointment-date"
            type="date"
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(
                event.target.value
              )
            }
          />
        </div>

        <div className="flex-1 space-y-2">
          <label
            htmlFor="appointment-status"
            className="text-sm font-medium"
          >
            Status
          </label>

          <select
            id="appointment-status"
            value={selectedStatus}
            onChange={(event) =>
              setSelectedStatus(
                event.target.value
              )
            }
            className="
              flex
              h-10
              w-full
              rounded-md
              border
              border-input
              bg-background
              px-3
              py-2
              text-sm
              outline-none
              transition
              focus:ring-2
              focus:ring-ring
            "
          >
            {statusOptions.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            onClick={applyFilters}
          >
            Filtrar
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
          >
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
}