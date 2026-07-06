import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/jwt";
import { getServices } from "@/src/actions/services/get-services";
import { ServicesList } from "@/components/services/ServicesList";
import { AppContainer } from "@/components/layout/AppContainer";
import { PageHeader } from "@/components/layout/PageHeader";

type UserToken = {
  id: string;
  email: string;
  role: string;
};

export default async function ServicesPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    verifyToken(token) as UserToken;

    const services = await getServices();

    return (
       <AppContainer>
    <PageHeader
      title="Serviços"
      description="Lista de serviços cadastrados"
    />

    <ServicesList services={services} />
  </AppContainer>
    );
  } catch {
    redirect("/login");
  }
}