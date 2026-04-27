import React from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-[#4F7C82]/20">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;