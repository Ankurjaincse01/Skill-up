import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-[2px]">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl relative flex flex-col border-l border-slate-100">
        <button
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all z-10"
          onClick={onClose}
        >
          <LuX size={20} />
        </button>

        <div className="flex-1 overflow-y-auto p-6 pt-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;