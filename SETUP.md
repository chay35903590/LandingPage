# Cloudflare Landing Page — Setup Guide

## วิธี Deploy บน Cloudflare Pages

### 1. สร้าง KV Namespace

```bash
npx wrangler kv namespace create CONTENT_KV
```

Copy `id` ที่ได้มาใส่ใน `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "CONTENT_KV"
id = "PASTE_YOUR_ID_HERE"
```

### 2. ตั้งค่า wrangler.toml

เปิดไฟล์ `wrangler.toml` และแก้ไข:
- `id` = KV namespace ID จากขั้นตอนที่ 1
- `ADMIN_PASSWORD` = รหัสผ่านที่ต้องการ (อย่าใช้ค่า default)

### 3. Deploy

```bash
npm run deploy
```

หรือแบบ manual:

```bash
npm run pages:build
npx wrangler pages deploy
```

---

## วิธีรัน Local (Development)

```bash
# รัน dev server ปกติ (ไม่มี KV จะใช้ default content)
npm run dev

# รัน preview แบบ Cloudflare จริง (ต้องมี KV namespace ก่อน)
npm run preview
```

---

## การใช้ Admin Page

1. เปิด `https://your-domain.pages.dev/admin`
2. ใส่รหัสผ่านที่ตั้งไว้ใน `ADMIN_PASSWORD`
3. แก้ไขข้อมูลร้าน ราคา จุดเด่น ช่องทางติดต่อ
4. กด "บันทึกการเปลี่ยนแปลง"
5. หน้าเว็บหลักจะอัปเดตทันที (ทุกคนเห็นพร้อมกัน)

---

## โครงสร้างไฟล์

```
app/
  page.tsx          — หน้า landing page หลัก (Edge Runtime)
  layout.tsx        — layout + SEO metadata
  admin/
    page.tsx        — admin page (Edge Runtime)
    AdminForm.tsx   — admin UI form (Client Component)
  api/
    content/route.ts       — GET เนื้อหาจาก KV
    admin/update/route.ts  — POST อัปเดตเนื้อหาใน KV

components/
  HeroSection.tsx      — ส่วนหัว + ปุ่มสั่งซื้อ
  FeaturesSection.tsx  — จุดเด่นของสินค้า
  PriceSection.tsx     — แสดงราคา + ปุ่มซื้อ
  FloatingContact.tsx  — ปุ่มลอยด้านล่างขวา

types/
  content.ts  — TypeScript types + default content
  env.d.ts    — Cloudflare KV environment types

wrangler.toml   — Cloudflare config (แก้ KV ID ก่อน deploy)
.dev.vars       — local secrets (ไม่ commit ขึ้น git)
```
