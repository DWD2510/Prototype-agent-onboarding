import React, { useState, useRef, useEffect } from 'react';
import { mockGlossary } from '../../data/glossary';
import type { GlossaryTerm } from '../../types';
import { BookOpen, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GlossaryWordProps {
  term: GlossaryTerm;
  matchedText: string;
}

const GlossaryWord: React.FC<GlossaryWordProps> = ({ term, matchedText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const showTooltip = isHovered || isOpen;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={popupRef}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="font-semibold text-[#1F3A5F] underline decoration-dotted decoration-blue-500 decoration-2 underline-offset-4 hover:bg-blue-50 hover:text-blue-900 rounded px-0.5 transition-colors cursor-help inline"
        title={`Xem định nghĩa thuật ngữ ${term.term}`}
      >
        {matchedText}
      </button>

      {showTooltip && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-700 text-left text-xs leading-relaxed animate-fade-in pointer-events-auto"
        >
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />

          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div>
              <span className="font-bold text-sm text-sky-300 mr-2">{term.term}</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 bg-sky-950 text-sky-300 border border-sky-800 rounded">
                {term.projectTag}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setIsHovered(false);
              }}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {term.fullForm && (
            <p className="text-slate-300 italic mb-1.5 text-[11px] font-medium">
              {term.fullForm}
            </p>
          )}

          <p className="text-slate-200 text-xs mb-2.5 font-normal">
            {term.shortDefinition}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
            <span className="text-slate-400">Thuật ngữ dự án</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/glossary');
              }}
              className="text-sky-300 hover:text-sky-200 font-medium inline-flex items-center gap-1 hover:underline"
            >
              <BookOpen className="w-3 h-3" />
              Tra trong Từ điển
            </button>
          </div>
        </div>
      )}
    </span>
  );
};

export const GlossaryHighlightText: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const sortedTerms = [...mockGlossary].sort((a, b) => b.term.length - a.term.length);
  const termsPattern = sortedTerms
    .map((g) => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  const regex = new RegExp(`\\b(${termsPattern})\\b`, 'gi');

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;
    const matchedWord = match[0];

    if (matchStart > lastIndex) {
      parts.push(text.substring(lastIndex, matchStart));
    }

    const matchedTerm = mockGlossary.find(
      (g) => g.term.toLowerCase() === matchedWord.toLowerCase()
    );

    if (matchedTerm) {
      parts.push(
        <GlossaryWord
          key={`term-${matchStart}-${matchedWord}`}
          term={matchedTerm}
          matchedText={matchedWord}
        />
      );
    } else {
      parts.push(matchedWord);
    }

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <span className="whitespace-pre-line leading-relaxed">
      {parts.map((part, i) => (
        <React.Fragment key={i}>{part}</React.Fragment>
      ))}
    </span>
  );
};
