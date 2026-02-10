"use client";

import * as React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function Header() {
  return (
    <div>
      <div className="bg-none flex justify-center items-center gap-12 p-2 sticky top-0 z-50">
        <h1 className="font-bold text-xl">Love Flavor</h1>
        <div className="relative w-64">
          <Input type="search" placeholder="Buscar" className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <Button className="rounded-full">Adicionar novo local</Button>
      </div>
      <div className="bg-none flex justify-center items-center gap-12 p-2 sticky top-auto z-50">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Restaurantes</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-96 p-2">
                  <ListItem
                    href="/restaurantes/melhores-notas"
                    title="Melhores Notas"
                  >
                    Restaurantes com as melhores avaliações
                  </ListItem>
                  <ListItem
                    href="/restaurantes/mais-visitados"
                    title="Mais Visitados"
                  >
                    Restaurantes mais visitados por nós
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Cafés</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-96 p-2">
                  <ListItem href="/cafes/melhores-notas" title="Melhores Notas">
                    Cafés com as melhores avaliações
                  </ListItem>
                  <ListItem href="/cafes/mais-visitados" title="Mais Visitados">
                    Cafés mais populares da comunidade
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Outros</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-96 p-2">
                  <ListItem
                    href="/outros/melhores-notas"
                    title="Melhores Notas"
                  >
                    Outros locais com as melhores avaliações
                  </ListItem>
                  <ListItem
                    href="/outros/mais-visitados"
                    title="Mais Visitados"
                  >
                    Outros locais mais populares da comunidade
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
