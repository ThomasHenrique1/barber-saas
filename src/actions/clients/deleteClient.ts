"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";

import { deleteClient } from "@/lib/users";

export async function deleteClientAction(
  id: string
) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  const deleted =
    await deleteClient(id);

  if (!deleted) {
    throw new Error(
      "Cliente não encontrado"
    );
  }

  revalidatePath("/dashboard/clients");
}