import { useState, useMemo } from "react";

interface SearchState<T> {
  query:    string;
  setQuery: (q: string) => void;
  filtered: T[];
}

// T is intentionally unconstrained here; we guard with runtime checks below
export const useSearch = <T>(items: T[], keys: string[] = []): SearchState<T> => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter((item) => {
      const anyItem = item as Record<string, unknown>;
      // Prefer pre-computed searchableText from Product model
      if (typeof anyItem["searchableText"] === "string") {
        return (anyItem["searchableText"] as string).includes(lower);
      }
      return keys.some((key) => String(anyItem[key] ?? "").toLowerCase().includes(lower));
    });
  }, [items, query, keys]);

  return { query, setQuery, filtered };
};
