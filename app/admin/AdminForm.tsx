"use client";

import { useState } from "react";
import type { SiteContent } from "@/types/content";
import ImageUpload from "@/components/ImageUpload";

export default function AdminForm({ initialContent }: { initialContent: SiteContent }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>({
    ...initialContent,
    productImages: initialContent.productImages ?? [],
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [features, setFeatures] = useState(initialContent.features.join("\n"));

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password.trim() === "") return;
    setAuthed(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          content: {
            ...content,
            features: features.split("\n").filter((f) => f.trim() !== ""),
          },
        }),
      });
      const data = await res.json() as { error?: string };
      if (res.ok) {
        setMsg({ type: "success", text: "บันทึกสำเร็จ! ข้อมูลอัปเดตแล้ว" });
      } else {
        setMsg({ type: "error", text: data.error ?? "เกิดข้อผิดพลาด" });
        if (res.status === 401) setAuthed(false);
      }
    } catch {
      setMsg({ type: "error", text: "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่" });
    } finally {
      setSaving(false);
    }
  }

  function setProductImage(index: number, value: string) {
    const updated = [...content.productImages];
    updated[index] = value;
    setContent({ ...content, productImages: updated });
  }

  function removeProductImage(index: number) {
    const updated = content.productImages.filter((_, i) => i !== index);
    setContent({ ...content, productImages: updated });
  }

  function addProductImageSlot() {
    if (content.productImages.length >= 4) return;
    setContent({ ...content, productImages: [...content.productImages, ""] });
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    );
  }

  const field = (
    label: string,
    key: keyof SiteContent,
    type: "text" | "textarea" | "url" | "tel" = "text"
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          value={content[key] as string}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          rows={3}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        />
      ) : (
        <input
          type={type}
          value={content[key] as string}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <a href="/" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            ดูหน้าเว็บ →
          </a>
        </div>

        {msg && (
          <div
            className={`mb-4 p-4 rounded-xl text-sm font-medium ${
              msg.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Shop Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-gray-700 text-lg">ข้อมูลร้าน</h2>
            {field("ชื่อร้าน", "shopName")}
            {field("สโลแกน", "tagline")}
            {field("ข้อความโปรโมชั่น", "promoText")}
          </div>

          {/* Hero Image */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-700 text-lg mb-4">รูปแบนเนอร์หลัก</h2>
            <ImageUpload
              label="รูปหัวเว็บ (แนะนำขนาด 1200×400)"
              value={content.heroImageUrl}
              onChange={(base64) => setContent({ ...content, heroImageUrl: base64 })}
              onRemove={() => setContent({ ...content, heroImageUrl: "" })}
              aspectRatio="hero"
            />
          </div>

          {/* Product */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-gray-700 text-lg">สินค้า</h2>
            {field("ชื่อสินค้า", "productName")}
            {field("รายละเอียดสินค้า", "productDescription", "textarea")}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ราคาขาย (฿)</label>
                <input
                  type="number"
                  value={content.price}
                  onChange={(e) => setContent({ ...content, price: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ราคาปกติ (฿)</label>
                <input
                  type="number"
                  value={content.originalPrice}
                  onChange={(e) => setContent({ ...content, originalPrice: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-700 text-lg">
                รูปสินค้า
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({content.productImages.filter(Boolean).length}/4)
                </span>
              </h2>
              {content.productImages.length < 4 && (
                <button
                  type="button"
                  onClick={addProductImageSlot}
                  className="flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มรูป
                </button>
              )}
            </div>

            {content.productImages.length === 0 ? (
              <button
                type="button"
                onClick={addProductImageSlot}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:border-orange-400 hover:text-orange-400 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm">เพิ่มรูปสินค้า</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {content.productImages.map((img, i) => (
                  <ImageUpload
                    key={i}
                    label={`รูปที่ ${i + 1}`}
                    value={img}
                    onChange={(base64) => setProductImage(i, base64)}
                    onRemove={() => removeProductImage(i)}
                    aspectRatio="square"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-700 text-lg mb-3">จุดเด่น (1 บรรทัด = 1 ข้อ)</h2>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 font-mono text-sm resize-none"
              placeholder={"คุณภาพสูง ทนทาน\nราคาถูกกว่าคู่แข่ง\nส่งฟรีทั่วประเทศ"}
            />
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
            <h2 className="font-semibold text-gray-700 text-lg">ช่องทางติดต่อ</h2>
            {field("LINE URL", "lineUrl", "url")}
            {field("Facebook URL", "facebookUrl", "url")}
            {field("เบอร์โทรศัพท์", "phoneNumber", "tel")}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-colors shadow-md"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </button>
        </form>
      </div>
    </div>
  );
}
