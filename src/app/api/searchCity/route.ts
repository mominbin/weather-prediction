import { fetchCity } from "@/app/utils/weather.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");
  if (!city) {
    return NextResponse.redirect("/404");
  }
  const data = await fetchCity(city);
  return NextResponse.json(data, { status: 200 });
}
