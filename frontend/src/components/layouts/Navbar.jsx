import React from "react";
import { Link } from "react-router-dom";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  return (
    <div className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
      <div className="container mx-auto h-full flex items-center justify-between gap-5 px-6">
        <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold italic">S</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">SkillUp</h2>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;