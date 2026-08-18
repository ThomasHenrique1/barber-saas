import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Scissors, DollarSign, Clock } from "lucide-react";
import type { ServiceItem } from "@/src/actions/services/get-services";
import { EditServiceDialog } from "./EditServiceDialog";
import { ToggleServiceButton } from "./ToggleServiceButton";
import { DeleteServiceButton } from "./DeleteServiceButton";

type ServiceRowProps = {
  service: ServiceItem;
};

export function ServiceRow({ service }: ServiceRowProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <TableRow className="group hover:bg-muted/30 transition-colors">
      {/* Serviço */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Scissors size={15} />
          </div>
          <div>
            <p className="font-medium">{service.name}</p>
          </div>
        </div>
      </TableCell>

      {/* Preço */}
      <TableCell>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-medium text-foreground">
            {formatCurrency(service.price)}
          </span>
        </div>
      </TableCell>

      {/* Duração */}
      <TableCell>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock size={14} />
          <span>{service.duration} min</span>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          variant={service.active ? "default" : "secondary"}
          className={
            service.active
              ? "bg-emerald-500 hover:bg-emerald-600"
              : "bg-muted text-muted-foreground"
          }
        >
          {service.active ? "Ativo" : "Inativo"}
        </Badge>
      </TableCell>

      {/* Ações */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <EditServiceDialog service={service} />
          <ToggleServiceButton service={service} />
          <DeleteServiceButton serviceId={service.id} serviceName={service.name} />
        </div>
      </TableCell>
    </TableRow>
  );
}