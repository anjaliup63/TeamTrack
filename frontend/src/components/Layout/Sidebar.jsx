import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import {
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  HomeIcon,
  UserCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
  { to: '/dashboard', label: 'Overview', Icon: HomeIcon },
  { to: '/projects', label: 'Projects', Icon: FolderIcon },
  { to: '/tasks', label: 'Tasks', Icon: ClipboardDocumentListIcon },
];

const adminLinks = [
  { to: '/team', label: 'Team Members', Icon: UsersIcon },
];

export default function Sidebar({ onClose }) {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-4 px-5 py-4 rounded-2xl text-[16px] font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-400/20 shadow-lg shadow-cyan-500/10'
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`;

  return (
    <aside className="m-4 rounded-[32px] flex flex-col h-[calc(100vh-32px)] w-72 bg-[#030712]/90 border border-white/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.35)] overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

      {/* LOGO */}
      <div className="relative px-6 py-7 border-b border-white/5">

        <div className="flex items-center gap-4">

          {/* CUSTOM LOGO */}
          <div className="relative w-16 h-16 flex items-center justify-center">

            {/* GLOW */}
            <div className="absolute inset-0 rounded-[24px] bg-cyan-500/20 blur-2xl" />

            {/* GLASS CARD */}
            <div className="relative w-full h-full rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-center overflow-hidden">

              {/* LIGHT */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

              {/* INNER BOX */}
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center">

                <div className="grid grid-cols-2 gap-1">

                  <div className="w-2 h-2 rounded-sm bg-white" />
                  <div className="w-2 h-2 rounded-sm bg-white/80" />
                  <div className="w-2 h-2 rounded-sm bg-white/80" />
                  <div className="w-2 h-2 rounded-sm bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div>

            <h1 className="text-3xl font-black tracking-tight text-white">
              TeamTrack
            </h1>

            <p className="text-sm text-slate-400 tracking-wide">
              Productivity Workspace
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="relative flex-1 px-4 py-6 overflow-y-auto">

        <p className="px-4 mb-4 text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">
          Workspace
        </p>

        <div className="space-y-3">

          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
              onClick={onClose}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />

              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* ADMIN */}
        {isAdmin && (
          <div className="mt-10">

            <p className="px-4 mb-4 text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">
              Administration
            </p>

            <div className="space-y-3">

              {adminLinks.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={linkClass}
                  onClick={onClose}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" />

                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* BOTTOM */}
      <div className="relative p-4 border-t border-white/5 space-y-3">

        {/* PROFILE */}
        <NavLink
          to="/profile"
          className={linkClass}
          onClick={onClose}
        >
          <UserCircleIcon className="w-6 h-6 flex-shrink-0" />

          <span>My Profile</span>
        </NavLink>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[16px] font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" />

          Logout
        </button>

        {/* USER CARD */}
        <div className="mt-4 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-5">

          {/* CARD GLOW */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full" />

          <div className="relative flex items-center gap-4">

            {/* AVATAR */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-base font-bold text-white shadow-lg shadow-cyan-500/20">

              {user?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </div>

            {/* USER INFO */}
            <div className="min-w-0">

              <p className="text-base font-bold text-white truncate">
                {user?.name}
              </p>

              <p className="text-sm text-slate-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}