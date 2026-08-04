import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/jwt";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

type UserToken = {
  id: string;
  name?: string;
  email: string;
  role: string;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user = verifyToken(token) as UserToken;

    return (
      <div className="flex min-h-screen bg-background">
  <Sidebar />

  <div className="flex min-h-screen flex-1 flex-col">
    <Topbar user={user} />

    <main className="flex-1 overflow-y-auto">
      {children}
    </main>
  </div>
</div>
    );
  } catch {
    redirect("/login");
  }
}