"use server";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";

export type ClientProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export async function getProfile(): Promise<
  ClientProfile | null
> {
  try {
    const user = await getUser();

    if (!user || user.role !== "CLIENT") {
      return null;
    }

    const result = await db.query(
      `
      SELECT
        id,
        name,
        email,
        role,
        "createdAt"
      FROM "User"
      WHERE id = $1
      LIMIT 1
      `,
      [user.id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const profile =
      result.rows[0];

    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
      createdAt:
        profile.createdAt instanceof Date
          ? profile.createdAt.toISOString()
          : profile.createdAt,
    };
  } catch (error) {
    console.error(
      "getProfile:",
      error
    );

    return null;
  }
}