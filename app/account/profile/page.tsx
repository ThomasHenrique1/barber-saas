import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth";
import { getProfile } from "@/src/actions/account/get-profile";

import { AppContainer } from "@/components/layout/AppContainer";
import { ProfilePageClient } from "./ProfilePageClient";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "CLIENT") {
    redirect("/dashboard");
  }

  const profile = await getProfile();

  if (!profile) {
    redirect("/account");
  }

  return (
    <AppContainer>
      <ProfilePageClient
        profile={profile}
      />
    </AppContainer>
  );
}