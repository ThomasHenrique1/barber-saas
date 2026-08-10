import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";
import { getHistory } from "@/src/actions/account/get-history";

import { AppContainer } from "@/components/layout/AppContainer";
import { HistoryPageClient } from "./HistoryPageClient";

export default async function HistoryPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const history = await getHistory();

  return (
    <AppContainer>
      <HistoryPageClient history={history} />
    </AppContainer>
  );
}