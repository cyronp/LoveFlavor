"use client";

import * as React from "react";
import { Input } from "./ui/input";
import { Search, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";

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
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/top-restaurants">Top Restaurantes</Link>
              </NavigationMenuLink>
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
