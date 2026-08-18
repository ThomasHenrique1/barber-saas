import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { User, Mail } from "lucide-react";
import type { UserItem } from "@/lib/users";
import { EditBarberDialog } from "./EditBarberDialog";
import { ToggleBarberButton } from "./ToggleBarberButton";
import { DeleteBarberButton } from "./DeleteBarberButton";

type BarberRowProps = {
  barber: UserItem;
};

export function BarberRow({ barber }: BarberRowProps) {
  return (
    <TableRow className="group hover:bg-muted/30 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User size={16} />
          </div>
          <div>
            <p className="font-medium">{barber.name}</p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail size={14} />
          <span>{barber.email}</span>
        </div>
      </TableCell>

      <TableCell>
        <Badge
          variant={barber.active ? "default" : "secondary"}
          className={barber.active ? "bg-emerald-500 hover:bg-emerald-600" : ""}
        >
          {barber.active ? "Ativo" : "Inativo"}
        </Badge>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <EditBarberDialog barber={barber} />
          <ToggleBarberButton barber={barber} />
          <DeleteBarberButton barber={barber} />
        </div>
      </TableCell>
    </TableRow>
  );
}