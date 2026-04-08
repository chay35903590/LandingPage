import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { type SiteContent } from "@/types/content";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { env } = getRequestContext();
    const cfEnv = env as unknown as { CONTENT_KV: KVNamespace; ADMIN_PASSWORD: string };

    const body = await request.json();
    const { password, content } = body as { password: string; content: SiteContent };

    const adminPassword = cfEnv.ADMIN_PASSWORD || "admin1234";
    if (password !== adminPassword) {
      return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    await cfEnv.CONTENT_KV.put("site_content", JSON.stringify(content));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด กรุณาลองใหม่" }, { status: 500 });
  }
}
