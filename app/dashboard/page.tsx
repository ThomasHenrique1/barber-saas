import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/jwt";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import {
  getAdminStats,
  type AdminStats,
} from "@/src/actions/dashboard/get-admin-stats";

type UserToken = {
  id: string;
  email: string;
  role: string;
};

export default async function DashboardPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user =
      verifyToken(token) as UserToken;

    let stats: AdminStats | null = null;

    if (user.role === "ADMIN") {
      stats = await getAdminStats();
    }

    return (
      <DashboardHome
        user={user}
        stats={stats}
      />
    );
  } catch {
    redirect("/login");
  }
}