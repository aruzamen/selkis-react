import React from "react";
import { useLocation } from "react-router-dom";

interface PageMeta { icon: string; label: string; }

const PAGE_META: Record<string, PageMeta> = {
  "/dashboard":  { icon: "▦", label: "Dashboard" },
  "/categories": { icon: "◉", label: "Categories" },
  "/analytics":  { icon: "◎", label: "Analytics" },
  "/orders":     { icon: "◐", label: "Orders" },
  "/settings":   { icon: "◯", label: "Settings" },
};

const PlaceholderPage: React.FC = () => {
  const { pathname } = useLocation();
  const { icon, label } = PAGE_META[pathname] ?? { icon: "◈", label: "Page" };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[420px] gap-4 text-muted text-center px-10">
      <div className="text-5xl w-20 h-20 flex items-center justify-center bg-surface rounded-2xl border border-border">
        {icon}
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-slate-200 mb-1.5">{label}</h2>
        <p className="text-sm">This section is coming soon.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
