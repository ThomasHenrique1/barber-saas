import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Mail, BadgeCheck } from "lucide-react";
import type { UserItem } from "@/lib/users";
import { BarberRow } from "./BarberRow";

type BarberTableProps = {
  barbers: UserItem[];
};

export function BarberTable({ barbers }: BarberTableProps) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold">
              <span className="flex items-center gap-2">
                <User size={14} className="text-muted-foreground" />
                Nome
              </span>
            </TableHead>

            <TableHead className="font-semibold">
              <span className="flex items-center gap-2">
                <Mail size={14} className="text-muted-foreground" />
                E-mail
              </span>
            </TableHead>

            <TableHead className="font-semibold">
              <span className="flex items-center gap-2">
                <BadgeCheck size={14} className="text-muted-foreground" />
                Status
              </span>
            </TableHead>

            <TableHead className="text-right font-semibold">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {barbers.length > 0 ? (
            barbers.map((barber) => (
              <BarberRow key={barber.id} barber={barber} />
            ))
          ) : (
            <TableRow>
              <td
                colSpan={4}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhum barbeiro cadastrado
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}