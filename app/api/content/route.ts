import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { defaultContent, type SiteContent } from "@/types/content";

export const runtime = "edge";

export async function GET() {
  try {
    const { env } = getRequestContext();
    const kv = (env as unknown as { CONTENT_KV: KVNamespace }).CONTENT_KV;
    const raw = await kv.get("site_content");
    const content: SiteContent = raw ? JSON.parse(raw) : defaultContent;
    return NextResponse.json(content);
  } catch {
    // Fallback for local dev without KV
    return NextResponse.json(defaultContent);
  }
}
