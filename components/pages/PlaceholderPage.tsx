"use client";

import React from "react";

interface Props { title: string; icon: string; }

const PlaceholderPage: React.FC<Props> = ({ title, icon }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[420px] gap-4 text-muted text-center px-10">
    <div className="text-5xl w-20 h-20 flex items-center justify-center bg-surface rounded-2xl border border-border">
      {icon}
    </div>
    <div>
      <h2 className="font-display text-xl font-bold text-slate-200 mb-1.5">{title}</h2>
      <p className="text-sm">This section is coming soon.</p>
    </div>
  </div>
);

export default PlaceholderPage;
