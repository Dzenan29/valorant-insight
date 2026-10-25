import { NextResponse } from "next/server";
// Public, Riot-issued verification string for this product URL.
export function GET() {
  return new NextResponse("8103dba6-ae48-4cac-b40f-ca7b7950a0d9", {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
