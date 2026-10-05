import { NextResponse } from "next/server";
import { openapiDocument } from "@/lib/openapi";

export function GET() {
  return NextResponse.json(openapiDocument, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
