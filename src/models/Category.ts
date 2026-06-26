// ─── Category Model ───────────────────────────────────────────────────────────

export type CategoryId =
  | "Electronics"
  | "Furniture"
  | "Kitchen"
  | "Accessories"
  | "Wearables"
  | string;

/** The Category data shape. */
export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
}

const CATEGORY_REGISTRY: Record<string, Category> = {
  Electronics: { id: "Electronics", label: "Electronics", icon: "⚡", color: "#6366f1" },
  Furniture:   { id: "Furniture",   label: "Furniture",   icon: "🪑", color: "#f59e0b" },
  Kitchen:     { id: "Kitchen",     label: "Kitchen",     icon: "🍳", color: "#10b981" },
  Accessories: { id: "Accessories", label: "Accessories", icon: "👜", color: "#ec4899" },
  Wearables:   { id: "Wearables",   label: "Wearables",   icon: "⌚", color: "#0ea5e9" },
};

const FALLBACK: Omit<Category, "id" | "label"> = { icon: "◈", color: "#8892a4" };

/** Repository for looking up Category records. */
export const CategoryRepository = {
  find: (id: string): Category =>
    CATEGORY_REGISTRY[id] ?? { ...FALLBACK, id, label: id },
  all: (): Category[] => Object.values(CATEGORY_REGISTRY),
};
