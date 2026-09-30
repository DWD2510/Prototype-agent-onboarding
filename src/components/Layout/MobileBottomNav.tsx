import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  Milestone,
  FileText,
  MoreHorizontal,
  BookA,
  PhoneCall,
  Network,
  UserCheck,
  X
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const navigate = useNavigate();

  const primaryTabs = [
    { to: '/', label: 'Hôm nay', icon: Home, end: true },
    { to: '/chat', label: 'Hỏi đáp', icon: MessageSquare },
    { to: '/roadmap', label: 'Lộ trình', icon: Milestone },
    { to: '/docs', label: 'Tài liệu', icon: FileText },
  ];

  const moreItems = [
    { to: '/glossary', label: 'Thuật ngữ (Glossary)', icon: BookA, desc: 'Tra cứu thuật ngữ viết tắt và quy ước' },
    { to: '/contacts', label: 'Danh bạ giải quyết vấn đề', icon: PhoneCall, desc: 'Tìm kiếm đầu mối IT, HR, Admin' },
    { to: '/org', label: 'Sơ đồ tổ chức', icon: Network, desc: 'Cây phòng ban & tìm Team của tôi' },
    { to: '/mentor', label: 'Góc nhìn Mentor', icon: UserCheck, desc: 'Theo dõi tiến độ tân binh' },
  ];

  const handleSelectMore = (path: string) => {
    setIsMoreOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* More items drawer / overlay */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setIsMoreOpen(false)}
          />

          <div className="relative bg-white rounded-t-3xl shadow-2xl p-5 border-t border-slate-200 z-10 animate-fade-in space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-sm font-bold text-[#1F3A5F]">Tính năng mở rộng</span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.to}
                    type="button"
                    onClick={() => handleSelectMore(item.to)}
                    className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 text-left transition"
                  >
                    <div className="p-2.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.label}</div>
                      <div className="text-[11px] text-slate-500">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-2 flex items-center justify-around shadow-lg">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold transition ${
                  isActive
                    ? 'text-[#1F3A5F] font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg transition ${
                      isActive ? 'bg-[#E8EEF4] text-[#1F3A5F]' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="mt-0.5">{tab.label}</span>
                </>
              )}
            </NavLink>
          );
        })}

        {/* More button */}
        <button
          type="button"
          onClick={() => setIsMoreOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold text-slate-500 hover:text-slate-800"
        >
          <div className="p-1 rounded-lg">
            <MoreHorizontal className="w-5 h-5" />
          </div>
          <span className="mt-0.5">Thêm</span>
        </button>
      </nav>
    </>
  );
};
