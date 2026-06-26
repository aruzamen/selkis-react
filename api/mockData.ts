import { ROLE_IDS } from "../models/Role";
import type { UserRaw } from "../models/User";
import type { ProductRaw } from "../models/Product";

// ─── Mock Database ────────────────────────────────────────────────────────────
// These represent raw JSON payloads exactly as a real REST API would return.
// Model factories are applied in apiService.ts.

export interface UserRecord extends UserRaw {
  password: string;
}

export const USERS_DB: UserRecord[] = [
  { id: 1, name: "Alexandra Reyes", email: "admin@selkis.com", password: "admin123", roleId: ROLE_IDS.PRODUCT_MANAGER, avatarColor: "#6366f1" },
  { id: 2, name: "Marcus Chen",     email: "buyer@selkis.com", password: "buyer123", roleId: ROLE_IDS.SENIOR_BUYER,    avatarColor: "#0ea5e9" },
];

export const PRODUCTS_DB: ProductRaw[] = [
  {
    id: 1, name: "Wireless Noise-Cancelling Headphones", category: "Electronics",
    price: 349.99, stock: 142, rating: 4.8, reviews: 2341, sku: "ELEC-WH-001", brand: "SoundCore",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res Audio certification. Perfect for travel, work, and immersive listening sessions.",
    features: ["ANC with 3 adjustable levels", "30h battery / 5h quick charge", "Hi-Res Audio certified", "Multipoint Bluetooth 5.3", "Built-in voice assistant"],
    images: ["🎧"], tags: ["wireless", "audio", "premium"],
  },
  {
    id: 2, name: "Ergonomic Mesh Office Chair", category: "Furniture",
    price: 489.00, stock: 38, rating: 4.6, reviews: 876, sku: "FURN-CH-002", brand: "PostureElite",
    description: "Fully adjustable ergonomic chair with lumbar support, breathable mesh back, and 4D armrests. Designed for long work sessions with posture-forward engineering.",
    features: ["4D adjustable armrests", "Lumbar & headrest support", "Seat depth adjustment", "Tilt tension control", "5-year warranty"],
    images: ["🪑"], tags: ["office", "ergonomic", "furniture"],
  },
  {
    id: 3, name: "Cold Brew Coffee Maker", category: "Kitchen",
    price: 79.95, stock: 215, rating: 4.9, reviews: 5102, sku: "KTCH-CB-003", brand: "BrewCraft",
    description: "Make smooth, rich cold brew concentrate at home in 12–24 hours. Features a fine-mesh stainless steel filter and a 1.5L borosilicate glass carafe.",
    features: ["1.5L borosilicate glass", "Fine-mesh stainless filter", "Airtight silicone seal", "Dishwasher safe", "BPA-free"],
    images: ["☕"], tags: ["coffee", "kitchen", "home"],
  },
  {
    id: 4, name: 'Ultrawide 34" Curved Monitor', category: "Electronics",
    price: 799.00, stock: 0, rating: 4.7, reviews: 1243, sku: "ELEC-MN-004", brand: "ViewMax",
    description: "34-inch ultrawide QHD curved monitor with 144Hz refresh rate, 1ms response time, and USB-C 90W power delivery. The ultimate setup for creative professionals and gamers.",
    features: ["3440×1440 QHD resolution", "144Hz refresh rate", "USB-C 90W PD", "AMD FreeSync Premium", "Picture-by-picture mode"],
    images: ["🖥️"], tags: ["monitor", "ultrawide", "gaming"],
  },
  {
    id: 5, name: "Minimalist Leather Wallet", category: "Accessories",
    price: 59.99, stock: 503, rating: 4.5, reviews: 3218, sku: "ACC-WL-005", brand: "SlimCarry",
    description: "Full-grain vegetable-tanned leather bifold wallet. Holds up to 8 cards and cash with RFID blocking. Gets better with age.",
    features: ["Full-grain leather", "RFID blocking layer", "8 card slots", "Coin pocket", "Slim 8mm profile"],
    images: ["👜"], tags: ["leather", "accessories", "wallet"],
  },
  {
    id: 6, name: "Smart Fitness Tracker Band", category: "Wearables",
    price: 129.95, stock: 78, rating: 4.4, reviews: 4567, sku: "WEAR-FT-006", brand: "FitPulse",
    description: "Advanced health tracker with heart rate monitoring, SpO2, sleep tracking, and GPS. Water-resistant to 50m with a 14-day battery life.",
    features: ["24/7 heart rate + SpO2", "Built-in GPS", "Sleep stage tracking", "50m water resistance", "14-day battery"],
    images: ["⌚"], tags: ["fitness", "wearable", "health"],
  },
  {
    id: 7, name: "Portable Mechanical Keyboard", category: "Electronics",
    price: 169.00, stock: 91, rating: 4.7, reviews: 2089, sku: "ELEC-KB-007", brand: "KeyForge",
    description: "Compact 65% mechanical keyboard with hot-swappable switches, per-key RGB, and tri-mode connectivity (USB-C, Bluetooth 5.0, 2.4GHz dongle).",
    features: ["Hot-swappable switches", "Per-key RGB backlight", "Tri-mode wireless", "Aluminum top case", "3000mAh battery"],
    images: ["⌨️"], tags: ["keyboard", "mechanical", "portable"],
  },
  {
    id: 8, name: "Bamboo Standing Desk", category: "Furniture",
    price: 649.00, stock: 24, rating: 4.8, reviews: 712, sku: "FURN-SD-008", brand: "RiseWork",
    description: "Electric height-adjustable bamboo desk with memory presets, anti-collision sensor, and a whisper-quiet dual motor.",
    features: ['24"–50" height range', "4 memory presets", "Anti-collision sensor", "Dual quiet motors", "Sustainable bamboo top"],
    images: ["🪴"], tags: ["desk", "standing", "sustainable"],
  },
];
