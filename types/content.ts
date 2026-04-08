export interface SiteContent {
  shopName: string;
  tagline: string;
  productName: string;
  productDescription: string;
  price: string;
  originalPrice: string;
  lineUrl: string;
  facebookUrl: string;
  phoneNumber: string;
  heroImageUrl: string;
  productImages: string[];
  features: string[];
  promoText: string;
}

export const defaultContent: SiteContent = {
  shopName: "ร้านของเรา",
  tagline: "สินค้าคุณภาพดี ราคาถูก ส่งไวทั่วประเทศ",
  productName: "สินค้าพิเศษ",
  productDescription: "สินค้าคุณภาพสูง ผ่านการรับรอง ใช้ได้จริง พอใจ 100%",
  price: "299",
  originalPrice: "599",
  lineUrl: "https://line.me/ti/p/~yourlineid",
  facebookUrl: "https://facebook.com/yourpage",
  phoneNumber: "0812345678",
  heroImageUrl: "",
  productImages: [],
  features: [
    "คุณภาพสูง ทนทาน",
    "ราคาถูกกว่าคู่แข่ง",
    "ส่งฟรีทั่วประเทศ",
    "รับประกัน 1 ปี",
  ],
  promoText: "โปรโมชั่นพิเศษ! ลดทันที 50% วันนี้เท่านั้น",
};
