import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="group bg-white border border-slate-100 rounded-xl p-3 cursor-pointer hover:border-slate-200 transition-colors"
      onClick={onSelect}
    >
      <div className="rounded-lg p-3" style={{ background: colors?.bgcolor || "#F8FAFC" }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="shrink-0 w-10 h-10 bg-white rounded flex items-center justify-center border border-slate-100 shadow-sm">
              <span className="text-sm font-bold text-slate-900">{getInitials(role)}</span>
            </div>

            <div className="grow">
              <h2 className="text-base font-bold text-slate-900 truncate">{role}</h2>
              <p className="text-xs text-slate-600 truncate">{topicsToFocus}</p>
            </div>
          </div>

          <button
            className="hidden group-hover:flex items-center gap-1.5 text-xs text-[#4F7C82] font-bold cursor-pointer hover:scale-110 active:scale-90 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <LuTrash2 />
            Delete
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-slate-400">
        <div className="flex gap-2">
            <span className="text-slate-600 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded uppercase">Exp: {experience}</span>
            <span className="text-slate-600 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded uppercase">{questions} Questions</span>
        </div>
        <span>{lastUpdated}</span>
      </div>
    </div>
  );
};

export default SummaryCard;