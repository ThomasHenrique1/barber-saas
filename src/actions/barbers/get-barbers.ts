"use server";

import { getUser } from "@/lib/auth";
import {
  getBarbers,
  type UserItem,
} from "@/lib/users";

export async function getBarbersAction(): Promise<
  UserItem[]
> {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  return getBarbers();
}