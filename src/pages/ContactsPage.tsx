import React, { useState } from 'react';
import { mockContacts } from '../data/contacts';
import { ContactCard } from '../components/Common/ContactCard';
import { PhoneCall, Search, Sparkles, HelpCircle } from 'lucide-react';
import { useApp } from '../context';

export const ContactsPage: React.FC = () => {
  const { openRealPersonModal } = useApp();
  const [problemQuery, setProblemQuery] = useState('');

  const quickFilterPills = [
    { label: 'Máy tính & Mạng', keyword: 'máy tính' },
    { label: 'Lương & Ngày phép', keyword: 'lương' },
    { label: 'Thẻ xe & Văn phòng', keyword: 'thẻ' },
    { label: 'Mentor & Việc làm', keyword: 'mentor' },
    { label: 'Tech Lead & Code', keyword: 'tech lead' },
    { label: 'Quy trình RASCI & Sprint', keyword: 'rasci' },
    { label: 'Bảo mật & VPN', keyword: 'bảo mật' },
  ];

  const filteredContacts = mockContacts.filter((contact) => {
    const q = problemQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      contact.problem.toLowerCase().includes(q) ||
      contact.department.toLowerCase().includes(q) ||
      contact.leadRole.toLowerCase().includes(q) ||
      contact.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200/90">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F]">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-extrabold text-[#1F3A5F] tracking-tight">
            Danh bạ giải quyết vấn đề
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Tìm kiếm đầu mối hỗ trợ theo vấn đề bạn đang gặp phải (không cần biết trước tên người phụ trách)
        </p>
      </div>

      {/* Problem Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <label
            htmlFor="problemSearch"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
          >
            <span>Tìm kiếm theo vấn đề cần trợ giúp</span>
            <span className="text-[11px] text-slate-400 font-normal">
              (Search by Problem, not by person)
            </span>
          </label>
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="problemSearch"
              type="text"
              value={problemQuery}
              onChange={(e) => setProblemQuery(e.target.value)}
              placeholder="Bạn cần hỗ trợ về việc gì? (vd: máy tính, lương, thẻ ra vào, bảo hiểm, github, wifi)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition"
            />
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-sky-600" />
            Vấn đề thường gặp:
          </span>
          {quickFilterPills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setProblemQuery(pill.keyword)}
              className={`px-3 py-1 rounded-xl text-xs font-medium border transition ${
                problemQuery.toLowerCase() === pill.keyword.toLowerCase()
                  ? 'bg-[#1F3A5F] text-white border-[#1F3A5F]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {pill.label}
            </button>
          ))}
          {problemQuery && (
            <button
              type="button"
              onClick={() => setProblemQuery('')}
              className="text-xs text-rose-600 hover:underline font-semibold ml-auto"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-xs text-slate-500 space-y-3">
          <p>Không tìm thấy đầu mối phù hợp với vấn đề "{problemQuery}".</p>
          <button
            type="button"
            onClick={() => openRealPersonModal(problemQuery)}
            className="px-4 py-2 bg-[#1F3A5F] text-white rounded-xl font-semibold hover:bg-[#162B47] transition inline-flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Gửi yêu cầu tới Ban Điều phối chung
          </button>
        </div>
      )}
    </div>
  );
};
