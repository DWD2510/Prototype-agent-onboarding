import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  MessageSquare,
  Send,
  ChevronRight
} from 'lucide-react';
import { mockDocuments } from '../data/documents';

export const HomePage: React.FC = () => {
  const {
    currentUser,
    checklist,
    toggleChecklistItem,
    progressPercent,
    accessSystems,
    openSystemDrawer,
    openDocModal,
    openRealPersonModal,
    sendMessage
  } = useApp();

  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');

  // Items for today (Stage 2: Tuần 1 / Today's tasks)
  const todayTasks = checklist.filter((item) => item.isToday);

  // Suggestion chips
  const suggestionChips = [
    'Xin quyền GitHub thế nào?',
    'RASCI là gì?',
    'Máy tính lỗi thì hỏi ai?',
    'Tuần này tôi cần làm gì?',
  ];

  const handleSendFromHome = (queryText: string) => {
    if (!queryText.trim()) return;
    sendMessage(queryText);
    navigate('/chat');
  };

  const handleActionClick = (task: typeof checklist[0]) => {
    if (task.actionType === 'system' && task.systemId) {
      const sys = accessSystems.find((s) => s.id === task.systemId);
      if (sys) openSystemDrawer(sys);
    } else if (task.actionType === 'doc' && task.docId) {
      const doc = mockDocuments.find((d) => d.id === task.docId);
      if (doc) openDocModal(doc);
    } else if (task.actionType === 'chat' && task.chatPrompt) {
      handleSendFromHome(task.chatPrompt);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* 1. Header greeting & Onboarding Progress */}
      <div className="bg-gradient-to-r from-[#1F3A5F] to-[#2B4E7E] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-32 -mb-20 w-48 h-48 bg-sky-400/10 rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Chào {currentUser.name} 👋
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded-full">
                  {currentUser.team}
                </span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm font-medium">
                Ngày 3 / 30 của lộ trình onboarding — Tuần 1: Khám phá hệ thống & Phân quyền
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-3xl sm:text-4xl font-black text-sky-300">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-300 block font-medium">
                Hoàn thành tiến độ
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full bg-black/25 rounded-full h-3 overflow-hidden backdrop-blur-xs p-0.5">
              <div
                className="bg-gradient-to-r from-sky-400 to-emerald-400 h-2 rounded-full transition-all duration-700 ease-out shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-300">
              <span>Đã hoàn thành {checklist.filter(c => c.completed).length} / {checklist.length} đầu việc</span>
              <button
                type="button"
                onClick={() => navigate('/roadmap')}
                className="hover:text-white flex items-center gap-1 font-semibold underline underline-offset-2"
              >
                Xem chi tiết lộ trình <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Việc hôm nay & Mentor của bạn */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card: Việc hôm nay (Checklist items - Col span 2) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E8EEF4] text-[#1F3A5F] flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    Việc hôm nay
                  </h2>
                  <p className="text-xs text-slate-500">
                    Nhiệm vụ trọng tâm Ngày 3 giúp bạn hòa nhập nhanh chóng
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1F3A5F] bg-[#E8EEF4] px-2.5 py-1 rounded-full">
                {todayTasks.filter(t => t.completed).length} / {todayTasks.length} Đã xong
              </span>
            </div>

            {/* Checklist items */}
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    task.completed
                      ? 'bg-slate-50/70 border-slate-200 text-slate-500'
                      : 'bg-white border-slate-200/90 hover:border-[#1F3A5F]/40 shadow-xs text-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleChecklistItem(task.id)}
                      className="mt-0.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] rounded-full"
                      aria-label={task.completed ? 'Bỏ chọn' : 'Đánh dấu hoàn thành'}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 hover:text-[#1F3A5F] transition-colors" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <p
                        onClick={() => toggleChecklistItem(task.id)}
                        className={`text-xs sm:text-sm font-semibold cursor-pointer select-none leading-snug ${
                          task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {task.title}
                      </p>

                      {task.actionLabel && (
                        <button
                          type="button"
                          onClick={() => handleActionClick(task)}
                          className="mt-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 hover:underline"
                        >
                          <span>{task.actionLabel}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Tích vào ô tròn để cập nhật tiến độ</span>
            <button
              type="button"
              onClick={() => navigate('/roadmap')}
              className="font-bold text-[#1F3A5F] hover:underline"
            >
              Xem toàn bộ 12 đầu việc →
            </button>
          </div>
        </div>

        {/* Card: Mentor của bạn (Col span 1) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                Người đồng hành
              </span>
            </div>

            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={currentUser.mentorAvatar}
                alt={currentUser.mentorName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
              />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentUser.mentorName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {currentUser.mentorRole}
                </p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đang online tại bàn B12
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-2 mb-4 leading-relaxed">
              <p>
                "Chào Minh! Chị là mentor đồng hành cùng em trong 30 ngày tới. Có bất kỳ khúc mắc nào về quy trình hay task, em cứ thoải mái nhắn chị nhé!"
              </p>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200 flex justify-between">
                <span>Lịch 1-on-1 hàng tuần:</span>
                <strong className="text-slate-700">14:00 Thứ Sáu</strong>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => openRealPersonModal(`Cần trao đổi cùng Mentor ${currentUser.mentorName}`)}
              className="w-full py-2.5 px-4 bg-[#1F3A5F] hover:bg-[#162B47] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Nhắn Mentor ngay
            </button>

            <button
              type="button"
              onClick={() => handleSendFromHome('Chào chị Minh Anh, hôm nay mình có lịch 1-on-1 lúc mấy giờ ạ?')}
              className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition text-center"
            >
              Hỏi lịch họp qua Bot
            </button>
          </div>
        </div>
      </div>

      {/* 3. Big Chat Input at the bottom with Suggestion Chips */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/90 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Hỏi Onboarding Copilot
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            — Hỗ trợ giải đáp tức thì 24/7
          </span>
        </div>

        {/* Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendFromHome(chatInput);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Hỏi bất cứ điều gì về onboarding… (vd: xin quyền GitHub, ma trận RASCI, nghỉ phép)"
            className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition"
          />
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="absolute right-2 p-2.5 rounded-xl bg-[#1F3A5F] text-white disabled:opacity-40 disabled:hover:bg-[#1F3A5F] hover:bg-[#162B47] transition shadow-xs"
            aria-label="Gửi câu hỏi"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Suggestion Chips */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 mr-2 block sm:inline mb-1 sm:mb-0">
            Gợi ý câu hỏi phổ biến:
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendFromHome(chip)}
                className="px-3 py-1.5 bg-[#E8EEF4] hover:bg-[#D6E2EE] text-[#1F3A5F] text-xs font-semibold rounded-xl border border-[#BCD1E4]/60 transition flex items-center gap-1.5 group"
              >
                <span>{chip}</span>
                <ArrowRight className="w-3 h-3 text-[#1F3A5F]/70 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
