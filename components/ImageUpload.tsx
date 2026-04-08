"use client";

import { useRef } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (base64: string) => void;
  onRemove: () => void;
  aspectRatio?: "hero" | "square";
}

export default function ImageUpload({ label, value, onChange, onRemove, aspectRatio = "square" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const containerClass = aspectRatio === "hero"
    ? "w-full h-40"
    : "w-full aspect-square";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {value ? (
        <div className={`relative ${containerClass} rounded-xl overflow-hidden bg-gray-100 group`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="w-full h-full object-cover"
          />
          {/* Show buttons always on touch, hover only on pointer devices */}
          <div className="absolute inset-0 bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-800 font-medium text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-100 transition-colors min-h-[40px]"
            >
              เปลี่ยนรูป
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="bg-red-500 text-white font-medium text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg hover:bg-red-600 transition-colors min-h-[40px]"
            >
              ลบ
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${containerClass} border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors`}
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-500">คลิกหรือลากรูปมาวาง</p>
          <p className="text-xs text-gray-400">JPG, PNG, WEBP</p>
        </div>
      )}
    </div>
  );
}
