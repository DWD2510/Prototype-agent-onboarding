import { useApp } from '../context';
import { mockRoadmapStages } from '../data/checklist';
import { mockDocuments } from '../data/documents';
import {
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  ArrowRight,
  Milestone,
  Check,
  Clock
} from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const {
    checklist,
    toggleChecklistItem,
    accessSystems,
    openSystemDrawer,
    openDocModal,
    progressPercent
  } = useApp();

  const handleAction = (task: typeof checklist[0]) => {
    if (task.actionType === 'system' && task.systemId) {
      const sys = accessSystems.find((s) => s.id === task.systemId);
      if (sys) openSystemDrawer(sys);
    } else if (task.actionType === 'doc' && task.docId) {
      const doc = mockDocuments.find((d) => d.id === task.docId);
      if (doc) openDocModal(doc);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F]">
              <Milestone className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-extrabold text-[#1F3A5F] tracking-tight">
              Lộ trình Onboarding (30 ngày)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Lộ trình phân bổ theo từng giai đoạn (drip-feed) giúp bạn không bị quá tải thông tin
          </p>
        </div>

        <div className="bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 font-bold block uppercase">Tổng tiến độ</span>
            <span className="text-lg font-black text-[#1F3A5F]">{progressPercent}%</span>
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-[#1F3A5F] flex items-center justify-center font-bold text-xs text-[#1F3A5F]">
            ✓
          </div>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
        {mockRoadmapStages.map((stage, sIdx) => {
          const stageTasks = checklist.filter((item) => stage.checklistIds.includes(item.id));
          const completedCount = stageTasks.filter((item) => item.completed).length;
          const isAllCompleted = stageTasks.length > 0 && completedCount === stageTasks.length;
          const stageDocs = mockDocuments.filter((d) => stage.readingDocIds.includes(d.id));

          return (
            <div key={stage.id} className="relative">
              {/* Timeline marker node */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 z-10 transition-all ${
                  isAllCompleted
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : stage.isCurrent
                    ? 'bg-[#1F3A5F] border-[#1F3A5F] text-white shadow-md ring-4 ring-blue-100'
                    : stage.isLocked
                    ? 'bg-slate-100 border-slate-300 text-slate-400'
                    : 'bg-white border-slate-300 text-slate-600'
                }`}
              >
                {isAllCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : stage.isLocked ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : (
                  <span className="text-xs font-bold">{sIdx + 1}</span>
                )}
              </div>

              {/* Stage Card */}
              <div
                className={`rounded-3xl p-5 sm:p-7 border transition-all ${
                  stage.isCurrent
                    ? 'bg-white border-[#1F3A5F]/40 shadow-md ring-1 ring-[#1F3A5F]/10'
                    : isAllCompleted
                    ? 'bg-white border-emerald-200/80 shadow-xs'
                    : stage.isLocked
                    ? 'bg-slate-100/60 border-slate-200 opacity-75'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isAllCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : stage.isCurrent
                          ? 'bg-[#1F3A5F] text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {stage.daysLabel}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {stage.name}
                    </h3>
                  </div>

                  {/* Stage status indicator badge */}
                  <div>
                    {isAllCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Đã hoàn thành ({completedCount}/{stageTasks.length})
                      </span>
                    ) : stage.isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        Đang thực hiện ({completedCount}/{stageTasks.length})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-200/80 px-2.5 py-1 rounded-xl">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        {stage.unlockLabel || 'Chưa mở'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stage Goal */}
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                  <strong className="text-slate-800">Mục tiêu giai đoạn:</strong> {stage.goal}
                </p>

                {/* Checklist Section */}
                <div className="space-y-2.5 mb-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Danh sách đầu việc cần thực hiện
                  </h4>

                  {stageTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                        stage.isLocked
                          ? 'bg-slate-50/50 border-slate-200 text-slate-400'
                          : task.completed
                          ? 'bg-emerald-50/40 border-emerald-100 text-slate-600'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          type="button"
                          disabled={stage.isLocked}
                          onClick={() => toggleChecklistItem(task.id)}
                          className="shrink-0 focus:outline-none"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                          ) : stage.isLocked ? (
                            <Lock className="w-4 h-4 text-slate-300" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-300 hover:text-[#1F3A5F]" />
                          )}
                        </button>
                        <span className={`font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </span>
                      </div>

                      {task.actionLabel && !stage.isLocked && (
                        <button
                          type="button"
                          onClick={() => handleAction(task)}
                          className="shrink-0 text-[11px] font-semibold text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-1"
                        >
                          {task.actionLabel}
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Reading Docs Section */}
                {stageDocs.length > 0 && (
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Tài liệu cần đọc giai đoạn này:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {stageDocs.map((doc) => (
                        <button
                          key={doc.id}
                          type="button"
                          disabled={stage.isLocked}
                          onClick={() => openDocModal(doc)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                            stage.isLocked
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                              : 'bg-[#E8EEF4] hover:bg-[#D6E2EE] text-[#1F3A5F] border-[#BCD1E4]'
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{doc.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
