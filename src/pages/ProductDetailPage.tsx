import React, { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/apiService";
import { useFetch } from "../hooks/useFetch";
import Badge from "../components/common/Badge";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface InfoTileProps {
  label: string;
  value: string | number;
  color?: string;
}

const InfoTile: React.FC<InfoTileProps> = ({ label, value, color }) => (
  <div className="bg-surface2 border border-border rounded-xl p-4">
    <p className="text-[11px] text-muted font-medium uppercase tracking-wide mb-1">{label}</p>
    <p className="text-base font-bold" style={{ color: color ?? "" }}>{value}</p>
  </div>
);

const ProductDetailPage: React.FC = () => {
  const { id }    = useParams<{ id: string }>();
  const navigate  = useNavigate();
  const fetcher   = useCallback(() => fetchProductById(id!), [id]);
  const { data: product, loading, error } = useFetch(fetcher, [id]);

  if (loading) return <LoadingSpinner message="Loading product…" />;
  if (error)   return <p className="p-12 text-center text-red-400">⚠ {error}</p>;
  if (!product) return null;

  return (
    <div className="p-7 pb-16 max-w-4xl">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-muted text-sm mb-6 px-3 py-1.5 rounded-lg border border-border hover:bg-surface hover:text-slate-200 transition-all"
      >
        ← Back to Products
      </button>

      {/* Hero card */}
      <div className="bg-surface border border-border rounded-3xl p-8 mb-5">
        <div className="flex flex-wrap gap-7 items-start">
          {/* Thumbnail */}
          <div
            className="w-28 h-28 rounded-2xl bg-surface2 flex items-center justify-center text-6xl shrink-0"
            style={{ border: `2px solid ${product.category.color}44` }}
          >
            {product.thumbnail}
          </div>

          <div className="flex-1 min-w-[220px]">
            {/* Category + status */}
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span
                className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"
                style={{ color: product.category.color }}
              >
                <span>{product.category.icon}</span>
                {product.category.label}
              </span>
              <Badge label={product.status} size="md" />
            </div>

            <h1 className="font-display text-[22px] font-bold leading-snug tracking-tight text-slate-200 mb-2.5">
              {product.name}
            </h1>

            <p className="text-[13px] text-muted mb-3">
              by <strong className="text-slate-200">{product.brand}</strong>
              {" · "}
              SKU: <code className="text-accent2">{product.sku}</code>
            </p>

            {/* formattedPrice from Product model */}
            <p className="mt-5 font-display text-[32px] font-extrabold tracking-tight text-slate-200">
              {product.formattedPrice}
            </p>
          </div>
        </div>
      </div>

      {/* Stats — isAvailable from Product model */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 mb-5">
        <InfoTile label="Stock"    value={product.stock === 0 ? "—" : product.stock} color={product.isAvailable ? "#10b981" : "#ef4444"} />
        <InfoTile label="Rating"   value={`${product.rating}/5`} color="#f59e0b" />
        <InfoTile label="Reviews"  value={product.reviewCount.toLocaleString()} />
        <InfoTile label="Category" value={`${product.category.icon} ${product.category.label}`} />
      </div>

      {/* Description */}
      <div className="bg-surface border border-border rounded-2xl p-6 mb-4">
        <h2 className="text-[15px] font-bold text-slate-200 mb-2.5">Description</h2>
        <p className="text-sm text-muted leading-relaxed">{product.description}</p>
      </div>

      {/* Features */}
      <div className="bg-surface border border-border rounded-2xl p-6 mb-4">
        <h2 className="text-[15px] font-bold text-slate-200 mb-4">Features</h2>
        <ul className="flex flex-col gap-2">
          {product.features.map((feat, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-slate-200">
              <span className="w-5 h-5 rounded-full bg-accent/15 text-accent2 flex items-center justify-center text-[11px] font-bold shrink-0">
                ✓
              </span>
              {feat}
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-surface2 border border-border rounded-full text-xs text-muted">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
