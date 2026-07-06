import {
  getServices as getServicesFromDb,
  type ServiceItem,
} from "@/lib/services";

export type { ServiceItem };

export async function getServices(): Promise<
  ServiceItem[]
> {
  return getServicesFromDb();
}