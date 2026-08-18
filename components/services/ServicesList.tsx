import { ServiceCard } from "@/components/services/ServiceCard";
import { Scissors, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "@/src/actions/services/get-services";

type ServicesListProps = {
  services: ServiceItem[];
  onAdd?: () => void;
};

export function ServicesList({ services, onAdd }: ServicesListProps) {
  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center transition-colors hover:bg-card">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
          <Scissors size={32} className="text-muted-foreground/50" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Nenhum serviço cadastrado</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Comece adicionando seu primeiro serviço ao catálogo da sua barbearia.
        </p>
        {onAdd && (
          <Button className="mt-6 gap-2" onClick={onAdd}>
            <Plus size={16} />
            Adicionar serviço
          </Button>
        )}
      </div>
    );
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
}