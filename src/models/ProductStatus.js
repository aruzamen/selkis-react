// ─── ProductStatus Model ──────────────────────────────────────────────────────

export const PRODUCT_STATUS = {
  IN_STOCK:     "In Stock",
  LOW_STOCK:    "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};

/**
 * @typedef {Object} StatusMeta
 * @property {string} label
 * @property {string} color
 * @property {string} bg
 */

const STATUS_META = {
  [PRODUCT_STATUS.IN_STOCK]:     { label: "In Stock",     color: "#10b981", bg: "rgba(16,185,129,.15)" },
  [PRODUCT_STATUS.LOW_STOCK]:    { label: "Low Stock",    color: "#f59e0b", bg: "rgba(245,158,11,.15)"  },
  [PRODUCT_STATUS.OUT_OF_STOCK]: { label: "Out of Stock", color: "#ef4444", bg: "rgba(239,68,68,.15)"  },
};

const FALLBACK_META = { label: "Unknown", color: "#8892a4", bg: "rgba(136,146,164,.15)" };

/**
 * @param {string} status
 * @returns {StatusMeta}
 */
export const ProductStatus = {
  meta: (status) => STATUS_META[status] ?? FALLBACK_META,

  /**
   * Derive status automatically from a stock count.
   * @param {number} stock
   * @returns {string}
   */
  fromStock: (stock) => {
    if (stock === 0)  return PRODUCT_STATUS.OUT_OF_STOCK;
    if (stock < 50)   return PRODUCT_STATUS.LOW_STOCK;
    return PRODUCT_STATUS.IN_STOCK;
  },
};
