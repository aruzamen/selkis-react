// ─── Category Model ───────────────────────────────────────────────────────────

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} label
 * @property {string} icon
 * @property {string} color
 */

const CATEGORY_REGISTRY = {
  Electronics: { id: "Electronics", label: "Electronics", icon: "⚡", color: "#6366f1" },
  Furniture:   { id: "Furniture",   label: "Furniture",   icon: "🪑", color: "#f59e0b" },
  Kitchen:     { id: "Kitchen",     label: "Kitchen",     icon: "🍳", color: "#10b981" },
  Accessories: { id: "Accessories", label: "Accessories", icon: "👜", color: "#ec4899" },
  Wearables:   { id: "Wearables",   label: "Wearables",   icon: "⌚", color: "#0ea5e9" },
};

const FALLBACK_CATEGORY = { id: "Other", label: "Other", icon: "◈", color: "#8892a4" };

/**
 * @param {string} id
 * @returns {Category}
 */
export const Category = {
  find: (id) => CATEGORY_REGISTRY[id] ?? { ...FALLBACK_CATEGORY, id, label: id },
  all: () => Object.values(CATEGORY_REGISTRY),
};
