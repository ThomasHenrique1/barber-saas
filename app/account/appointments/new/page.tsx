import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";

import { NewAppointmentClient } from "@/components/account/new/NewAppointmentClient";

export default async function NewAppointmentPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const servicesResult = await db.query(
    `
    SELECT
      id,
      name,
      description,
      duration,
      price
    FROM "Service"
    WHERE active = true
    ORDER BY name ASC
    `
  );

  const barbersResult = await db.query(
    `
    SELECT
      id,
      name
    FROM "User"
    WHERE
      role = 'BARBER'
      AND active = true
    ORDER BY name ASC
    `
  );

  const services = servicesResult.rows.map(
    (service) => ({
      id: service.id,
      name: service.name,
      description:
        service.description,
      duration:
        Number(service.duration),
      price:
        Number(service.price),
    })
  );

  const barbers = barbersResult.rows.map(
    (barber) => ({
      id: barber.id,
      name: barber.name,
    })
  );

  return (
    <NewAppointmentClient
      services={services}
      barbers={barbers}
    />
  );
}