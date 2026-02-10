import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="bg-none flex justify-center items-center gap-12 p-2 sticky top-0 z-50">
      <h1 className="font-bold text-xl">Love Flavor</h1>
      <div className="relative w-64">
        <Input type="search" placeholder="Buscar" className="pl-10" />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
      <Button>Adicionar</Button>
    </div>
  );
}
