import type { SiteContent } from "@/types/content";

export default function ProductGallery({ content }: { content: SiteContent }) {
  const images = content.productImages?.filter(Boolean) ?? [];
  if (images.length === 0) return null;

  const gridClass =
    images.length === 1
      ? ""
      : images.length === 2
      ? "grid grid-cols-2 gap-3 sm:gap-4"
      : images.length === 3
      ? "grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
      : "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4";

  return (
    <section className="py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          รูปสินค้า
        </h2>

        {images.length === 1 ? (
          <div className="rounded-2xl overflow-hidden shadow-md max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[0]} alt="สินค้า" className="w-full object-cover" />
          </div>
        ) : (
          <div className={gridClass}>
            {images.map((src, i) => (
              <div
                key={i}
                className={`rounded-xl sm:rounded-2xl overflow-hidden shadow-md ${
                  images.length === 3 && i === 0 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`สินค้า ${i + 1}`}
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
