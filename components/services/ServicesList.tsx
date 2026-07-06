import { ServiceCard } from "@/components/services/ServiceCard";
import type { ServiceItem } from "@/src/actions/services/get-services";

type ServicesListProps = {
  services: ServiceItem[];
};

export function ServicesList({
  services,
}: ServicesListProps) {
  if (services.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        Nenhum serviço cadastrado.
      </div>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
        />
      ))}
    </section>
  );
}