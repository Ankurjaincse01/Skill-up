import React from "react";
import { LuSparkles } from "react-icons/lu";

const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated }) => {
  const topicsText = Array.isArray(topicsToFocus)
    ? topicsToFocus.join(", ")
    : topicsToFocus || "";

  return (
    <div className="rounded-2xl bg-white p-8 md:p-10 border border-slate-100 shadow-sm relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F7C82]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">{role}</h1>
            <p className="mt-3 text-lg text-slate-500 font-medium">{topicsText}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="text-[10px] font-black text-[#4F7C82] bg-[#4F7C82]/10 border border-[#4F7C82]/20 px-4 py-2 rounded-lg uppercase tracking-widest shadow-sm">
              Level: {experience} Exp
            </span>
            <span className="text-[10px] font-black text-slate-600 bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg uppercase tracking-widest shadow-sm">
              {questions} Questions
            </span>
          </div>
        </div>

        {description && (
          <div className="mt-8 pt-6 border-t border-slate-50">
            <div className="grow">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 opacity-70">Session Description</h4>
              <p className="text-base text-slate-600 leading-relaxed max-w-4xl font-medium italic">
                 {description}
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Last Prep: {lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;