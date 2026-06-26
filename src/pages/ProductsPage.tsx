import React, { useState, useMemo } from "react";
import { fetchProducts } from "../api/apiService";
import { CategoryRepository } from "../models";
import type { Category as CategoryType } from "../models";
import { useFetch } from "../hooks/useFetch";
import { useSearch } from "../hooks/useSearch";
import ProductCard from "../components/common/ProductCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ALL_CATEGORY: CategoryType = { id: "All", label: "All", icon: "◈", color: "#818cf8" };

const ProductsPage: React.FC = () => {
  const { data: products, loading, error } = useFetch(fetchProducts);
  const { query, setQuery, filtered }       = useSearch(products ?? []);
  const [activeCategoryId, setActiveCategory] = useState<string>("All");

  const categories = useMemo<CategoryType[]>(() => {
    if (!products) return [ALL_CATEGORY];
    const usedIds = [...new Set(products.map((p) => p.categoryId))];
    return [ALL_CATEGORY, ...usedIds.map((id) => CategoryRepository.find(id))];
  }, [products]);

  const displayed = useMemo(() =>
    activeCategoryId === "All"
      ? filtered
      : filtered.filter((p) => p.categoryId === activeCategoryId),
    [filtered, activeCategoryId],
  );

  return (
    <div className="p-7 pb-16">
      {/* Page header */}
      <div className="mb-7">
        <h1 className="font-display text-2xl font-bold text-slate-200 tracking-tight">Products</h1>
        <p className="text-muted text-sm mt-1">
          {products ? `${products.length} items in catalog` : "Loading catalog…"}
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3 items-center mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-base pointer-events-none select-none">⌕</span>
          <input
            type="search"
            placeholder="Search by name, brand, SKU…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-xl text-slate-200 text-sm outline-none focus:border-accent transition-colors placeholder:text-subtle"
          />
        </div>

        {/* Category chips — Category model: icon, color */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const active = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all"
                style={{
                  borderColor: active ? cat.color : "",
                  background:  active ? `${cat.color}22` : "",
                  color:       active ? cat.color : "",
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
        <p className="text-center py-12 text-red-400">⚠ {error}</p>
      )}

      {!loading && !error && (
        <p className="text-[13px] text-muted mb-4">
          {displayed.length} result{displayed.length !== 1 ? "s" : ""}
          {query && ` for "${query}"`}
        </p>
      )}

      {!loading && !error && (
        <div className="flex flex-col gap-2">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && !error && displayed.length === 0 && (
        <div className="text-center py-20 text-muted">
          <div className="text-5xl mb-3">◯</div>
          <p className="text-base font-semibold text-slate-300 mb-1">No products found</p>
          <p className="text-sm">Try a different search term or category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
