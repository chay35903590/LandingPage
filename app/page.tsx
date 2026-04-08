import { getRequestContext } from "@cloudflare/next-on-pages";
import { defaultContent, type SiteContent } from "@/types/content";
import FloatingContact from "@/components/FloatingContact";
import HeroSection from "@/components/HeroSection";
import ProductGallery from "@/components/ProductGallery";
import FeaturesSection from "@/components/FeaturesSection";
import PriceSection from "@/components/PriceSection";

export const runtime = "edge";
// Force SSR on every request — never statically cached
export const dynamic = "force-dynamic";

async function getContent(): Promise<SiteContent> {
  try {
    const { env } = getRequestContext();
    const kv = (env as unknown as { CONTENT_KV: KVNamespace }).CONTENT_KV;
    // cacheTtl: 60 = minimum KV edge cache (60s is Cloudflare's floor)
    const raw = await kv.get("site_content", { cacheTtl: 60 });
    return raw ? JSON.parse(raw) : defaultContent;
  } catch {
    return defaultContent;
  }
}

export default async function HomePage() {
  const content = await getContent();

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <HeroSection content={content} />
      <ProductGallery content={content} />
      <FeaturesSection content={content} />
      <PriceSection content={content} />
      <FloatingContact content={content} />
    </main>
  );
}
