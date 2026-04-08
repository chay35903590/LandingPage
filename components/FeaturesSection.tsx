import type { SiteContent } from "@/types/content";

export default function FeaturesSection({ content }: { content: SiteContent }) {
  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
          ทำไมต้องเลือกเรา?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {content.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-orange-50 border border-orange-100"
            >
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-orange-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
