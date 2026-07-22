import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { UserItem } from "@/lib/users";

import { BarberRow } from "./BarberRow";

type BarberTableProps = {
  barbers: UserItem[];
};

export function BarberTable({
  barbers,
}: BarberTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Nome
          </TableHead>

          <TableHead>
            E-mail
          </TableHead>

          <TableHead>
            Status
          </TableHead>

          <TableHead className="text-right">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {barbers.map((barber) => (
          <BarberRow
            key={barber.id}
            barber={barber}
          />
        ))}
      </TableBody>
    </Table>
  );
}