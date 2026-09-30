import React, { useState } from 'react';
import { mockGlossary } from '../data/glossary';
import {
  BookA,
  Search,
  Tag,
  MessageSquare,
  Hash
} from 'lucide-react';
import { useApp } from '../context';
import { useNavigate } from 'react-router-dom';

export const GlossaryPage: React.FC = () => {
  const { sendMessage } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<'All' | 'Chung' | 'GSM'>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');

  // Extract unique starting letters
  const letters = ['All', ...Array.from(new Set(mockGlossary.map((g) => g.term[0].toUpperCase()))).sort()];

  const filteredTerms = mockGlossary.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.fullForm && item.fullForm.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === 'All' || item.projectTag === selectedTag;

    const matchesLetter =
      selectedLetter === 'All' || item.term[0].toUpperCase() === selectedLetter;

    return matchesSearch && matchesTag && matchesLetter;
  });

  const handleAskBotAboutTerm = (term: string) => {
    sendMessage(`Giải thích chi tiết thuật ngữ ${term} giúp mình`);
    navigate('/chat');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200/90">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F]">
            <BookA className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-extrabold text-[#1F3A5F] tracking-tight">
            Từ điển Thuật ngữ & Từ viết tắt (Glossary)
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Tra cứu nhanh các khái niệm nghiệp vụ đặc thù (Matching, Dispatching...) và thuật ngữ vận hành chung (RASCI, SOP, SLA...)
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo thuật ngữ (vd: RASCI, Matching), tên đầy đủ hoặc định nghĩa..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition"
          />
        </div>

        {/* Project Tag Filter + Letter Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100">
          {/* Project tag filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Dự án:
            </span>
            {(['All', 'Chung', 'GSM'] as const).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                  selectedTag === tag
                    ? 'bg-[#1F3A5F] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag === 'All' ? 'Tất cả' : tag}
              </button>
            ))}
          </div>

          {/* A-Z letter chips */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Hash className="w-3 h-3" /> A-Z:
            </span>
            {letters.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  selectedLetter === letter
                    ? 'bg-[#1F3A5F] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {letter === 'All' ? 'All' : letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1F3A5F]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-extrabold text-[#1F3A5F] leading-tight">
                    {item.term}
                  </h3>
                  {item.fullForm && (
                    <p className="text-xs text-slate-500 font-medium italic mt-0.5">
                      {item.fullForm}
                    </p>
                  )}
                </div>

                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                    item.projectTag === 'GSM'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-blue-100 text-blue-900 border border-blue-200'
                  }`}
                >
                  {item.projectTag}
                </span>
              </div>

              {/* Short definition */}
              <p className="text-xs text-slate-700 leading-relaxed mt-2 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                {item.shortDefinition}
              </p>

              {/* Example sentence */}
              {item.exampleSentence && (
                <p className="text-[11px] text-slate-500 italic mt-2.5">
                  <strong className="not-italic text-slate-600">Ngữ cảnh:</strong> "{item.exampleSentence}"
                </p>
              )}
            </div>

            {/* Related terms chips & Ask bot button */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Liên quan:</span>
                {item.relatedTerms.map((rt) => (
                  <button
                    key={rt}
                    type="button"
                    onClick={() => {
                      setSearchQuery(rt);
                      setSelectedTag('All');
                      setSelectedLetter('All');
                    }}
                    className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-md border border-sky-200 transition"
                  >
                    #{rt}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleAskBotAboutTerm(item.term)}
                className="text-[11px] font-semibold text-[#1F3A5F] hover:underline flex items-center gap-1 ml-auto"
              >
                <MessageSquare className="w-3 h-3" />
                Hỏi Bot
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-xs text-slate-500">
          Không tìm thấy thuật ngữ nào khớp với tìm kiếm "{searchQuery}".
        </div>
      )}
    </div>
  );
};
