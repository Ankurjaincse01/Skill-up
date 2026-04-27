import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ isOpen, onClose, title, children, hideHeader }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-[#fdfcfb] w-full max-w-2xl rounded-[32px] relative shadow-2xl border border-white flex flex-col max-h-[90vh] overflow-hidden">
                {!hideHeader && (
                    <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 shrink-0">
                        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                    </div>
                )}
                
                <button
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors z-50"
                    onClick={onClose}
                >
                    <LuX size={20} />
                </button>

                <div className="overflow-y-auto flex-1 p-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
