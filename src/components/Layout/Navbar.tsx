import React, { useState } from 'react';
import { useApp } from '../../context';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  Users,
  UserCheck,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, role, setRole, logout, progressPercent } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleRoleToggle = (newRole: 'newcomer' | 'mentor') => {
    setRole(newRole);
    if (newRole === 'mentor') {
      navigate('/mentor');
    } else {
      if (location.pathname === '/mentor') {
        navigate('/');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1F3A5F] text-white flex items-center justify-center shadow-md group-hover:bg-[#162B47] transition">
            <Compass className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#1F3A5F] text-base tracking-tight">
                Onboarding Copilot
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                Live Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Trợ lý hội nhập nhân sự mới — Ngày 3 / 30
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Role Toggle Switch */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => handleRoleToggle('newcomer')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                role === 'newcomer'
                  ? 'bg-white text-[#1F3A5F] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nhân sự mới</span>
              <span className="sm:hidden">Nhân viên</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleToggle('mentor')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                role === 'mentor'
                  ? 'bg-[#1F3A5F] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Mentor</span>
            </button>
          </div>

          {/* User profile dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500">{currentUser.role}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-xs animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-slate-500 text-[11px] truncate">{currentUser.email}</p>
                  <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                    Tiến độ onboarding: <strong>{progressPercent}%</strong>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/roadmap');
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-sky-600" />
                    Lộ trình của tôi
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/mentor');
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    Bảng điều khiển Mentor
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
