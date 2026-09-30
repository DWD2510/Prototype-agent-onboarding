import React from 'react';
import { useApp } from '../../context';
import {
  X,
  CheckCircle,
  Clock,
  UserCheck,
  ExternalLink,
  ShieldCheck,
  Check,
  AlertCircle,
  Kanban,
  GitBranch,
  BookOpen,
  Mail,
  RotateCcw
} from 'lucide-react';

export const SystemAccessDrawer: React.FC = () => {
  const { selectedAccessSystem, closeSystemDrawer, updateAccessStatus } = useApp();

  if (!selectedAccessSystem) return null;

  const isGranted = selectedAccessSystem.status === 'granted';
  const isPending = selectedAccessSystem.status === 'pending';

  const getSystemIcon = (name: string) => {
    switch (name) {
      case 'Kanban': return <Kanban className="w-6 h-6 text-blue-600" />;
      case 'GitBranch': return <GitBranch className="w-6 h-6 text-slate-800" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-sky-600" />;
      case 'Mail': return <Mail className="w-6 h-6 text-red-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
    }
  };

  const handleMarkGranted = () => {
    updateAccessStatus(selectedAccessSystem.id, 'granted');
  };

  const handleMarkPending = () => {
    updateAccessStatus(selectedAccessSystem.id, 'pending');
  };

  const handleReset = () => {
    updateAccessStatus(selectedAccessSystem.id, 'not_started');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeSystemDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-fade-in border-l border-slate-200">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200">
                {getSystemIcon(selectedAccessSystem.iconName)}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  {selectedAccessSystem.category}
                </span>
                <h3 className="text-lg font-bold text-[#1F3A5F]">
                  {selectedAccessSystem.name}
                </h3>
              </div>
            </div>

            <button
              onClick={closeSystemDrawer}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* Status indicator banner */}
            <div
              className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                isGranted
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : isPending
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {isGranted && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                {isPending && <Clock className="w-4 h-4 text-amber-600" />}
                {!isGranted && !isPending && <AlertCircle className="w-4 h-4 text-slate-500" />}
                <span>
                  Trạng thái hiện tại:{' '}
                  <strong>
                    {isGranted ? 'Đã có quyền' : isPending ? 'Đang chờ duyệt' : 'Chưa có quyền'}
                  </strong>
                </span>
              </div>

              {isGranted && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-normal underline"
                >
                  <RotateCcw className="w-3 h-3" /> Đặt lại
                </button>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedAccessSystem.description}
            </p>

            {/* Approver & Processing Time info */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 block mb-1 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> Người duyệt:
                </span>
                <span className="font-semibold text-slate-800 leading-tight">
                  {selectedAccessSystem.approver}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Thời gian xử lý:
                </span>
                <span className="font-semibold text-slate-800 leading-tight">
                  {selectedAccessSystem.typicalTime}
                </span>
              </div>
            </div>

            {/* Step-by-step numbered guide */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Các bước thực hiện (Theo quy chuẩn IT)
              </h4>
              <div className="space-y-3">
                {selectedAccessSystem.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#E8EEF4] text-[#1F3A5F] font-bold flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <p className="text-slate-700 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Form Link */}
            <div className="pt-2">
              <a
                href={selectedAccessSystem.formUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Mở cổng đăng ký: ${selectedAccessSystem.formUrl}`);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-xl border border-slate-300/80 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Mở form đăng ký cấp quyền nội bộ
              </a>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-2">
            {!isGranted ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleMarkPending}
                  disabled={isPending}
                  className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl border transition ${
                    isPending
                      ? 'bg-amber-100 text-amber-700 border-amber-300 cursor-default'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {isPending ? 'Đang chờ duyệt...' : 'Đã gửi form (Chờ duyệt)'}
                </button>

                <button
                  type="button"
                  onClick={handleMarkGranted}
                  className="flex-1 py-2.5 px-3 bg-[#1F3A5F] hover:bg-[#162B47] text-white text-xs font-semibold rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Đánh dấu đã có quyền
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 p-2.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl">
                <Check className="w-4 h-4 text-emerald-600" />
                Bạn đã được cấp quyền truy cập hệ thống này
              </div>
            )}

            <button
              type="button"
              onClick={closeSystemDrawer}
              className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-800 text-center"
            >
              Đóng lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
