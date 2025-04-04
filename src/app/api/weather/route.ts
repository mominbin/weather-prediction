import { fetchWeatherByAPIKey } from "@/app/utils/weather.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cityID = searchParams.get("cityID");
  if (!cityID) {
    return NextResponse.redirect("/404");
  }
  const data = await fetchWeatherByAPIKey(cityID);
  return NextResponse.json(data, { status: 200 });
}
