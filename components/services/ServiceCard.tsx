import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ServiceItem } from "@/src/actions/services/get-services";

type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {service.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
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

        <div>
          <span className="font-medium">
            Status:
          </span>{" "}
          {service.active
            ? "Ativo"
            : "Inativo"}
        </div>
      </CardContent>
    </Card>
  );
}