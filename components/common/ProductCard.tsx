"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { Product } from "../../models/Product";
import Badge from "./Badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/products/${product.id}`)}
      className="card-hover bg-surface border border-border rounded-2xl p-4 flex items-center gap-5 cursor-pointer"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = product.category.color;
        (e.currentTarget as HTMLElement).style.boxShadow  = `0 4px 20px ${product.category.color}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "";
        (e.currentTarget as HTMLElement).style.boxShadow  = "";
      }}
    >
      {/* Thumbnail */}
      <div className="text-3xl w-12 h-12 flex items-center justify-center bg-surface2 rounded-xl shrink-0">
        {product.thumbnail}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[11px] font-bold tracking-wider uppercase"
            style={{ color: product.category.color }}
          >
            {product.category.icon} {product.category.label}
          </span>
        </div>
        <h3 className="text-[15px] font-semibold text-slate-200 truncate leading-snug">
          {product.name}
        </h3>
        <p className="text-[12px] text-muted mt-0.5">{product.brand} · {product.sku}</p>
      </div>

      {/* Right: price + status */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="text-lg font-bold font-display text-slate-200">
          {product.formattedPrice}
        </span>
        <Badge label={product.status} />
      </div>
    </article>
  );
};

export default ProductCard;
