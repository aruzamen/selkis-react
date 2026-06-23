import React, { useState, useMemo } from "react";
import { fetchProducts } from "../api/apiService";
import { Category } from "../models";
import { useFetch } from "../hooks/useFetch";
import { useSearch } from "../hooks/useSearch";
import ProductCard from "../components/common/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ProductsPage = () => {
  const { data: products, loading, error } = useFetch(fetchProducts);
  // No keys needed — useSearch will use Product.searchableText
  const { query, setQuery, filtered } = useSearch(products ?? []);
  const [activeCategoryId, setActiveCategoryId] = useState("All");

  // Build category list from the Category model registry + "All"
  const categories = useMemo(() => {
    if (!products) return [];
    const usedIds = [...new Set(products.map((p) => p.categoryId))];
    return [
      { id: "All", label: "All", icon: "◈", color: "var(--clr-accent-2)" },
      ...usedIds.map((id) => Category.find(id)),
    ];
  }, [products]);

  const displayed = useMemo(() => {
    if (activeCategoryId === "All") return filtered;
    return filtered.filter((p) => p.categoryId === activeCategoryId);
  }, [filtered, activeCategoryId]);

  return (
    <div style={{ padding: "28px 28px 48px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px" }}>
          Products
        </h1>
        <p style={{ color: "var(--clr-muted)", fontSize: "14px", marginTop: "4px" }}>
          {products ? `${products.length} items in catalog` : "Loading catalog…"}
        </p>
      </div>

      {/* Search + category chips */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1", minWidth: "200px", maxWidth: "380px" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--clr-muted)", fontSize: "16px", pointerEvents: "none" }}>
            ⌕
          </span>
          <input
            type="search"
            placeholder="Search by name, brand, SKU…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px 10px 38px",
              background: "var(--clr-surface)", border: "1px solid var(--clr-border)",
              borderRadius: "var(--radius-md)", color: "var(--clr-text)", fontSize: "14px", outline: "none",
              transition: "border-color var(--transition)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--clr-accent)")}
            onBlur={(e)  => (e.target.style.borderColor = "var(--clr-border)")}
          />
        </div>

        {/* Category chips — use Category model for icon + color */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {categories.map((cat) => {
            const active = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                style={{
                  padding: "7px 14px", borderRadius: "99px", fontSize: "13px", fontWeight: 500,
                  border: `1px solid ${active ? cat.color : "var(--clr-border)"}`,
                  background: active ? `${cat.color}22` : "transparent",
                  color: active ? cat.color : "var(--clr-muted)",
                  cursor: "pointer", transition: "all var(--transition)",
                  display: "flex", alignItems: "center", gap: "5px",
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading && <LoadingSpinner message="Fetching products…" />}

      {error && (
        <div style={{ textAlign: "center", padding: "48px", color: "var(--clr-danger)" }}>
          ⚠ {error}
        </div>
      )}

      {!loading && !error && (
        <p style={{ fontSize: "13px", color: "var(--clr-muted)", marginBottom: "16px" }}>
          {displayed.length} result{displayed.length !== 1 ? "s" : ""}
          {query && ` for "${query}"`}
        </p>
      )}

      {!loading && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && !error && displayed.length === 0 && (
        <div style={{ textAlign: "center", padding: "64px 24px", color: "var(--clr-muted)" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>◯</div>
          <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>No products found</p>
          <p style={{ fontSize: "14px" }}>Try a different search term or category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
