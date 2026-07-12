import { v4 as uuidv4 } from "uuid";

import { db } from "./db";

export type ServiceItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  active: boolean;
};

export type CreateServiceData = {
  name: string;
  description?: string | null;
  price: number;
  duration: number;
};

export async function createService(
  data: CreateServiceData
) {
  const result = await db.query(
    `
    INSERT INTO "Service"
    (
      id,
      name,
      description,
      price,
      duration,
      active
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      true
    )
    RETURNING
      id,
      name,
      description,
      price,
      duration,
      active
    `,
    [
      uuidv4(),
      data.name,
      data.description ?? null,
      data.price,
      data.duration,
    ]
  );

  const service = result.rows[0];

  return mapService(service);
}

export async function updateService(
  id: string,
  data: CreateServiceData
): Promise<ServiceItem | null> {
  const result = await db.query(
    `
    UPDATE "Service"
    SET
      name = $1,
      description = $2,
      price = $3,
      duration = $4
    WHERE id = $5
    RETURNING
      id,
      name,
      description,
      price,
      duration,
      active
    `,
    [
      data.name,
      data.description ?? null,
      data.price,
      data.duration,
      id,
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const service = result.rows[0];

  return mapService(service);
}

export async function getServices(): Promise<
  ServiceItem[]
> {
  const result = await db.query(`
    SELECT
      id,
      name,
      description,
      price,
      duration,
      active
    FROM "Service"
    ORDER BY "createdAt" DESC
  `);

  return result.rows.map(mapService);
}

export async function getServiceById(
  id: string
): Promise<ServiceItem | null> {
  const result = await db.query(
    `
    SELECT
      id,
      name,
      description,
      price,
      duration,
      active
    FROM "Service"
    WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const service = result.rows[0];

  return mapService(service);
}

export async function toggleService(
  id: string,
  active: boolean
): Promise<ServiceItem | null> {
  const result = await db.query(
    `
    UPDATE "Service"
    SET active = $1
    WHERE id = $2
    RETURNING
      id,
      name,
      description,
      price,
      duration,
      active
    `,
    [active, id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const service = result.rows[0];

  return mapService(service);

}

function mapService(service: {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  duration: number;
  active: boolean;
}): ServiceItem {
  return {
    id: service.id,
    name: service.name,
    description: service.description,
    price: Number(service.price),
    duration: service.duration,
    active: service.active,
  };
}

export async function deleteService(
  id: string
): Promise<boolean> {
  const result = await db.query(
    `
    DELETE FROM "Service"
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows.length > 0;
}
