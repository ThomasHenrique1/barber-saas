"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth";

import {
  toggleService as toggleServiceDb,
} from "@/lib/services";

type ToggleServiceData = {
  id: string;
  active: boolean;
};

export async function toggleService({
  id,
  active,
}: ToggleServiceData) {

  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
  throw new Error("Não autorizado");
  }

  const service =
    await toggleServiceDb(id, active);

  if (!service) {
    throw new Error(
      "Serviço não encontrado"
    );
  }

  revalidatePath("/dashboard/services");

  return service;
}