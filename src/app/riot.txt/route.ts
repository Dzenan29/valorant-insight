import { NextResponse } from "next/server";
// Public, Riot-issued verification string for this product URL.
export function GET() {
  return new NextResponse("19889437-689c-463d-bbc1-80e5e4a232eb", {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
