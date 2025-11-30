// src/layouts/AppLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import HeaderLayout from "../components/HeaderLayout";
import "../styles/AppLayout.css";

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Sidebar now handles both desktop + mobile drawer.
          We pass mobileOpen & onCloseMobile so header can open it. */}
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="main-col">
        {/* HeaderLayout should still call onOpenMobile prop to open mobile menu */}
        <HeaderLayout onOpenMobile={() => setMobileOpen(true)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
