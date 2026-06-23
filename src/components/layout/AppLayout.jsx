import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <Header onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            background: "var(--clr-bg)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
