"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import FirstLoginModal from "./first-login-modal";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [showFirstLogin, setShowFirstLogin] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        const firstLogin = searchParams.get("firstLogin");
        if (firstLogin === "true" && session.user) {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("first_login_completed")
            .eq("id", session.user.id)
            .single();

          if (profile && !profile.first_login_completed) {
            setShowFirstLogin(true);
          }
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, searchParams, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <>
      {children}
      <FirstLoginModal
        isOpen={showFirstLogin}
        onComplete={() => {
          setShowFirstLogin(false);
          router.replace("/");
        }}
      />
    </>
  );
}
