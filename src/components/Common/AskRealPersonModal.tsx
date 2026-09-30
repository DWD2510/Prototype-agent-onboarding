import React, { useState } from 'react';
import { useApp } from '../../context';
import { mockContacts } from '../../data/contacts';
import { X, Send, User, HelpCircle, CheckCircle2 } from 'lucide-react';

export const AskRealPersonModal: React.FC = () => {
  const {
    isRealPersonModalOpen,
    realPersonQuestion,
    closeRealPersonModal,
    submitAskRealPerson
  } = useApp();

  // Pick suitable contact based on question
  const getInitialContact = () => {
    const qLower = (realPersonQuestion || '').toLowerCase();
    if (qLower.includes('máy tính') || qLower.includes('it') || qLower.includes('jira') || qLower.includes('github') || qLower.includes('vpn') || qLower.includes('lỗi')) {
      return 'cnt-it';
    } else if (qLower.includes('lương') || qLower.includes('phép') || qLower.includes('hồ sơ') || qLower.includes('bảo hiểm')) {
      return 'cnt-hr-cb';
    } else if (qLower.includes('thẻ') || qLower.includes('xe') || qLower.includes('phòng')) {
      return 'cnt-admin';
    } else if (qLower.includes('rasci') || qLower.includes('sprint') || qLower.includes('pmo')) {
      return 'cnt-pmo';
    }
    return 'cnt-it';
  };

  const [selectedContactId, setSelectedContactId] = useState<string>(getInitialContact);
  const [customMessage, setCustomMessage] = useState<string>(() =>
    `Chào anh/chị, tôi là nhân sự mới (Product Analyst - Team Điều phối). Tôi cần hỗ trợ giải đáp thắc mắc: "${realPersonQuestion || 'Quy trình onboarding'}". Nhờ anh/chị hỗ trợ giúp tôi nhé!`
  );

  if (!isRealPersonModalOpen) return null;

  const currentContact = mockContacts.find((c) => c.id === selectedContactId) || mockContacts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAskRealPerson(currentContact.leadRole, customMessage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeRealPersonModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-[#E8EEF4]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1F3A5F] text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1F3A5F]">
                Chuyển câu hỏi tới Người phụ trách
              </h3>
              <p className="text-xs text-slate-500">
                Bot sẽ chuyển tiếp nội dung trực tiếp tới đầu mối liên quan
              </p>
            </div>
          </div>

          <button
            onClick={closeRealPersonModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Target department select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Bộ phận đầu mối tiếp nhận
            </label>
            <select
              value={selectedContactId}
              onChange={(e) => setSelectedContactId(e.target.value)}
              className="w-full text-xs font-medium border border-slate-300 rounded-xl px-3 py-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F]"
            >
              {mockContacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.department} — {c.leadRole} ({c.channel})
                </option>
              ))}
            </select>
          </div>

          {/* SLA badge */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>
                Người phụ trách:{' '}
                <strong className="text-slate-900">{currentContact.leadRole}</strong>
              </span>
            </div>
            <span className="text-[11px] font-semibold text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">
              SLA: {currentContact.responseTime}
            </span>
          </div>

          {/* Pre-filled Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center justify-between">
              <span>Nội dung tin nhắn gửi đi</span>
              <span className="text-[11px] text-slate-400 font-normal">Có thể chỉnh sửa</span>
            </label>
            <textarea
              rows={4}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              required
              className="w-full text-xs text-slate-800 border border-slate-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] resize-none leading-relaxed"
            />
          </div>

          {/* Tip */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              Phản hồi sẽ được gửi qua Slack DM hoặc email cá nhân của bạn.
            </span>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeRealPersonModal}
              className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F3A5F] hover:bg-[#162B47] text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              <Send className="w-3.5 h-3.5" />
              Gửi yêu cầu ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
