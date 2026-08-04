import { AppContainer } from "@/components/layout/AppContainer";

import { ProfileHero } from "@/components/profile/ProfileHero";
import { PersonalInfoCard } from "@/components/profile/PersonalInfoCard";
import { SecurityCard } from "@/components/profile/SecurityCard";

export default function ProfilePage() {
  const user = {
    name: "Thomas Navarro",
    email: "thomas@email.com",
    role: "Administrador",
  };

  return (
    <AppContainer>
      <div className="space-y-8">

        <ProfileHero user={user} />

        <div className="grid gap-8">

          <PersonalInfoCard user={user} />

          <SecurityCard />

        </div>

      </div>
    </AppContainer>
  );
}