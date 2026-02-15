import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    try {
      const cookieStore = await cookies();
      const supabase = await createClient(cookieStore);
      
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Erro ao trocar código por sessão:', error);
        return NextResponse.redirect(`${origin}/login?error=auth_failed`);
      }

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("first_login_completed")
          .eq("id", data.user.id)
          .single();

        if (!profileError && profile && !profile.first_login_completed) {
          return NextResponse.redirect(`${origin}/?firstLogin=true`);
        }
      }
      
      return NextResponse.redirect(`${origin}`);
    } catch (error) {
      console.error('Erro no callback de autenticação:', error);
      return NextResponse.redirect(`${origin}/login?error=callback_failed`);
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}