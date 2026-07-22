"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";
import { toggleBarber } from "@/lib/users";

type ToggleBarberData = {
  id: string;
  active: boolean;
};

export async function toggleBarberAction(
  data: ToggleBarberData
) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  const barber =
    await toggleBarber(
      data.id,
      data.active
    );

  revalidatePath("/dashboard/barbers");

  return barber;
}