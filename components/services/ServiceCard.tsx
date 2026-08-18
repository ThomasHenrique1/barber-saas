import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scissors, Clock, DollarSign, FileText } from "lucide-react";
import type { ServiceItem } from "@/src/actions/services/get-services";
import { DeleteServiceButton } from "@/components/services/DeleteServiceButton";
import { ToggleServiceButton } from "@/components/services/ToggleServiceButton";
import { EditServiceDialog } from "@/components/services/EditServiceDialog";

type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Card className="flex h-full flex-col transition-all hover:shadow-md border-border/70">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Scissors size={18} />
            </div>
            <CardTitle className="text-base font-semibold truncate">
              {service.name}
            </CardTitle>
          </div>

          <Badge
            variant={service.active ? "default" : "secondary"}
            className={
              service.active
                ? "bg-emerald-500 hover:bg-emerald-600 shrink-0"
                : "shrink-0"
            }
          >
            {service.active ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <FileText size={15} className="shrink-0 mt-0.5" />
          <p className="line-clamp-2">
            {service.description ?? "Sem descrição cadastrada."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <DollarSign size={15} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Preço</p>
              <p className="font-semibold text-sm">
                {formatCurrency(service.price)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={15} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Duração</p>
              <p className="font-semibold text-sm">{service.duration} min</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-1.5 pt-3 border-t border-border/50">
        <EditServiceDialog service={service} />
        <ToggleServiceButton service={service} />
        <DeleteServiceButton serviceId={service.id} serviceName={service.name} />
      </CardFooter>
    </Card>
  );
}