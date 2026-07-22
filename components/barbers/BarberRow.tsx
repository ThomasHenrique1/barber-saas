import { Badge } from "@/components/ui/badge";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import type { UserItem } from "@/lib/users";

import { EditBarberDialog } from "./EditBarberDialog";
import { ToggleBarberButton } from "./ToggleBarberButton";
import { DeleteBarberButton } from "./DeleteBarberButton";

type BarberRowProps = {
  barber: UserItem;
};

export function BarberRow({
  barber,
}: BarberRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {barber.name}
      </TableCell>

      <TableCell>
        {barber.email}
      </TableCell>

      <TableCell>
        <Badge
          variant={
            barber.active
              ? "default"
              : "secondary"
          }
        >
          {barber.active
            ? "Ativo"
            : "Inativo"}
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <EditBarberDialog
            barber={barber}
          />

          <ToggleBarberButton
            barber={barber}
          />

          <DeleteBarberButton
            barber={barber}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}