import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q");

  if (!search) {
    return NextResponse.json([]);
  }

  // Leads
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .or(
      `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
    )
    .limit(5);

  // Properties
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .or(
      `name.ilike.%${search}%,location.ilike.%${search}%`
    )
    .limit(5);

  // Followups
  const { data: followups } = await supabase
    .from("followups")
    .select("*")
    .ilike("followup_message", `%${search}%`)
    .limit(5);

  // Site Visits
  const { data: siteVisits } = await supabase
    .from("site_visits")
    .select("*")
    .ilike("property_name", `%${search}%`)
    .limit(5);

  return NextResponse.json({
    leads,
    properties,
    followups,
    siteVisits,
  });
}