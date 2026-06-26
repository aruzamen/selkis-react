import React from "react";
import { ProductStatus } from "../../models";

interface BadgeProps {
  label: string;
  size?: "sm" | "md";
}

const Badge: React.FC<BadgeProps> = ({ label, size = "sm" }) => {
  const { color, bg, dotColor } = ProductStatus.meta(label);
  const padding = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-[13px]";
  const dot     = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide whitespace-nowrap ${padding}`}
      style={{ background: bg, color }}
    >
      <span className={`${dot} rounded-full shrink-0`} style={{ background: dotColor }} />
      {label}
    </span>
  );
};

export default Badge;
