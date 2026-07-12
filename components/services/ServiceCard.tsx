import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "@/src/actions/services/get-services";
import { DeleteServiceButton } from "@/components/services/DeleteServiceButton";
import { ToggleServiceButton } from "@/components/services/ToggleServiceButton";
import { EditServiceDialog } from "@/components/services/EditServiceDialog";
type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl">
            {service.name}
          </CardTitle>

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
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-muted-foreground">
          {service.description ??
            "Sem descrição cadastrada."}
        </p>

        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">
              Preço:
            </span>{" "}
            R$ {service.price.toFixed(2)}
          </div>

          <div>
            <span className="font-medium">
              Duração:
            </span>{" "}
            {service.duration} min
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
    <EditServiceDialog
        service={service}
      />

   <div className="rounded bg-red-500 px-3 py-2 text-white">
  TOGGLE TESTE
</div>

    <DeleteServiceButton
        serviceId={service.id}
      />
      </CardFooter>
    </Card>
  );
}