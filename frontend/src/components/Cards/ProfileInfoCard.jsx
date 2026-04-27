import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3 py-1 px-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      <img
        src={user?.profileImageUrl || ""}
        alt=""
        className="w-9 h-9 bg-slate-100 rounded object-cover border border-slate-100 shadow-sm"
      />
      <div className="flex flex-col items-start min-w-[60px]">
        <div className="text-[13px] text-slate-900 font-bold leading-none mb-1 max-w-[120px] truncate">
          {user?.name || "User"}
        </div>
        <button
          className="text-slate-400 text-[11px] font-bold cursor-pointer hover:text-black transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;