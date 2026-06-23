import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../models";
import Avatar from "../common/Avatar";

// Nav items declare which permission gates them (null = always visible)
const NAV_ITEMS = [
  { icon: "▦", label: "Dashboard",   path: "/dashboard",  permission: null },
  { icon: "◈", label: "Products",    path: "/products",   permission: "products:read" },
  { icon: "◉", label: "Categories",  path: "/categories", permission: "products:read" },
  { icon: "◎", label: "Analytics",   path: "/analytics",  permission: "analytics:read" },
  { icon: "◐", label: "Orders",      path: "/orders",     permission: "orders:read" },
  { icon: "◯", label: "Settings",    path: "/settings",   permission: "settings:read" },
];

const Sidebar = ({ open, onClose }) => {
  const navigate          = useNavigate();
  const location          = useLocation();
  const { user, logout }  = useAuth();

  // Filter nav based on the User's Role permissions
  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.permission || hasPermission(user?.role, item.permission)
  );

  const handleNav = (path) => { navigate(path); onClose?.(); };
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="sidebar-overlay"
          style={{
            display: "none",
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,.6)",
            zIndex: 149,
          }}
        />
      )}

      <aside
        className={`sidebar ${open ? "sidebar--open" : ""}`}
        style={{
          width: "var(--sidebar-w)",
          background: "var(--clr-surface)",
          borderRight: "1px solid var(--clr-border)",
          display: "flex", flexDirection: "column",
          height: "100%", overflow: "hidden", flexShrink: 0,
        }}
      >
        {/* User card — User model: fullName, displayRole, initials, accentColor */}
        {user && (
          <div
            style={{
              padding: "20px 16px",
              borderBottom: "1px solid var(--clr-border)",
              display: "flex", alignItems: "center", gap: "12px",
            }}
          >
            <Avatar initials={user.initials} color={user.accentColor} size={42} />
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.fullName}
              </div>
              {/* Role badge */}
              <div
                style={{
                  display: "inline-flex", alignItems: "center",
                  gap: "4px", marginTop: "4px",
                  padding: "1px 8px", borderRadius: "99px",
                  background: `${user.role.color}22`,
                  color: user.role.color,
                  fontSize: "11px", fontWeight: 600,
                }}
              >
                {user.displayRole}
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            padding: "16px 20px 8px",
            fontSize: "10px", fontWeight: 700,
            letterSpacing: "1.2px", color: "var(--clr-subtle)",
            textTransform: "uppercase",
          }}
        >
          Navigation
        </div>

        <nav style={{ flex: 1, padding: "4px 10px", overflowY: "auto" }}>
          {visibleItems.map(({ icon, label, path }) => {
            const active = location.pathname.startsWith(path);
            return (
              <button
                key={path}
                onClick={() => handleNav(path)}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "10px 12px", borderRadius: "var(--radius-md)",
                  marginBottom: "2px",
                  color: active ? "#fff" : "var(--clr-muted)",
                  background: active
                    ? "linear-gradient(135deg, var(--clr-accent), #818cf8)"
                    : "transparent",
                  fontSize: "14px", fontWeight: active ? 600 : 400,
                  transition: "all var(--transition)",
                  textAlign: "left", cursor: "pointer",
                  boxShadow: active ? "0 4px 12px rgba(99,102,241,.35)" : "none",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--clr-surface-2)"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "18px", lineHeight: 1 }}>{icon}</span>
                {label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "12px 10px", borderTop: "1px solid var(--clr-border)" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "12px",
              padding: "10px 12px", borderRadius: "var(--radius-md)",
              color: "var(--clr-danger)", fontSize: "14px", fontWeight: 500,
              transition: "background var(--transition)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: "18px" }}>⎋</span>
            Sign Out
          </button>
        </div>
      </aside>

      <style>{`
        .sidebar { position: relative; z-index: 150; }
        .sidebar-overlay { display: none; }
        @media (max-width: 768px) {
          .sidebar {
            position: fixed; top: 0; left: 0; height: 100dvh;
            transform: translateX(-100%);
            transition: transform var(--transition);
          }
          .sidebar--open { transform: translateX(0); box-shadow: var(--shadow-lg); }
          .sidebar-overlay { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
