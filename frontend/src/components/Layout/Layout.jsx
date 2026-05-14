import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0 border-r border-slate-800/70">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-all"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative z-50 flex flex-col w-72 animate-slide-in-left">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">

          <div className="max-w-7xl mx-auto animate-fade-in">

            {/* Decorative top glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* Page Content */}
            <div className="relative z-10">
              <Outlet />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}