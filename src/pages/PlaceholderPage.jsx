import React from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/dashboard":  { icon: "▦", label: "Dashboard" },
  "/categories": { icon: "◉", label: "Categories" },
  "/analytics":  { icon: "◎", label: "Analytics" },
  "/orders":     { icon: "◐", label: "Orders" },
  "/settings":   { icon: "◯", label: "Settings" },
};

const PlaceholderPage = () => {
  const { pathname } = useLocation();
  const { icon, label } = titles[pathname] ?? { icon: "◈", label: "Page" };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "400px",
        gap: "16px",
        color: "var(--clr-muted)",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "52px",
          width: "88px",
          height: "88px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--clr-surface)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--clr-border)",
        }}
      >
        {icon}
      </div>
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: 700,
            color: "var(--clr-text)",
            marginBottom: "6px",
          }}
        >
          {label}
        </h2>
        <p style={{ fontSize: "14px" }}>This section is coming soon.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
