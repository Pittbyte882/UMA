import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("availability")
      .select("*")
      .order("day_of_week")

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { availability } = await req.json()

    for (const day of availability) {
      const { data: existing } = await supabase
        .from("availability")
        .select("id")
        .eq("day_of_week", day.day_of_week)
        .single()

      if (existing) {
        await supabase
          .from("availability")
          .update({
            start_time: day.start_time,
            end_time: day.end_time,
            is_active: day.is_active,
          })
          .eq("id", existing.id)
      } else {
        await supabase.from("availability").insert([{
          day_of_week: day.day_of_week,
          start_time: day.start_time,
          end_time: day.end_time,
          is_active: day.is_active,
        }])
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update availability" }, { status: 500 })
  }
}