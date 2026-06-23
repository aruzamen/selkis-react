import React from "react";
import { useNavigate } from "react-router-dom";
import Badge from "./Badge";
import RatingStars from "./RatingStars";

// ProductCard receives a Product model — accesses only computed properties

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/products/${product.id}`)}
      style={{
        background: "var(--clr-surface)",
        border: "1px solid var(--clr-border)",
        borderRadius: "var(--radius-lg)",
        padding: "20px",
        cursor: "pointer",
        transition: "all var(--transition)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = product.category.color;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${product.category.color}26`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--clr-border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail from Product.thumbnail */}
      <div
        style={{
          fontSize: "42px",
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--clr-surface-2)",
          borderRadius: "var(--radius-md)",
        }}
      >
        {product.thumbnail}
      </div>

      {/* Category (from Category model) + status */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: ".6px",
            textTransform: "uppercase",
            color: product.category.color,
          }}
        >
          {product.category.icon} {product.category.label}
        </span>
        <Badge label={product.status} />
      </div>

      {/* Name */}
      <h3 style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.35 }}>
        {product.name}
      </h3>

      {/* Rating */}
      <RatingStars rating={product.rating} reviews={product.reviewCount} />

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "8px",
          borderTop: "1px solid var(--clr-border)",
          marginTop: "auto",
        }}
      >
        {/* formattedPrice from Product model */}
        <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-display)" }}>
          {product.formattedPrice}
        </span>
        <span style={{ fontSize: "11px", color: "var(--clr-subtle)" }}>{product.sku}</span>
      </div>
    </article>
  );
};

export default ProductCard;
