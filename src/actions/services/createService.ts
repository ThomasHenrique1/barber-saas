"use server";

import { revalidatePath } from "next/cache";

const API_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  "http://localhost:3000";

export async function createService(data: {
  name: string;
  price: number;
  duration: number;
}) {
  const response = await fetch(
    `${API_URL}/api/services`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.error ?? "Erro ao criar serviço"
    );
  }

  revalidatePath("/dashboard/services");

  return response.json();
}