import { NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.restaurant_id) {
      return NextResponse.json(
        { error: 'restaurant_id é obrigatório' },
        { status: 400 }
      );
    }

    if (!body.rating) {
      return NextResponse.json(
        { error: 'rating é obrigatório' },
        { status: 400 }
      );
    }

    const restaurantId = parseInt(body.restaurant_id, 10);
    if (isNaN(restaurantId)) {
      return NextResponse.json(
        { error: 'restaurant_id deve ser um número válido' },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();
    const { data, error } = await adminSupabase
      .from('review')
      .insert({
        restaurant_id: restaurantId,
        opinion: body.opinion,
        rating: body.rating,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar review' },
      { status: 500 }
    );
  }
}
