import { getRequestContext } from "@cloudflare/next-on-pages";
import { defaultContent, type SiteContent } from "@/types/content";
import AdminForm from "./AdminForm";

export const runtime = "edge";
// Admin must always show the latest content — no caching
export const dynamic = "force-dynamic";

async function getContent(): Promise<SiteContent> {
  try {
    const { env } = getRequestContext();
    const kv = (env as unknown as { CONTENT_KV: KVNamespace }).CONTENT_KV;
    const raw = await kv.get("site_content", { cacheTtl: 60 });
    return raw ? JSON.parse(raw) : defaultContent;
  } catch {
    return defaultContent;
  }
}

export default async function AdminPage() {
  const content = await getContent();
  return <AdminForm initialContent={content} />;
}
