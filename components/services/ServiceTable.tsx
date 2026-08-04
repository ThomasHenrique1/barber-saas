import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
    <Card className="overflow-hidden border-border/70">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-6">
                Serviço
              </TableHead>

              <TableHead>
                Valor
              </TableHead>

              <TableHead>
                Duração
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead className="pr-6 text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                />
              ))
            ) : (
              <TableRow>
                <td
                  colSpan={5}
                  className="py-16 text-center text-muted-foreground"
                >
                  Nenhum serviço cadastrado.
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}