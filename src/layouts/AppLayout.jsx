// src/layouts/AppLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import HeaderLayout from "../components/HeaderLayout";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import "../styles/AppLayout.css";

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // ⭐ NEW: shared collapse state
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 830) {
        setMobileOpen(false);
     }
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []); 

  return (
    <div className={`app-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="main-col">
        <HeaderLayout 
          onOpenMobile={() => setMobileOpen(true)}
          mobileOpen={mobileOpen}
        />

        <main className="app-content">
          <NeuralNetworkBackground enabled={true} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
