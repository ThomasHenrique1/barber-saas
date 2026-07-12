import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { ServiceItem } from "@/src/actions/services/get-services";

import { ServiceRow } from "./ServiceRow";

type ServiceTableProps = {
  services: ServiceItem[];
};

export function ServiceTable({
  services,
}: ServiceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>

          <TableHead>Preço</TableHead>

          <TableHead>Duração</TableHead>

          <TableHead>Status</TableHead>

          <TableHead className="text-right">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {services.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
          />
        ))}
      </TableBody>
    </Table>
  );
}