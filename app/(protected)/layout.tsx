import Header from "@/components/header";
import MobileNav from "@/components/mobile-nav";
import AuthProvider from "@/components/auth-provider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header />
      {children}
      <MobileNav />
    </AuthProvider>
  );
}
