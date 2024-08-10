import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { ArrowRight, X, Search } from "lucide-react";
import { OrderDetails } from "./order-details";

export const OrderTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} size={"xs"}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium] font-mono text-xs">Px00001</TableCell>
      <TableCell>há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Fabricio Liquesley</TableCell>
      <TableCell className="font-medium">R$ 89,72</TableCell>
      <TableCell>
        <Button variant={"outline"} size={"xs"}>
          <ArrowRight className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={"ghost"} size={"xs"}>
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
};
