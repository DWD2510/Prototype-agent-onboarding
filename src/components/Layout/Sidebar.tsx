import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  Milestone,
  FileText,
  BookA,
  PhoneCall,
  Network,
  UserCheck,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context';

export const Sidebar: React.FC = () => {
  const { progressPercent, currentUser, openRealPersonModal } = useApp();

  const navItems = [
    { to: '/', label: 'Hôm nay', icon: Home, end: true },
    { to: '/chat', label: 'Hỏi đáp (Copilot)', icon: MessageSquare, badge: 'AI' },
    { to: '/roadmap', label: 'Lộ trình', icon: Milestone },
    { to: '/docs', label: 'Tài liệu & Quyền', icon: FileText },
    { to: '/glossary', label: 'Thuật ngữ', icon: BookA },
    { to: '/contacts', label: 'Danh bạ hỗ trợ', icon: PhoneCall },
    { to: '/org', label: 'Sơ đồ tổ chức', icon: Network },
    { to: '/mentor', label: 'Góc nhìn Mentor', icon: UserCheck, badge: 'Admin' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 h-[calc(100vh-57px)] sticky top-[57px] justify-between p-4">
      {/* Navigation links */}
      <div className="space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Menu chính
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#1F3A5F] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-400 group-hover:text-[#1F3A5F]'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[#E8EEF4] text-[#1F3A5F]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Onboarding mini progress card */}
        <div className="p-3.5 bg-gradient-to-br from-slate-50 to-[#E8EEF4]/50 border border-slate-200/80 rounded-2xl">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#1F3A5F]">Tiến độ Onboarding</span>
            <span className="font-extrabold text-[#1F3A5F]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#1F3A5F] h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Đang ở: <strong>Ngày 3 / 30</strong> (Tuần 1)
          </p>
        </div>
      </div>

      {/* Mentor quick contact footer card */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2.5">
          <img
            src={currentUser.mentorAvatar}
            alt={currentUser.mentorName}
            className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] text-slate-400 font-medium">Mentor của bạn</div>
            <div className="text-xs font-bold text-slate-800 truncate">
              {currentUser.mentorName}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openRealPersonModal('Cần gặp trao đổi cùng Mentor')}
          className="w-full py-2 px-3 bg-[#E8EEF4] hover:bg-slate-200 text-[#1F3A5F] text-xs font-semibold rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Hỏi người thật
        </button>
      </div>
    </aside>
  );
};
