"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";

import { createClient } from "@/lib/users";

export async function createClientAction(
  data: Parameters<typeof createClient>[0]
) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  const client =
    await createClient(data);

  revalidatePath("/dashboard/clients");

  return client;
}