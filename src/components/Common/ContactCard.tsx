import React from 'react';
import type { ContactItem } from '../../types';
import { Mail, Clock, MessageSquare, ShieldCheck, Laptop, Building, CreditCard, UserCheck, GitPullRequest, Kanban, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context';

export const ContactCard: React.FC<{ contact: ContactItem }> = ({ contact }) => {
  const { openRealPersonModal, addToast } = useApp();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5" />;
      case 'Building': return <Building className="w-5 h-5" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5" />;
      case 'GitPullRequest': return <GitPullRequest className="w-5 h-5" />;
      case 'Kanban': return <Kanban className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const handleOpenChat = () => {
    openRealPersonModal(`Cần hỗ trợ về: ${contact.problem}`);
  };

  const handleSendEmail = () => {
    addToast(`Đang mở ứng dụng email tới: ${contact.teamEmail}`, 'info');
    window.open(`mailto:${contact.teamEmail}?subject=Yêu cầu hỗ trợ onboarding&body=Xin chào ${contact.leadRole},%0D%0ATôi là nhân sự mới cần hỗ trợ về: ${contact.problem}`);
  };

  return (
    <div className="mt-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-[#1F3A5F]/30 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F] shrink-0">
          {getIcon(contact.iconName)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {contact.department}
          </div>
          <h4 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
            {contact.problem}
          </h4>

          <div className="mt-2.5 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">Đầu mối:</span>
              <span className="truncate">{contact.leadRole}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-mono text-slate-700 select-all">{contact.teamEmail}</span>
            </div>

            <div className="flex items-center gap-2 text-slate-600">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Kênh: <strong>{contact.channel}</strong></span>
            </div>

            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md w-fit">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="font-medium text-[11px]">Phản hồi: {contact.responseTime}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenChat}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#1F3A5F] text-white hover:bg-[#162B47] text-xs font-medium rounded-lg shadow-sm transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Mở chat / Gửi yêu cầu
            </button>

            <button
              type="button"
              onClick={handleSendEmail}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium rounded-lg transition"
            >
              Gửi email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
