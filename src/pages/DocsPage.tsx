import React, { useState } from 'react';
import { useApp } from '../context';
import { mockDocuments } from '../data/documents';
import type { DocCategory } from '../types';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Key,
  ShieldCheck,
  Kanban,
  GitBranch,
  BookOpen,
  Mail,
  ChevronRight
} from 'lucide-react';

export const DocsPage: React.FC = () => {
  const {
    accessSystems,
    openSystemDrawer,
    openDocModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DocCategory>('all');

  const categories = [
    { key: 'all' as DocCategory, label: 'Tất cả' },
    { key: 'hr' as DocCategory, label: 'Nhân sự' },
    { key: 'it' as DocCategory, label: 'IT & phân quyền' },
    { key: 'process' as DocCategory, label: 'Quy trình dự án' },
    { key: 'admin' as DocCategory, label: 'Hành chính' },
  ];

  const getSystemIcon = (name: string) => {
    switch (name) {
      case 'Kanban': return <Kanban className="w-6 h-6 text-blue-600" />;
      case 'GitBranch': return <GitBranch className="w-6 h-6 text-slate-800" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-sky-600" />;
      case 'Mail': return <Mail className="w-6 h-6 text-red-500" />;
      default: return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
    }
  };

  const filteredDocs = mockDocuments.filter((doc) => {
    const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      doc.title.toLowerCase().includes(query) ||
      doc.summary.toLowerCase().includes(query) ||
      doc.owner.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      {/* 1. Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200/90">
        <h1 className="text-xl font-extrabold text-[#1F3A5F] tracking-tight">
          Tài liệu & Phân quyền hệ thống
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Đăng ký tài khoản các công cụ làm việc và tra cứu sổ tay quy chuẩn nội bộ
        </p>
      </div>

      {/* 2. Special Section: Xin quyền hệ thống (Grid of Cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#E8EEF4] text-[#1F3A5F]">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Xin quyền hệ thống
              </h2>
              <p className="text-xs text-slate-500">
                Nhấn vào từng công cụ để xem hướng dẫn chi tiết và cập nhật trạng thái
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {accessSystems.filter((s) => s.status === 'granted').length} / {accessSystems.length} Đã có quyền
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accessSystems.map((system) => {
            const isGranted = system.status === 'granted';
            const isPending = system.status === 'pending';

            return (
              <div
                key={system.id}
                onClick={() => openSystemDrawer(system)}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1F3A5F]/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 group-hover:bg-[#E8EEF4] transition-colors">
                      {getSystemIcon(system.iconName)}
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                        isGranted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isPending
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isGranted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {isPending && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                      {!isGranted && !isPending && <AlertCircle className="w-3.5 h-3.5 text-slate-400" />}
                      <span>
                        {isGranted ? 'Đã có' : isPending ? 'Đang chờ duyệt' : 'Chưa có'}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1F3A5F] transition-colors leading-snug">
                    {system.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {system.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Duyệt: {system.approver}</span>
                  <span className="font-semibold text-sky-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Xem bước <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Document Library Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-100 text-[#1F3A5F]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              Kho tài liệu hướng dẫn
            </h2>
            <p className="text-xs text-slate-500">
              Tra cứu nhanh các chính sách, tài liệu kiến trúc và hướng dẫn hành chính
            </p>
          </div>
        </div>

        {/* Search bar & Category filters */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tài liệu theo tiêu đề, nội dung hoặc ban phụ trách..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A5F] transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Lọc:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat.key
                    ? 'bg-[#1F3A5F] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Table / Rows */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {filteredDocs.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => openDocModal(doc)}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F] shrink-0 mt-0.5 group-hover:bg-[#1F3A5F] group-hover:text-white transition-colors">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {doc.categoryLabel}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {doc.readTime}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1F3A5F] transition-colors leading-snug">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {doc.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-xs text-slate-400 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {doc.updatedAt}
                    </span>
                    <span className="font-medium text-slate-600 text-[11px] mt-0.5">
                      {doc.owner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-xs text-slate-500">
              Không tìm thấy tài liệu phù hợp với từ khóa "{searchQuery}".
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
