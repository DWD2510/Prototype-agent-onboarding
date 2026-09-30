import React from 'react';
import type { SourceCardData } from '../../types';
import { FileText, ExternalLink, Calendar, Users } from 'lucide-react';
import { useApp } from '../../context';
import { mockDocuments } from '../../data/documents';

export const SourceCard: React.FC<{ source: SourceCardData }> = ({ source }) => {
  const { openDocModal, addToast } = useApp();

  const handleOpenDoc = () => {
    const doc = mockDocuments.find((d) => d.id === source.docId || d.title === source.title);
    if (doc) {
      openDocModal(doc);
    } else {
      addToast(`Đang mở tài liệu: ${source.title}`, 'info');
    }
  };

  return (
    <div
      onClick={handleOpenDoc}
      className="mt-3 p-3 bg-white rounded-xl border border-slate-200/90 shadow-sm hover:border-[#1F3A5F]/40 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="p-2 rounded-lg bg-[#E8EEF4] text-[#1F3A5F] shrink-0 group-hover:bg-[#1F3A5F] group-hover:text-white transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-900 group-hover:text-[#1F3A5F] truncate leading-tight">
              {source.title}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Cập nhật: {source.updatedAt}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                Phụ trách: <strong className="font-medium text-slate-600">{source.owner}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 text-slate-400 group-hover:text-[#1F3A5F] transition-colors p-1">
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
