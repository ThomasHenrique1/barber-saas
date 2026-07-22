import { v4 as uuidv4 } from "uuid";

import { db } from "./db";
import bcrypt from "bcryptjs";

export type UserRole =
  | "ADMIN"
  | "BARBER"
  | "CLIENT";

export type UserItem = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
};

export type CreateBarberData = {
  name: string;
  email: string;
  password: string;
};

export type UpdateBarberData = {
  name: string;
  email: string;
};

export async function getBarbers(): Promise<
  UserItem[]
> {
  const result = await db.query(
    `
    SELECT
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    FROM "User"
    WHERE role = 'BARBER'
    ORDER BY name ASC
    `
  );

  return result.rows.map(mapUser);
}

export async function getBarberById(
  id: string
): Promise<UserItem | null> {
  const result = await db.query(
    `
    SELECT
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    FROM "User"
    WHERE id = $1
      AND role = 'BARBER'
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function getClients(): Promise<
  UserItem[]
> {
  const result = await db.query(
    `
    SELECT
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    FROM "User"
    WHERE role = 'CLIENT'
    ORDER BY name ASC
    `
  );

  return result.rows.map(mapUser);
}

export async function getClientById(
  id: string
): Promise<UserItem | null> {
  const result = await db.query(
    `
    SELECT
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    FROM "User"
    WHERE id = $1
      AND role = 'CLIENT'
    `,
    [id]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function createBarber(
  data: CreateBarberData
): Promise<UserItem> {
  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10
    );

  const result = await db.query(
    `
    INSERT INTO "User"
    (
      id,
      name,
      email,
      password,
      role,
      active
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      'BARBER',
      true
    )
    RETURNING
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    `,
    [
      uuidv4(),
      data.name,
      data.email,
      hashedPassword,
    ]
  );

  return mapUser(result.rows[0]);
}

export async function createClient(
  data: CreateBarberData
): Promise<UserItem> {
  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10
    );

  const result = await db.query(
    `
    INSERT INTO "User"
    (
      id,
      name,
      email,
      password,
      role,
      active
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      'CLIENT',
      true
    )
    RETURNING
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    `,
    [
      uuidv4(),
      data.name,
      data.email,
      hashedPassword,
    ]
  );

  return mapUser(result.rows[0]);
}

export async function updateBarber(
  id: string,
  data: UpdateBarberData
): Promise<UserItem | null> {
  const result = await db.query(
    `
    UPDATE "User"
    SET
      name = $1,
      email = $2
    WHERE id = $3
      AND role = 'BARBER'
    RETURNING
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    `,
    [
      data.name,
      data.email,
      id,
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function updateClient(
  id: string,
  data: UpdateBarberData
): Promise<UserItem | null> {
  const result = await db.query(
    `
    UPDATE "User"
    SET
      name = $1,
      email = $2
    WHERE id = $3
      AND role = 'CLIENT'
    RETURNING
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    `,
    [
      data.name,
      data.email,
      id,
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function toggleBarber(
  id: string,
  active: boolean
): Promise<UserItem | null> {
  const result = await db.query(
    `
    UPDATE "User"
    SET active = $1
    WHERE id = $2
      AND role = 'BARBER'
    RETURNING
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    `,
    [
      active,
      id,
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function toggleClient(
  id: string,
  active: boolean
): Promise<UserItem | null> {
  const result = await db.query(
    `
    UPDATE "User"
    SET active = $1
    WHERE id = $2
      AND role = 'CLIENT'
    RETURNING
      id,
      name,
      email,
      role,
      active,
      "createdAt"
    `,
    [
      active,
      id,
    ]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return mapUser(result.rows[0]);
}

export async function deleteBarber(
  id: string
): Promise<boolean> {
  const result = await db.query(
    `
    DELETE FROM "User"
    WHERE id = $1
      AND role = 'BARBER'
    RETURNING id
    `,
    [id]
  );

  return result.rows.length > 0;
}

export async function deleteClient(
  id: string
): Promise<boolean> {
  const result = await db.query(
    `
    DELETE FROM "User"
    WHERE id = $1
      AND role = 'CLIENT'
    RETURNING id
    `,
    [id]
  );

  return result.rows.length > 0;
}

function mapUser(user: {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
}): UserItem {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
  };
}