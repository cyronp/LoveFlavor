"use client";

import {
  Search,
  Plus,
  SearchIcon,
  ArrowLeft,
  Menu,
  Heart,
  Star,
  LogOut,
  X,
  ChevronDown,
  Utensils,
  Coffee,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
}

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Restaurantes",
    icon: <Utensils className="h-5 w-5" />,
    items: [
      {
        href: "/restaurantes",
        label: "Ver todos",
        icon: <Utensils className="h-4 w-4" />,
        description: "Explorar todos os restaurantes",
      },
      {
        href: "/top-restaurants",
        label: "Melhores Avaliados",
        icon: <Star className="h-4 w-4" />,
        description: "Restaurantes com as melhores avaliações",
      },
      {
        href: "/restaurantes/mais-visitados",
        label: "Mais Visitados",
        icon: <MapPin className="h-4 w-4" />,
        description: "Restaurantes mais visitados por nós",
      },
    ],
  },
  {
    title: "Cafés",
    icon: <Coffee className="h-5 w-5" />,
    items: [
      {
        href: "/cafes",
        label: "Ver todos",
        icon: <Coffee className="h-4 w-4" />,
        description: "Explorar todos os cafés",
      },
      {
        href: "/top-cafes",
        label: "Melhores Avaliados",
        icon: <Star className="h-4 w-4" />,
        description: "Cafés com as melhores avaliações",
      },
      {
        href: "/cafes/mais-visitados",
        label: "Mais Visitados",
        icon: <MapPin className="h-4 w-4" />,
        description: "Cafés mais visitados por nós",
      },
    ],
  },
  {
    title: "Outros",
    icon: <MoreHorizontal className="h-5 w-5" />,
    items: [
      {
        href: "/outros",
        label: "Ver todos",
        icon: <MoreHorizontal className="h-4 w-4" />,
        description: "Explorar todos os outros locais",
      },
      {
        href: "/top-outros",
        label: "Melhores Avaliados",
        icon: <Star className="h-4 w-4" />,
        description: "Outros locais com as melhores avaliações",
      },
      {
        href: "/outros/mais-visitados",
        label: "Mais Visitados",
        icon: <MapPin className="h-4 w-4" />,
        description: "Outros locais mais visitados por nós",
      },
    ],
  },
];

const quickLinks: NavItem[] = [
  {
    href: "/wishlist",
    label: "Lista de Desejos",
    icon: <Heart className="h-5 w-5" />,
    description: "Lugares que quero visitar",
  },
  {
    href: "/add-location",
    label: "Adicionar Local",
    icon: <Plus className="h-5 w-5" />,
    description: "Adicionar novo restaurante",
  },
];

function SidebarNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors group"
    >
      <div className="text-gray-600 group-hover:text-gray-900">{item.icon}</div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{item.label}</span>
        {item.description && (
          <span className="text-xs text-gray-500">{item.description}</span>
        )}
      </div>
    </Link>
  );
}

function CollapsibleSection({
  section,
  onClose,
}: {
  section: NavSection;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="text-gray-600 group-hover:text-gray-900">
            {section.icon}
          </div>
          <span className="text-sm font-medium text-gray-900">
            {section.title}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="ml-4 pl-4 border-l border-gray-200 space-y-1">
          {section.items.map((item) => (
            <SidebarNavItem key={item.href} item={item} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MobileNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pesquisando por:", searchQuery);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setSidebarOpen(false);
    router.push("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Menu button no canto superior esquerdo */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-3 left-3 z-50 md:hidden p-2 rounded-full hover:bg-gray-100/50 transition-all"
        aria-label="Abrir menu"
      >
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Overlay de pesquisa */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSearchOpen(false)}
        />
      )}

      {/* Input de pesquisa */}
      {searchOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 p-2 md:hidden bg-white h-full">
          <div className="border-b border-black p-2">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 bg-white"
            >
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <Input
                type="text"
                placeholder="Pesquisar restaurantes, cafés..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="rounded-none p-1"
              />
              <SearchIcon className="h-6 w-6" />
            </form>
          </div>
        </div>
      )}

      {/* Sidebar Drawer */}
      <Drawer direction="left" open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <DrawerContent className="h-full w-70 sm:max-w-70">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-bold">
                Taste n' Speak
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto py-4 px-2">
            {/* Collapsible Sections */}
            <div className="space-y-1">
              {navSections.map((section) => (
                <CollapsibleSection
                  key={section.title}
                  section={section}
                  onClose={closeSidebar}
                />
              ))}
            </div>

            <Separator className="my-3" />

            {/* Quick Links */}
            <div className="space-y-1">
              {quickLinks.map((item) => (
                <SidebarNavItem
                  key={item.href}
                  item={item}
                  onClose={closeSidebar}
                />
              ))}
            </div>
          </div>

          <DrawerFooter className="border-t">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Sair da conta
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Navegação inferior */}
      <nav className="fixed bottom-4 left-4 right-4 border border-gray-200/50 bg-white md:hidden z-30 rounded-full shadow-lg">
        <div className="flex justify-around items-center h-16 px-2">
          {/* Pesquisar */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-100/50 rounded-full transition-all"
          >
            <Search size={24} className="text-gray-700" />
            <span className="text-xs text-gray-600 mt-1">Pesquisar</span>
          </button>

          {/* Lista de Desejos */}
          <Link
            href="/wishlist"
            className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-100/50 rounded-full transition-all"
          >
            <Heart size={24} className="text-gray-700" />
            <span className="text-xs text-gray-600 mt-1">Desejos</span>
          </Link>

          {/* Adicionar */}
          <Link
            href="/add-location"
            className="flex flex-col items-center justify-center flex-1 h-full hover:bg-gray-100/50 rounded-full transition-all"
          >
            <Plus size={24} className="text-gray-700" />
            <span className="text-xs text-gray-600 mt-1">Adicionar</span>
          </Link>
        </div>
      </nav>

      {/* Espaçamento para evitar que o conteúdo fique por baixo da navegação */}
      <div className="h-20 md:hidden" />
    </>
  );
}
