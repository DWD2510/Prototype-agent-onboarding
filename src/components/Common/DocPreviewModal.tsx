import React from 'react';
import { useApp } from '../../context';
import { X, FileText, Calendar, Users, Clock, Bookmark, Share2 } from 'lucide-react';

export const DocPreviewModal: React.FC = () => {
  const { selectedDoc, closeDocModal, addToast } = useApp();

  if (!selectedDoc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeDocModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col animate-fade-in">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F] shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1F3A5F] bg-blue-100/60 px-2 py-0.5 rounded-md mb-1">
                {selectedDoc.categoryLabel}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {selectedDoc.title}
              </h3>
            </div>
          </div>

          <button
            onClick={closeDocModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata bar */}
        <div className="px-6 py-2.5 bg-slate-100/70 border-b border-slate-200/60 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Cập nhật: <strong>{selectedDoc.updatedAt}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            Phụ trách: <strong>{selectedDoc.owner}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Thời gian đọc: <strong>{selectedDoc.readTime}</strong>
          </span>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-blue-50/60 border border-blue-200/60 rounded-xl">
            <h4 className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wide mb-1">
              Tóm tắt nội dung chính:
            </h4>
            <p className="text-xs text-slate-700">
              {selectedDoc.summary}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Nội dung chi tiết</h4>
            <p className="whitespace-pre-line text-slate-700 leading-relaxed">
              {selectedDoc.content}
            </p>
            <p className="text-slate-600 text-xs italic pt-3 border-t border-slate-100">
              * Đây là tài liệu lưu hành nội bộ của công ty. Nhân sự vui lòng tuân thủ quy định bảo mật thông tin và không chia sẻ ra bên ngoài.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addToast('Đã lưu tài liệu vào mục Đánh dấu cá nhân', 'success')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-100 transition"
            >
              <Bookmark className="w-3.5 h-3.5" />
              Lưu tài liệu
            </button>
            <button
              type="button"
              onClick={() => addToast('Đã sao chép liên kết tài liệu vào clipboard', 'info')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-100 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              Chia sẻ
            </button>
          </div>

          <button
            type="button"
            onClick={closeDocModal}
            className="px-4 py-2 bg-[#1F3A5F] text-white text-xs font-bold rounded-xl hover:bg-[#162B47] transition"
          >
            Đã hiểu, đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};
