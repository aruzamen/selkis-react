"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { hasPermission } from "../../models";
import type { Permission } from "../../models";
import Avatar from "../common/Avatar";

interface NavItem {
  icon: string;
  label: string;
  path: string;
  permission: Permission | null;
}

const NAV_ITEMS: NavItem[] = [
  { icon: "▦", label: "Dashboard",  path: "/dashboard",  permission: null },
  { icon: "◈", label: "Products",   path: "/products",   permission: "products:read" },
  { icon: "◉", label: "Categories", path: "/categories", permission: "products:read" },
  { icon: "◎", label: "Analytics",  path: "/analytics",  permission: "analytics:read" },
  { icon: "◐", label: "Orders",     path: "/orders",     permission: "orders:read" },
  { icon: "◯", label: "Settings",   path: "/settings",   permission: "settings:read" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const router          = useRouter();
  const pathname        = usePathname();
  const { user, logout} = useAuth();

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.permission || hasPermission(user?.role, item.permission)
  );

  const handleNav = (path: string) => { router.push(path); onClose(); };
  const handleLogout = () => { logout(); router.push("/login"); };

  return (
    <>
      {open && (
        <div onClick={onClose} className="md:hidden fixed inset-0 bg-black/60 z-40" />
      )}

      <aside
        className={[
          "w-[260px] bg-surface border-r border-border flex flex-col h-full overflow-hidden shrink-0 z-50",
          "sidebar-transition",
          "max-md:fixed max-md:top-0 max-md:left-0 max-md:h-dvh",
          open ? "max-md:translate-x-0 max-md:shadow-card" : "max-md:-translate-x-full",
        ].join(" ")}
      >
        {user && (
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Avatar initials={user.initials} color={user.accentColor} size="lg" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-slate-200">{user.fullName}</p>
              <span
                className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{ background: `${user.role.color}22`, color: user.role.color }}
              >
                {user.displayRole}
              </span>
            </div>
          </div>
        )}

        <p className="px-5 pt-4 pb-2 text-[10px] font-bold tracking-[1.2px] uppercase text-subtle">
          Navigation
        </p>

        <nav className="flex-1 px-2.5 pb-2 overflow-y-auto flex flex-col gap-0.5">
          {visibleItems.map(({ icon, label, path }) => {
            const active = pathname.startsWith(path);
            return (
              <button
                key={path}
                onClick={() => handleNav(path)}
                className={[
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                  active
                    ? "bg-gradient-to-r from-accent to-accent2 text-white shadow-accent font-semibold"
                    : "text-muted hover:bg-surface2 hover:text-slate-200",
                ].join(" ")}
              >
                <span className="text-[18px] leading-none">{icon}</span>
                {label}
              </button>
            );
          })}
        </nav>

        <div className="p-2.5 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <span className="text-[18px]">⎋</span>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
