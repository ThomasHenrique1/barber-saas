"use server";

import { revalidatePath } from "next/cache";

import {
  deleteService as deleteServiceDb,
} from "@/lib/services";
import { getUser } from "@/lib/auth";

type DeleteServiceData = {
  id: string;
};


export async function deleteService({
  id,
}: DeleteServiceData) {

    const user = await getUser();

    if (!user || user.role !== "ADMIN") {
      throw new Error("Não autorizado");
    }
 
  const deleted =
    await deleteServiceDb(id);

  if (!deleted) {
    throw new Error(
      "Serviço não encontrado"
    );
  }

  revalidatePath("/dashboard/services");
}