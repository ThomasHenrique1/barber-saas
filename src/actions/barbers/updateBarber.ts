"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";
import { updateBarber } from "@/lib/users";

type UpdateBarberData = {
  id: string;
  name: string;
  email: string;
};

export async function updateBarberAction(
  data: UpdateBarberData
) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  const barber =
    await updateBarber(data.id, {
      name: data.name,
      email: data.email,
    });

  revalidatePath("/dashboard/barbers");

  return barber;
}