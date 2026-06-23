import { Category } from "./Category";
import { ProductStatus } from "./ProductStatus";

// ─── Product Model ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Product
 * @property {number}   id
 * @property {string}   name
 * @property {string}   categoryId
 * @property {number}   price
 * @property {number}   stock
 * @property {number}   rating
 * @property {number}   reviewCount
 * @property {string}   sku
 * @property {string}   brand
 * @property {string}   description
 * @property {string[]} features
 * @property {string[]} images
 * @property {string[]} tags
 * // Computed:
 * @property {string}   status
 * @property {Category} category
 * @property {string}   formattedPrice
 * @property {boolean}  isAvailable
 */

/**
 * Creates a Product model from a raw API payload.
 * @param {Object} raw
 * @returns {Product}
 */
export const createProduct = (raw) => {
  const product = {
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
    images:      Array.isArray(raw.images) ? raw.images : [],
    tags:        Array.isArray(raw.tags) ? raw.tags : [],

    // ── Computed ────────────────────────────────
    get status() {
      // Respect an explicit status from the API; otherwise derive from stock
      return raw.status ?? ProductStatus.fromStock(this.stock);
    },
    get statusMeta() {
      return ProductStatus.meta(this.status);
    },
    get category() {
      return Category.find(this.categoryId);
    },
    get formattedPrice() {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(this.price);
    },
    get isAvailable() {
      return this.stock > 0;
    },
    get thumbnail() {
      return this.images[0] ?? "📦";
    },
    get searchableText() {
      return [this.name, this.brand, this.sku, this.categoryId, ...this.tags]
        .join(" ")
        .toLowerCase();
    },
  };

  return product;
};

/**
 * Validate that a raw object has the minimum required fields for a Product.
 * @param {Object} raw
 * @returns {{ valid: boolean, errors: string[] }}
 */
export const validateProduct = (raw) => {
  const errors = [];
  if (!raw.id)   errors.push("Missing id");
  if (!raw.name) errors.push("Missing name");
  if (raw.price == null || isNaN(Number(raw.price))) errors.push("Invalid price");
  return { valid: errors.length === 0, errors };
};
