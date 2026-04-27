import React, { useMemo, useState } from "react";
import { LuCheck, LuCode, LuCopy } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const normalized = useMemo(() => {
    if (typeof content !== "string") {
      if (content == null) return "No answer available.";
      try {
        return JSON.stringify(content, null, 2);
      } catch {
        return String(content);
      }
    }
    const trimmed = content.trim();
    return trimmed.length > 0 ? trimmed : "No answer available.";
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(normalized);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-50 bg-slate-50/50">
        <div className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
          <LuCode className="text-sm" />
          AI Analysis
        </div>
      </div>

      <div className="px-6 py-6 text-[15px] text-slate-700 leading-relaxed prose prose-slate max-w-none prose-p:my-4 prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-[#4F7C82] prose-code:text-[#4F7C82] prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-100">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");

              if (!inline && match) {
                return (
                  <SyntaxHighlighter
                    style={oneLight}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "1rem",
                      margin: "1.5rem 0",
                      fontSize: "13px",
                      padding: "20px",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #f1f5f9"
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              }

              return (
                <code className="px-2 py-0.5 rounded-md bg-[#4F7C82]/10 text-[#4F7C82] font-bold text-[13px]" {...props}>
                  {children}
                </code>
              );
            },
            a({ href, children }) {
              return (
                <a href={href} target="_blank" rel="noreferrer" className="text-[#4F7C82] hover:text-[#0B2E33] underline font-bold transition-all">
                  {children}
                </a>
              );
            },
            img({ src, alt }) {
              return (
                <img
                  src={src}
                  alt={alt || "preview"}
                  className="rounded-2xl border border-slate-100 max-h-96 object-contain my-6 shadow-md"
                />
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-6 rounded-2xl border border-slate-100 shadow-sm">
                  <table className="w-full border-collapse text-[13px]">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-slate-50/50 border-b border-slate-100">{children}</thead>;
            },
            th({ children }) {
              return <th className="px-5 py-4 text-left font-black text-slate-900 uppercase tracking-widest text-[10px]">{children}</th>;
            },
            td({ children }) {
              return <td className="border-t border-slate-50 px-5 py-4 align-top text-slate-600">{children}</td>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-[#4F7C82] pl-6 italic text-slate-500 my-8 py-2 bg-[#4F7C82]/10 rounded-r-2xl">
                  {children}
                </blockquote>
              );
            },
            hr() {
              return <hr className="my-3 border-slate-200" />;
            },
          }}
        >
          {normalized}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AIResponsePreview;
