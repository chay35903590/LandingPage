import type { SiteContent } from "@/types/content";

export default function HeroSection({ content }: { content: SiteContent }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 text-white">
      {/* Hero Image */}
      {content.heroImageUrl && (
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.heroImageUrl}
            alt={content.shopName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        </div>
      )}

      {/* Decorative circles — hidden on small screens to reduce clutter */}
      <div className="hidden sm:block absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-48 h-48 lg:w-72 lg:h-72 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Content */}
      <div className="relative py-10 px-4 sm:py-14 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Promo badge */}
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm sm:text-base font-medium mb-4 animate-fade-in-up">
            {content.promoText}
          </div>

          {/* Shop name */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight animate-fade-in-up-delay-1">
            {content.shopName}
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-xl md:text-2xl text-orange-100 mb-6 animate-fade-in-up-delay-2 max-w-xl mx-auto">
            {content.tagline}
          </p>

          {/* Product info */}
          <div className="animate-fade-in-up-delay-3 mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">{content.productName}</h2>
            <p className="text-orange-100 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              {content.productDescription}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up-delay-3">
            {content.lineUrl && (
              <a
                href={content.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 min-h-[52px]"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                สั่งซื้อผ่าน LINE
              </a>
            )}
            {content.phoneNumber && (
              <a
                href={`tel:${content.phoneNumber}`}
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-bold py-4 px-8 rounded-full text-base sm:text-lg transition-all duration-200 border-2 border-white/40 hover:-translate-y-0.5 min-h-[52px]"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                โทรเลย
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
