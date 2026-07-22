"use server";

import { getUser } from "@/lib/auth";

import {
  getClients,
  type UserItem,
} from "@/lib/users";

export async function getClientsAction(): Promise<
  UserItem[]
> {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  return getClients();
}