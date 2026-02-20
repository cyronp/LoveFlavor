"use client";

import * as React from "react";
import { Input } from "./ui/input";
import { Search, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
      <div className="flex justify-center items-center gap-6 p-2">
        <Link href="/">
          <h1 className="font-bold text-3xl md:text-xl">Taste n' Speak</h1>
        </Link>
        <div className="md:flex relative w-64 hidden">
          <Input
            type="search"
            placeholder="Buscar"
            className="pl-10 rounded-full border-neutral-700"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <Button className="md:flex rounded-full cursor-pointer hidden">
          <Link href="/add-location">Adicionar novo local</Link>
        </Button>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="icon"
          className="md:flex rounded-full hidden"
          title="Sair"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
      <div className="hidden md:flex justify-center items-center p-1 w-full overflow-x-auto">
        <NavigationMenu className="w-full max-w-full" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-sm md:text-base">
                Restaurantes
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[calc(100vw-2rem)] md:w-96 p-2">
                  <ListItem href="/restaurantes" title="Ver todos">
                    Explorar todos os restaurantes
                  </ListItem>
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
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-sm md:text-base">
                Cafés
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[calc(100vw-2rem)] md:w-96 p-2">
                  <ListItem href="/cafes" title="Ver todos">
                    Explorar todos os cafés
                  </ListItem>
                  <ListItem href="/cafes/melhores-notas" title="Melhores Notas">
                    Cafés com as melhores avaliações
                  </ListItem>
                  <ListItem href="/cafes/mais-visitados" title="Mais Visitados">
                    Cafés mais visitados por nós
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-sm md:text-base">
                Outros
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[calc(100vw-2rem)] md:w-96 p-2">
                  <ListItem href="/outros" title="Ver todos">
                    Explorar todos os locais
                  </ListItem>
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
                    Outros locais mais visitados por nós
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/wishlist">Lista de Desejos</Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
