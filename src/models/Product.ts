import { CategoryRepository, type Category as CategoryType } from "./Category";
import { ProductStatus, type StatusMeta } from "./ProductStatus";

// ─── Product Model ────────────────────────────────────────────────────────────

/** Raw API payload shape. */
export interface ProductRaw {
  id: number;
  name: string;
  category: string;
  price: number | string;
  stock: number;
  rating: number;
  reviews: number;
  sku: string;
  brand: string;
  description: string;
  features: string[];
  images: string[];
  tags: string[];
  status?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/** Fully typed Product model with computed properties. */
export interface Product {
  id: number;
  name: string;
  categoryId: string;
  price: number;
  stock: number;
  rating: number;
  reviewCount: number;
  sku: string;
  brand: string;
  description: string;
  features: string[];
  images: string[];
  tags: string[];
  // computed
  readonly status: string;
  readonly statusMeta: StatusMeta;
  readonly category: CategoryType;
  readonly formattedPrice: string;
  readonly isAvailable: boolean;
  readonly thumbnail: string;
  readonly searchableText: string;
}

const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const createProduct = (raw: ProductRaw): Product => ({
  id:          raw.id,
  name:        raw.name ?? "",
  categoryId:  raw.category ?? "",
  price:       Number(raw.price ?? 0),
  stock:       Number(raw.stock ?? 0),
  rating:      Number(raw.rating ?? 0),
  reviewCount: Number(raw.reviews ?? 0),
  sku:         raw.sku ?? "",
  brand:       raw.brand ?? "",
  description: raw.description ?? "",
  features:    Array.isArray(raw.features) ? raw.features : [],
  images:      Array.isArray(raw.images)   ? raw.images   : [],
  tags:        Array.isArray(raw.tags)     ? raw.tags     : [],

  get status()         { return raw.status ?? ProductStatus.fromStock(this.stock); },
  get statusMeta()     { return ProductStatus.meta(this.status); },
  get category()       { return CategoryRepository.find(this.categoryId); },
  get formattedPrice() { return priceFormatter.format(this.price); },
  get isAvailable()    { return this.stock > 0; },
  get thumbnail()      { return this.images[0] ?? "📦"; },
  get searchableText() {
    return [this.name, this.brand, this.sku, this.categoryId, ...this.tags]
      .join(" ").toLowerCase();
  },
});

export const validateProduct = (raw: Partial<ProductRaw>): ValidationResult => {
  const errors: string[] = [];
  if (!raw.id)   errors.push("Missing id");
  if (!raw.name) errors.push("Missing name");
  if (raw.price == null || isNaN(Number(raw.price))) errors.push("Invalid price");
  return { valid: errors.length === 0, errors };
};
