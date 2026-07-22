"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/auth";
import { deleteBarber } from "@/lib/users";

type DeleteBarberData = {
  id: string;
};

export async function deleteBarberAction(
  data: DeleteBarberData
) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Não autorizado");
  }

  await deleteBarber(data.id);

  revalidatePath("/dashboard/barbers");
}