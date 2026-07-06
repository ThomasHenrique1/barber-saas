import Link from "next/link";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Serviços",
    href: "/dashboard/services",
  },
  {
    label: "Agendamentos",
    href: "/dashboard/appointments",
  },
  {
    label: "Pagamentos",
    href: "/dashboard/payments",
  },
  {
    label: "Perfil",
    icon: "user",
    href: "/dashboard/profile",
  },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          Barber SaaS
        </h2>

        <p className="text-sm text-muted-foreground">
          Painel Administrativo
        </p>
      </div>

      <nav className="flex flex-col gap-1 p-4 text-black">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}