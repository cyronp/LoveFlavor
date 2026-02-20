import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function GET(){
  try{
    const supabase = createAdminClient();

    const { data: restaurant, error} = await supabase
    .from('top_restaurants')
    .select('*')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: restaurant });

  }catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}