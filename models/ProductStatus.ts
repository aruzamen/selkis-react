// ─── ProductStatus Model ──────────────────────────────────────────────────────

export type ProductStatusValue = "In Stock" | "Low Stock" | "Out of Stock";

export interface StatusMeta {
  label: ProductStatusValue;
  color: string;
  bg: string;
  dotColor: string;
}

export const PRODUCT_STATUS: Record<string, ProductStatusValue> = {
  IN_STOCK:     "In Stock",
  LOW_STOCK:    "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
} as const;

const STATUS_META: Record<ProductStatusValue, StatusMeta> = {
  "In Stock":     { label: "In Stock",     color: "#10b981", bg: "rgba(16,185,129,.15)",  dotColor: "#10b981" },
  "Low Stock":    { label: "Low Stock",    color: "#f59e0b", bg: "rgba(245,158,11,.15)",  dotColor: "#f59e0b" },
  "Out of Stock": { label: "Out of Stock", color: "#ef4444", bg: "rgba(239,68,68,.15)",   dotColor: "#ef4444" },
};

const FALLBACK_META: StatusMeta = {
  label: "In Stock", color: "#8892a4", bg: "rgba(136,146,164,.15)", dotColor: "#8892a4",
};

export const ProductStatus = {
  meta: (status: string): StatusMeta =>
    STATUS_META[status as ProductStatusValue] ?? FALLBACK_META,

  fromStock: (stock: number): ProductStatusValue => {
    if (stock === 0)  return "Out of Stock";
    if (stock  < 50)  return "Low Stock";
    return "In Stock";
  },
};
