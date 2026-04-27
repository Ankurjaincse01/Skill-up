import React, { useContext, useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSearch, LuSparkles } from "react-icons/lu";
import { UserContext } from "../../context/userContext";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const { user } = useContext(UserContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group bg-white border border-slate-100 rounded-lg overflow-hidden transition-colors hover:border-slate-200">
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="flex-1 flex items-start gap-3 min-w-0">
          <span className="h-7 w-7 rounded bg-slate-50 text-slate-400 border border-slate-100 text-[10px] inline-flex items-center justify-center shrink-0 mt-0.5">
            <LuSearch />
          </span>

          <h3
            className="text-base font-bold text-slate-900 leading-snug cursor-pointer hover:text-[#4F7C82] transition-all hover:scale-[1.005] duration-300"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            className={`h-8 w-8 rounded items-center justify-center border transition-colors ${
              isPinned
                ? "inline-flex bg-[#4F7C82] text-white border-[#0B2E33]"
                : "hidden group-hover:inline-flex text-slate-400 border-slate-100 bg-slate-50 hover:text-slate-900"
            }`}
            onClick={onTogglePin}
          >
            {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
          </button>

          <button
            className="hidden group-hover:inline-flex h-8 px-3 rounded items-center justify-center gap-1.5 bg-slate-50 text-[#4F7C82] border border-slate-100 hover:bg-slate-100 transition-colors text-[11px] font-bold uppercase tracking-wide cursor-pointer"
            onClick={onLearnMore}
          >
            <LuSparkles size={12} />
            Explain
          </button>

          <button
            className="h-8 w-8 rounded inline-flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            onClick={toggleExpand}
          >
            <LuChevronDown
              className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              size={18}
            />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-200 ease-in-out bg-slate-50/20"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="px-5 pb-6 pt-2 border-t border-slate-50">
          <div className="mt-4">
            <AIResponsePreview content={answer || "No answer available."} />
          </div>

          {user?.profileImageUrl && (
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
