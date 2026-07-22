"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";
import { createBarber } from "@/lib/users";

type CreateBarberData = {
  name: string;
  email: string;
  password: string;
};

export async function createBarberAction(
  data: CreateBarberData
) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  const barber =
    await createBarber(data);

  revalidatePath("/dashboard/barbers");

  return barber;
}