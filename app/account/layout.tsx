import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/jwt";

import { Topbar } from "@/components/layout/Topbar";
import { AccountSidebar } from "@/components/account/AccountSidebar";

type AccountLayoutProps = {
  children: React.ReactNode;
};

type UserToken = {
  id: string;
  name?: string;
  email: string;
  role: string;
};

export default async function AccountLayout({
  children,
}: AccountLayoutProps) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user = verifyToken(token) as UserToken;

    if (user.role !== "CLIENT") {
      redirect("/dashboard");
    }

    return (
      <div className="flex min-h-screen bg-background">
        <AccountSidebar />

        <div className="flex flex-1 flex-col">
          <Topbar user={user} />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    );
  } catch {
    redirect("/login");
  }
}