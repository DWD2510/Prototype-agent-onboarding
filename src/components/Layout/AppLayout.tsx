import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { ToastContainer } from '../Common/ToastContainer';
import { SystemAccessDrawer } from '../Common/SystemAccessDrawer';
import { AskRealPersonModal } from '../Common/AskRealPersonModal';
import { DocPreviewModal } from '../Common/DocPreviewModal';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-[#1F3A5F] selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Modals & Drawers */}
      <SystemAccessDrawer />
      <AskRealPersonModal />
      <DocPreviewModal />

      {/* Top Navbar */}
      <Navbar />

      {/* Body with Sidebar and Main Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-20 md:pb-8 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
