"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth";

import {
  createService as createServiceDb,
} from "@/lib/services";



type CreateServiceData = {
  name: string;
  description: string;
  price: number;
  duration: number;
};

export async function createService(
  data: CreateServiceData
) {

  const user = await getUser();

    if (!user || user.role !== "ADMIN") {
      throw new Error("Não autorizado");
    }

  const service =
    await createServiceDb({
      name: data.name,
      description: data.description,
      price: data.price,
      duration: data.duration,
    });

  revalidatePath("/dashboard/services");

  return service;
}