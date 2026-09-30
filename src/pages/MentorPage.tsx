import React, { useState } from 'react';
import { mockMentees, mockUnansweredQuestions } from '../data/mentor';
import {
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Check
} from 'lucide-react';
import { useApp } from '../context';

export const MentorPage: React.FC = () => {
  const { addToast } = useApp();
  const [questions, setQuestions] = useState(mockUnansweredQuestions);

  const handleResolveQuestion = (id: string, question: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    addToast(`Đã giải đáp câu hỏi: "${question.substring(0, 30)}..." và cập nhật vào kho tri thức ✅`, 'success');
  };

  const handleNudgeMentee = (menteeName: string) => {
    addToast(`Đã gửi lời nhắc hỗ trợ và mời họp 1-on-1 tới ${menteeName} 📅`, 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F]">
              <UserCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold text-[#1F3A5F] tracking-tight">
              Bảng điều khiển Mentor (Mentor View)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Theo dõi tiến độ tân binh, phát hiện cảnh báo nghẽn (bottleneck) và giải đáp câu hỏi chưa có tài liệu
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Đang quản lý: <strong>{mockMentees.length} nhân sự</strong>
          </span>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Cần lưu ý hỗ trợ
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">3</span>
            <span className="text-xs text-slate-500">nhân sự có cảnh báo</span>
          </div>
          <p className="text-[11px] text-amber-700 mt-1">
            2 chậm tiến độ, 1 hỏi lặp lại phân quyền
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Tiến độ trung bình
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1F3A5F]">49%</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +12% tuần này
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Chu kỳ thử việc 30 ngày đầu tiên
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Câu hỏi Bot chưa trả lời
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-rose-600">{questions.length}</span>
            <span className="text-xs text-slate-500">câu hỏi cần cập nhật docs</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Giúp cải thiện bộ tri thức cho kho Onboarding
          </p>
        </div>
      </div>

      {/* Table: Danh sách nhân sự phụ trách (Mentees) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              Danh sách Nhân sự mới đang theo dõi
            </h2>
            <p className="text-xs text-slate-500">
              Nhận diện sớm các rào cản và nguy cơ trễ hạn thử việc
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Nhân sự / Vị trí</th>
                <th className="py-3 px-4">Ngày vào / Ngày onboarding</th>
                <th className="py-3 px-4">Tiến độ Checklist</th>
                <th className="py-3 px-4">Tình trạng / Cảnh báo</th>
                <th className="py-3 px-4">Hoạt động gần nhất</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockMentees.map((m) => {
                const isSlow = m.warningTag === 'slow';
                const isRepeat = m.warningTag === 'access_repeat';

                return (
                  <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Name & Role */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                      <div className="text-slate-500 text-[11px]">{m.role} • {m.team}</div>
                    </td>

                    {/* Start Date */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{m.startDate}</div>
                      <span className="text-[11px] font-semibold text-[#1F3A5F] bg-blue-50 px-2 py-0.5 rounded">
                        Ngày {m.onboardingDay} / 30
                      </span>
                    </td>

                    {/* Progress Bar */}
                    <td className="py-3.5 px-4 w-44">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-700">{m.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            m.progressPercent > 70
                              ? 'bg-emerald-500'
                              : m.progressPercent > 35
                              ? 'bg-[#1F3A5F]'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${m.progressPercent}%` }}
                        />
                      </div>
                    </td>

                    {/* Warning Badge */}
                    <td className="py-3.5 px-4">
                      {isSlow && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          {m.warningLabel}
                        </span>
                      )}
                      {isRepeat && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-900 border border-rose-200">
                          <HelpCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          {m.warningLabel}
                        </span>
                      )}
                      {!isSlow && !isRepeat && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {m.warningLabel}
                        </span>
                      )}
                    </td>

                    {/* Last active */}
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {m.lastActive}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleNudgeMentee(m.name)}
                        className="px-3 py-1.5 bg-[#E8EEF4] hover:bg-[#D6E2EE] text-[#1F3A5F] rounded-xl font-semibold text-xs transition"
                      >
                        Nhắc nhở / Hỗ trợ
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card: Câu hỏi bot chưa trả lời được (Unanswered questions) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Câu hỏi Bot chưa trả lời được (Cần bổ sung tài liệu)
              </h3>
              <p className="text-xs text-slate-500">
                Các thắc mắc thực tế của tân binh bị rơi vào luồng Fallback hoặc Hỏi người thật
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full">
            {questions.length} câu hỏi đang chờ
          </span>
        </div>

        {questions.length > 0 ? (
          <div className="space-y-3">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      Chủ đề: {q.topic}
                    </span>
                    <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      Hỏi lặp lại {q.frequency} lần
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    "{q.question}"
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Hỏi bởi: <strong>{q.askedBy}</strong> • {q.timestamp}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleResolveQuestion(q.id, q.question)}
                    className="px-3.5 py-2 bg-[#1F3A5F] hover:bg-[#162B47] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Trả lời & Thêm vào Docs</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-emerald-700 bg-emerald-50 rounded-2xl border border-emerald-200 font-medium">
            Tuyệt vời! Hiện không còn câu hỏi nào chưa được giải đáp.
          </div>
        )}
      </div>
    </div>
  );
};
