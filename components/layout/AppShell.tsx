"use client";

import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

// AppShell owns the sidebar-open state and passes it down.
// It wraps page content passed as children (from the Next.js layout).
const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-dvh">
      <Header onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto bg-bg">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
