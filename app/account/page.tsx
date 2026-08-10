import type { ComponentType } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/jwt";

import { getNextAppointment } from "@/src/actions/account/get-next-appointment";
import { getHistory } from "@/src/actions/account/get-history";

import { AppContainer } from "@/components/layout/AppContainer";

import { AccountHero } from "@/components/account/AccountHero";
import { NextAppointmentCard } from "@/components/account/NextAppointmentCard";
import { QuickActions } from "@/components/account/QuickActions";
import { HistoryPreview } from "@/components/account/HistoryPreview";

type UserToken = {
  id: string;
  name?: string;
  email: string;
  role: string;
};


export default async function AccountPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user =
      verifyToken(token) as UserToken;

    const nextAppointment =
      await getNextAppointment(user.id);

    const history = await getHistory();

    const historyItems = history.map((item) => ({
      ...item,
      barber: item.barber.name,
      service: item.service.name,
    }));

    return (
      <AppContainer>

        <AccountHero user={user} />

        <div className="grid gap-6 xl:grid-cols-3">

          <div className="xl:col-span-2">
            <NextAppointmentCard
              appointment={nextAppointment}
            />
          </div>

          <QuickActions />

        </div>

        <HistoryPreview
          history={historyItems}
        />

      </AppContainer>
    );
  } catch {
    redirect("/login");
  }
}