import type { SiteContent } from "@/types/content";

export default function PriceSection({ content }: { content: SiteContent }) {
  const saving = parseInt(content.originalPrice) - parseInt(content.price);
  const percent = Math.round((1 - parseInt(content.price) / parseInt(content.originalPrice)) * 100);

  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-orange-100">
          {/* Price */}
          <p className="text-gray-500 text-xs sm:text-sm mb-1">ราคาปกติ</p>
          <p className="text-gray-400 line-through text-lg sm:text-xl mb-1">
            ฿{parseInt(content.originalPrice).toLocaleString()}
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mb-3">ราคาพิเศษวันนี้</p>
          <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-orange-500 mb-2 animate-pulse-slow leading-none">
            ฿{parseInt(content.price).toLocaleString()}
          </div>
          <p className="text-green-600 font-semibold text-sm sm:text-base mb-6 sm:mb-8">
            ประหยัด ฿{saving.toLocaleString()} ({percent}% OFF)
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            {/* On tablet+: LINE and Facebook side by side if both exist */}
            <div className={`flex gap-3 ${content.lineUrl && content.facebookUrl ? "flex-col sm:flex-row" : "flex-col"}`}>
              {content.lineUrl && (
                <a
                  href={content.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-4 sm:px-6 rounded-2xl text-base sm:text-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 min-h-[56px]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  <span className="truncate">สั่งซื้อผ่าน LINE</span>
                </a>
              )}
              {content.facebookUrl && (
                <a
                  href={content.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-4 sm:px-6 rounded-2xl text-base sm:text-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 min-h-[56px]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="truncate">สั่งซื้อผ่าน Facebook</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          * ราคานี้เป็นราคาพิเศษ มีจำนวนจำกัด
        </p>
      </div>
    </section>
  );
}
