import {
  Bars3Icon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import { useAuth } from '../../context/AuthContext';

export default function Header({ onMenuClick }) {
  const { user, isAdmin } = useAuth();
  const [notifications] = useState(3);

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';

    return 'Good Evening';
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-white tracking-wide">
            TeamTrack Workspace
          </h1>

          <p className="text-sm text-slate-400">
            {greeting()},{' '}
            <span className="text-indigo-400 font-medium">
              {user?.name?.split(' ')[0]}
            </span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Admin Badge */}
        {isAdmin && (
          <span className="hidden sm:flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            Admin Access
          </span>
        )}

        {/* Notification */}
        <button className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 transition-all">
          <BellIcon className="w-5 h-5 text-slate-300" />

          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-[10px] text-white flex items-center justify-center">
            {notifications}
          </span>
        </button>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-indigo-500/20 cursor-pointer">
          {user?.name
            ?.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </div>
      </div>
    </header>
  );
}