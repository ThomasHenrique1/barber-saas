import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Scissors, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ServiceItem } from "@/src/actions/services/get-services";
import { ServiceRow } from "./ServiceRow";

type ServiceTableProps = {
  services: ServiceItem[];
  onAdd?: () => void;
};

export function ServiceTable({ services, onAdd }: ServiceTableProps) {
  return (
    <Card className="overflow-hidden border-border/70 shadow-sm">
      {/* Header com título e ação */}
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Scissors size={18} />
          </div>
          <CardTitle className="text-lg font-semibold">Serviços</CardTitle>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {services.length}
          </span>
        </div>

        {onAdd && (
          <Button size="sm" className="gap-1.5" onClick={onAdd}>
            <Plus size={15} />
            <span>Novo serviço</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40 border-b">
              <TableHead className="pl-6 font-semibold">
                <span className="flex items-center gap-2">
                  Serviço
                </span>
              </TableHead>

              <TableHead className="font-semibold">Valor</TableHead>

              <TableHead className="font-semibold">Duração</TableHead>

              <TableHead className="font-semibold">Status</TableHead>

              <TableHead className="pr-6 text-right font-semibold">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceRow key={service.id} service={service} />
              ))
            ) : (
              <TableRow>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/50">
                      <Scissors size={28} className="text-muted-foreground/50" />
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">
                        Nenhum serviço cadastrado
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground/70">
                        Comece adicionando seu primeiro serviço
                      </p>
                    </div>
                    {onAdd && (
                      <Button variant="outline" size="sm" className="mt-2 gap-1.5" onClick={onAdd}>
                        <Plus size={14} />
                        Adicionar serviço
                      </Button>
                    )}
                  </div>
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}