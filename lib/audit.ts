import { db } from "@/lib/db";

import { v4 as uuidv4 } from "uuid";

export async function createAuditLog(
  action: string,
  userId: string,
  details?: string
) {
  await db.query(
    `
    INSERT INTO "AuditLog"
    (
      id,
      action,
      "userId",
      details
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4
    )
    `,
    [
      uuidv4(),
      action,
      userId,
      details ?? null,
    ]
  );
}