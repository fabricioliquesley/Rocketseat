import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const AccountMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="flex select-none items-center gap-2"
        >
          Pizza Shop
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Fabricio Liquesley</span>
          <span className="text-xs font-normal text-muted-foreground">
            fabricio.test@email.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="space-x-2">
          <Building className="h-4 w-4" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2 text-red-600 dark:text-red-500">
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
