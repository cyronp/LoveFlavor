import { Suspense } from "react";
import Header from "@/components/header";
import MobileNav from "@/components/mobile-nav";
import AuthProvider from "@/components/auth-provider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      }
    >
      <AuthProvider>
        <Header />
        {children}
        <MobileNav />
      </AuthProvider>
    </Suspense>
  );
}
