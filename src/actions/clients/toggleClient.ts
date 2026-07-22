"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";

import {
  toggleClient,
  type UserItem,
} from "@/lib/users";

type ToggleClientActionData = {
  id: string;
  active: boolean;
};

export async function toggleClientAction({
  id,
  active,
}: ToggleClientActionData): Promise<UserItem> {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  const client =
    await toggleClient(id, active);

  if (!client) {
    throw new Error(
      "Cliente não encontrado"
    );
  }

  revalidatePath("/dashboard/clients");

  return client;
}