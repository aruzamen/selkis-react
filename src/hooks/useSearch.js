import { useState, useMemo } from "react";

/**
 * Generic search hook.
 * Works with plain objects or model instances — uses product.searchableText
 * if available (Product model optimization), otherwise falls back to key lookup.
 *
 * @param {Object[]} items
 * @param {string[]} keys  - Fallback field names if no searchableText
 */
export const useSearch = (items = [], keys = []) => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter((item) => {
      // Use pre-computed searchableText from Product model if present
      if (typeof item.searchableText === "string") {
        return item.searchableText.includes(lower);
      }
      return keys.some((key) => String(item[key] ?? "").toLowerCase().includes(lower));
    });
  }, [items, query, keys]);

  return { query, setQuery, filtered };
};
