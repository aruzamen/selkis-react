import React from "react";
import Avatar from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";

// Header reads from User model: user.fullName, user.displayRole, user.accentColor, user.initials

const Header = ({ onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: "var(--header-h)",
        background: "var(--clr-surface)",
        borderBottom: "1px solid var(--clr-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onMenuToggle}
          className="menu-toggle"
          aria-label="Toggle menu"
          style={{
            display: "none",
            width: "36px", height: "36px",
            borderRadius: "var(--radius-sm)",
            background: "var(--clr-surface-2)",
            border: "1px solid var(--clr-border)",
            color: "var(--clr-text)",
            alignItems: "center", justifyContent: "center",
            fontSize: "18px",
          }}
        >
          ☰
        </button>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px", fontWeight: 700,
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          Katalog
        </span>
      </div>

      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ textAlign: "right" }}>
            {/* User model: fullName */}
            <div style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.2 }}>
              {user.fullName}
            </div>
            {/* User model: displayRole (delegates to Role.label) */}
            <div style={{ fontSize: "12px", color: "var(--clr-muted)" }}>
              {user.displayRole}
            </div>
          </div>
          {/* User model: initials, accentColor */}
          <Avatar initials={user.initials} color={user.accentColor} size={38} />
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .menu-toggle { display: flex !important; } }
      `}</style>
    </header>
  );
};

export default Header;
