"use server";

import { revalidatePath } from "next/cache";

import {
  updateService as updateServiceDb,
} from "@/lib/services";
import { getUser } from "@/lib/auth";

type UpdateServiceData = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
};

export async function updateService(
  data: UpdateServiceData
) {

  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
  throw new Error("Não autorizado");
  }

  const service =
    await updateServiceDb(data.id, {
      name: data.name,
      description: data.description,
      price: data.price,
      duration: data.duration,
    });

  if (!service) {
    throw new Error(
      "Serviço não encontrado"
    );
  }

  revalidatePath("/dashboard/services");

  return service;
}