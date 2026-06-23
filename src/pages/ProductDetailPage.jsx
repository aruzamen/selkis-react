import React, { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api/apiService";
import { useFetch } from "../hooks/useFetch";
import Badge from "../components/common/Badge";
import RatingStars from "../components/common/RatingStars";
import LoadingSpinner from "../components/common/LoadingSpinner";

const InfoTile = ({ label, value, accent }) => (
  <div
    style={{
      background: "var(--clr-surface-2)", border: "1px solid var(--clr-border)",
      borderRadius: "var(--radius-md)", padding: "14px 16px",
    }}
  >
    <div style={{ fontSize: "11px", color: "var(--clr-muted)", fontWeight: 500, marginBottom: "4px", letterSpacing: ".4px", textTransform: "uppercase" }}>
      {label}
    </div>
    <div style={{ fontSize: "16px", fontWeight: 700, color: accent || "var(--clr-text)" }}>
      {value}
    </div>
  </div>
);

const ProductDetailPage = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const fetcher    = useCallback(() => fetchProductById(id), [id]);
  const { data: product, loading, error } = useFetch(fetcher, [id]);

  if (loading) return <LoadingSpinner message="Loading product…" />;
  if (error)   return <div style={{ padding: "48px", textAlign: "center", color: "var(--clr-danger)" }}>⚠ {error}</div>;
  if (!product) return null;

  return (
    <div style={{ padding: "28px 28px 64px", maxWidth: "900px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "var(--clr-muted)", fontSize: "14px", marginBottom: "24px",
          padding: "6px 12px", borderRadius: "var(--radius-sm)",
          background: "transparent", border: "1px solid var(--clr-border)",
          transition: "all var(--transition)", cursor: "pointer",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--clr-surface)"; e.currentTarget.style.color = "var(--clr-text)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--clr-muted)"; }}
      >
        ← Back to Products
      </button>

      {/* Hero */}
      <div
        style={{
          background: "var(--clr-surface)", border: "1px solid var(--clr-border)",
          borderRadius: "var(--radius-xl)", padding: "32px", marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Product.thumbnail */}
          <div
            style={{
              width: "120px", height: "120px",
              borderRadius: "var(--radius-lg)",
              background: "var(--clr-surface-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "60px", flexShrink: 0,
              border: `2px solid ${product.category.color}44`,
            }}
          >
            {product.thumbnail}
          </div>

          <div style={{ flex: 1, minWidth: "220px" }}>
            {/* Category model: icon + label + color */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "11px", fontWeight: 700, letterSpacing: ".7px",
                  textTransform: "uppercase", color: product.category.color,
                }}
              >
                {product.category.icon} {product.category.label}
              </span>
              {/* Badge uses ProductStatus.meta via the status string */}
              <Badge label={product.status} size="md" />
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.3px", marginBottom: "10px" }}>
              {product.name}
            </h1>

            <p style={{ fontSize: "13px", color: "var(--clr-muted)", marginBottom: "12px" }}>
              by <strong style={{ color: "var(--clr-text)" }}>{product.brand}</strong>
              &nbsp;·&nbsp; SKU: <code style={{ color: "var(--clr-accent-2)" }}>{product.sku}</code>
            </p>

            {/* Product.reviewCount instead of raw .reviews */}
            <RatingStars rating={product.rating} reviews={product.reviewCount} />

            {/* Product.formattedPrice — Intl.NumberFormat from model */}
            <div style={{ marginTop: "20px", fontSize: "32px", fontWeight: 800, fontFamily: "var(--font-display)", letterSpacing: "-1px" }}>
              {product.formattedPrice}
            </div>
          </div>
        </div>
      </div>

      {/* Stats — Product.isAvailable for stock color */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px", marginBottom: "20px" }}>
        <InfoTile label="Stock"    value={product.stock === 0 ? "—" : product.stock} accent={product.isAvailable ? "var(--clr-success)" : "var(--clr-danger)"} />
        <InfoTile label="Rating"   value={`${product.rating}/5`} accent="#f59e0b" />
        <InfoTile label="Reviews"  value={product.reviewCount.toLocaleString()} />
        <InfoTile label="Category" value={`${product.category.icon} ${product.category.label}`} />
      </div>

      {/* Description */}
      <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-lg)", padding: "24px", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "10px" }}>Description</h2>
        <p style={{ fontSize: "14px", color: "var(--clr-muted)", lineHeight: 1.7 }}>{product.description}</p>
      </div>

      {/* Features */}
      <div style={{ background: "var(--clr-surface)", border: "1px solid var(--clr-border)", borderRadius: "var(--radius-lg)", padding: "24px", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "14px" }}>Features</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {product.features.map((feat, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
              <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--clr-accent-soft)", color: "var(--clr-accent-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", flexShrink: 0, fontWeight: 700 }}>
                ✓
              </span>
              {feat}
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {product.tags.map((tag) => (
          <span key={tag} style={{ padding: "4px 12px", background: "var(--clr-surface-2)", border: "1px solid var(--clr-border)", borderRadius: "99px", fontSize: "12px", color: "var(--clr-muted)" }}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
