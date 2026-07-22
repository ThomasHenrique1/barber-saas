"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";

import { updateClient } from "@/lib/users";

type UpdateClientData = {
  name: string;
  email: string;
};

type UpdateClientActionData =
  UpdateClientData & {
    id: string;
  };

export async function updateClientAction(
  data: UpdateClientActionData
) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  const client =
    await updateClient(data.id, {
      name: data.name,
      email: data.email,
    });

  if (!client) {
    throw new Error(
      "Cliente não encontrado"
    );
  }

  revalidatePath("/dashboard/clients");

  return client;
}