import { LogoutButton } from "@/components/auth/LogoutButton";

type TopbarProps = {
  user: {
    name?: string;
    email: string;
    role: string;
  };
};

export function Topbar({
  user,
}: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-lg font-semibold">
          Olá,
          {" "}
          {user.name ? user.name : user.email}
        </h1>

        <p className="text-sm text-muted-foreground">
          {user.role}
        </p>
      </div>

      <LogoutButton />
    </header>
  );
}