import React, { useState } from 'react';
import { mockOrgTree } from '../data/org';
import type { OrgNode } from '../types';
import {
  Network,
  ChevronDown,
  ChevronRight,
  User,
  FolderKanban,
  Mail,
  Sparkles,
  Building,
  Users,
  Target
} from 'lucide-react';
import { useApp } from '../context';

export const OrgPage: React.FC = () => {
  const { addToast } = useApp();

  // Track expanded nodes (by id)
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'div-tech-ops': true,
    'dept-product-ops': true,
  });

  // Selected node for side panel / details sheet
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(mockOrgTree.children?.[0].children?.[0] || mockOrgTree);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectNode = (node: OrgNode) => {
    setSelectedNode(node);
  };

  const handleFocusMyTeam = () => {
    // Expand root and Product Ops department
    setExpandedNodes({
      'div-tech-ops': true,
      'dept-product-ops': true,
      'dept-software-eng': false,
      'dept-data-ai': false,
      'dept-it-infra': false,
    });

    const myTeam = mockOrgTree.children?.[0]?.children?.find((t) => t.isMyTeam);
    if (myTeam) {
      setSelectedNode(myTeam);
      addToast('Đã định vị & mở rộng Team của bạn: Team Điều phối ✨', 'success');

      // Scroll into view if needed
      setTimeout(() => {
        const el = document.getElementById(myTeam.id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-xl bg-[#E8EEF4] text-[#1F3A5F]">
              <Network className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-extrabold text-[#1F3A5F] tracking-tight">
              Sơ đồ Tổ chức (Org Chart)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Khám phá cơ cấu tổ chức từ Khối, Phòng ban đến các Team chuyên trách
          </p>
        </div>

        {/* Button "Team của tôi" */}
        <button
          type="button"
          onClick={handleFocusMyTeam}
          className="px-4 py-2.5 bg-[#1F3A5F] hover:bg-[#162B47] text-white text-xs font-bold rounded-2xl shadow-sm transition flex items-center justify-center gap-2 group shrink-0"
        >
          <Sparkles className="w-4 h-4 text-sky-300" />
          <span>Team của tôi (Team Điều phối)</span>
        </button>
      </div>

      {/* Main Container: Left Tree View, Right Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Collapsible Tree (Col span 7) */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Cây phân cấp tổ chức
            </span>
            <span className="text-[11px] text-slate-400">
              Nhấn vào mũi tên để đóng/mở nhánh
            </span>
          </div>

          {/* Division (Root) */}
          <div className="space-y-3">
            <div
              id={mockOrgTree.id}
              onClick={() => handleSelectNode(mockOrgTree)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                selectedNode?.id === mockOrgTree.id
                  ? 'bg-blue-50/80 border-[#1F3A5F] shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={(e) => toggleExpand(mockOrgTree.id, e)}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-600"
                >
                  {expandedNodes[mockOrgTree.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                <div className="w-8 h-8 rounded-xl bg-[#1F3A5F] text-white flex items-center justify-center font-bold text-xs">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{mockOrgTree.name}</div>
                  <div className="text-[11px] text-slate-500">{mockOrgTree.leaderTitle} — {mockOrgTree.leader}</div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">
                Khối
              </span>
            </div>

            {/* Departments (Children) */}
            {expandedNodes[mockOrgTree.id] && (
              <div className="pl-6 sm:pl-8 space-y-3 border-l-2 border-slate-100 ml-4">
                {mockOrgTree.children?.map((dept) => {
                  const isDeptExpanded = expandedNodes[dept.id];
                  const isDeptSelected = selectedNode?.id === dept.id;

                  return (
                    <div key={dept.id} className="space-y-2">
                      {/* Department Row */}
                      <div
                        id={dept.id}
                        onClick={() => handleSelectNode(dept)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isDeptSelected
                            ? 'bg-sky-50 border-[#1F3A5F] shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            type="button"
                            onClick={(e) => toggleExpand(dept.id, e)}
                            className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 shrink-0"
                          >
                            {isDeptExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          <div className="w-7 h-7 rounded-lg bg-[#E8EEF4] text-[#1F3A5F] flex items-center justify-center shrink-0">
                            <Users className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 truncate">
                            <div className="text-xs font-bold text-slate-800 truncate">
                              {dept.name}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {dept.leaderTitle}: {dept.leader}
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1F3A5F] px-2 py-0.5 rounded-md shrink-0">
                          Phòng ban
                        </span>
                      </div>

                      {/* Teams (Grandchildren) */}
                      {isDeptExpanded && (
                        <div className="pl-6 sm:pl-8 space-y-2 border-l-2 border-slate-100 ml-4">
                          {dept.children?.map((team) => {
                            const isTeamSelected = selectedNode?.id === team.id;
                            const isMyTeam = team.isMyTeam;

                            return (
                              <div
                                key={team.id}
                                id={team.id}
                                onClick={() => handleSelectNode(team)}
                                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                  isMyTeam
                                    ? 'ring-2 ring-emerald-500 bg-emerald-50/70 border-emerald-300'
                                    : isTeamSelected
                                    ? 'bg-slate-100 border-[#1F3A5F]'
                                    : 'bg-white border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0 truncate">
                                  <div
                                    className={`w-2 h-2 rounded-full shrink-0 ${
                                      isMyTeam ? 'bg-emerald-500' : 'bg-slate-300'
                                    }`}
                                  />
                                  <span className="text-xs font-semibold text-slate-800 truncate">
                                    {team.name}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {isMyTeam && (
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md shadow-xs animate-pulse">
                                      Team của tôi
                                    </span>
                                  )}
                                  <span className="text-[10px] font-medium text-slate-400">
                                    {team.leader}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Side Panel / Details Sheet (Col span 5) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#E8EEF4] text-[#1F3A5F]">
                    {selectedNode.level === 'division'
                      ? 'Cấp Khối'
                      : selectedNode.level === 'department'
                      ? 'Cấp Phòng ban'
                      : 'Cấp Team chuyên trách'}
                  </span>
                  {selectedNode.isMyTeam && (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      Vị trí làm việc của bạn
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1F3A5F] leading-snug">
                  {selectedNode.name}
                </h3>
              </div>

              {/* Leader info */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1F3A5F] text-white flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">
                    {selectedNode.leaderTitle}
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {selectedNode.leader}
                  </div>
                </div>
              </div>

              {/* Chức năng / Trách nhiệm */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-sky-600" />
                  Chức năng & Nhiệm vụ chính
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedNode.responsibilities.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dự án đang làm */}
              {selectedNode.currentProjects && selectedNode.currentProjects.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                    <FolderKanban className="w-3.5 h-3.5 text-indigo-600" />
                    Dự án trọng điểm đang triển khai
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.currentProjects.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Đầu mối liên hệ */}
              {selectedNode.contactEmail && (
                <div className="pt-3 border-t border-slate-100 text-xs">
                  <div className="text-slate-400 text-[11px] uppercase font-bold mb-1">
                    Đầu mối liên hệ nhanh
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono text-slate-900 font-medium">
                      {selectedNode.contactEmail}
                    </span>
                    {selectedNode.contactRole && (
                      <span className="text-slate-500">({selectedNode.contactRole})</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              Chọn một bộ phận trên sơ đồ để xem thông tin chi tiết.
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-400">
            * Dữ liệu sơ đồ tổ chức được cập nhật định kỳ theo quyết định cơ cấu của Ban Giám đốc.
          </div>
        </div>
      </div>
    </div>
  );
};
