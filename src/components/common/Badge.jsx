import React from "react";
import { ProductStatus } from "../../models";

// Badge now delegates all color logic to the ProductStatus model

const Badge = ({ label, size = "sm" }) => {
  const { color, bg } = ProductStatus.meta(label);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: size === "sm" ? "2px 8px" : "4px 12px",
        borderRadius: "99px",
        background: bg,
        color,
        fontSize: size === "sm" ? "11px" : "13px",
        fontWeight: 600,
        letterSpacing: ".3px",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: size === "sm" ? 5 : 6,
          height: size === "sm" ? 5 : 6,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
};

export default Badge;
