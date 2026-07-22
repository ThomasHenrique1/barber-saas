import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/jwt";

import { getBarbersAction } from "@/src/actions/barbers/get-barbers";

import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

import { CreateBarberDialog } from "@/components/barbers/CreateBarberDialog";
import { BarberTable } from "@/components/barbers/BarberTable";

type UserToken = {
  id: string;
  email: string;
  role: string;
};

export default async function BarbersPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    verifyToken(token) as UserToken;

    const barbers =
      await getBarbersAction();

    return (
      <AppContainer>
        <PageHeader
          title="Barbeiros"
          description="Gerencie os barbeiros do sistema"
        />

        <div className="mb-6 flex justify-end">
          <CreateBarberDialog />
        </div>

        <BarberTable
          barbers={barbers}
        />
      </AppContainer>
    );
  } catch {
    redirect("/login");
  }
}