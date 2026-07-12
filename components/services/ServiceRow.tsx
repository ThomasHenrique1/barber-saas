import { Badge } from "@/components/ui/badge";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import {
  type ServiceItem,
} from "@/src/actions/services/get-services";

import { EditServiceDialog } from "./EditServiceDialog";
import { ToggleServiceButton } from "./ToggleServiceButton";
import { DeleteServiceButton } from "./DeleteServiceButton";

type ServiceRowProps = {
  service: ServiceItem;
};

export function ServiceRow({
  service,
}: ServiceRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {service.name}
      </TableCell>

      <TableCell>
        R$ {service.price.toFixed(2)}
      </TableCell>

      <TableCell>
        {service.duration} min
      </TableCell>

      <TableCell>
        <Badge
          variant={
            service.active
              ? "default"
              : "secondary"
          }
        >
          {service.active
            ? "Ativo"
            : "Inativo"}
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <EditServiceDialog
            service={service}
          />

          <ToggleServiceButton
            service={service}
          />

          <DeleteServiceButton
            serviceId={service.id}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}