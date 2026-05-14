import { Link } from 'react-router-dom';

import {
  ArrowTrendingUpIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

import { format, isPast } from 'date-fns';

import Badge from '../common/Badge';

export default function ProjectCard({
  project,
  isAdmin,
  onEdit,
  onDelete,
}) {
  const isOverdue =
    project.deadline &&
    isPast(new Date(project.deadline)) &&
    project.status !== 'completed';

  return (
    <div className="group relative overflow-hidden rounded-[30px] border border-slate-800 bg-slate-950 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">

      {/* Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${
            project.color || '#06b6d4'
          }20, transparent 40%)`,
        }}
      />

      {/* TOP */}
      <div className="relative z-10 flex items-start justify-between gap-3">

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-3 mb-3">

            <div
              className="w-4 h-4 rounded-full shadow-lg"
              style={{
                backgroundColor:
                  project.color || '#06b6d4',
              }}
            />

            <Badge variant={project.status} />
          </div>

          <Link
            to={`/projects/${project._id}`}
            className="block text-2xl font-bold text-white hover:text-cyan-400 transition-all truncate"
          >
            {project.title}
          </Link>

          {project.description && (
            <p className="mt-3 text-slate-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          )}
        </div>

        {/* Trend Icon */}
        <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">

          <ArrowTrendingUpIcon className="w-6 h-6 text-cyan-400" />
        </div>
      </div>

      {/* Progress */}
      <div className="relative z-10 mt-6">

        <div className="flex items-center justify-between mb-2">

          <span className="text-xs uppercase tracking-wider text-slate-500">
            Completion
          </span>

          <span className="text-sm font-semibold text-white">
            {project.progress ?? 0}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${project.progress ?? 0}%`,
              background:
                project.progress === 100
                  ? 'linear-gradient(90deg,#10b981,#34d399)'
                  : `linear-gradient(90deg,${
                      project.color || '#06b6d4'
                    },#3b82f6)`,
            }}
          />
        </div>
      </div>

      {/* STATS */}
      <div className="relative z-10 mt-6 grid grid-cols-3 gap-3">

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3">

          <ClipboardDocumentListIcon className="w-5 h-5 text-cyan-400 mb-2" />

          <p className="text-lg font-bold text-white">
            {project.taskCount ?? 0}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Tasks
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3">

          <UserGroupIcon className="w-5 h-5 text-emerald-400 mb-2" />

          <p className="text-lg font-bold text-white">
            {project.members?.length ?? 0}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Members
          </p>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3">

          <CalendarIcon
            className={`w-5 h-5 mb-2 ${
              isOverdue
                ? 'text-red-400'
                : 'text-amber-400'
            }`}
          />

          <p className="text-xs font-semibold text-white leading-tight">
            {project.deadline
              ? format(
                  new Date(project.deadline),
                  'MMM d'
                )
              : '--'}
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Deadline
          </p>
        </div>
      </div>

      {/* Members */}
      {project.members?.length > 0 && (
        <div className="relative z-10 mt-6 flex items-center justify-between">

          <div className="flex -space-x-3">

            {project.members
              .slice(0, 4)
              .map((m) => (
                <div
                  key={m._id}
                  className="w-10 h-10 rounded-2xl border-2 border-slate-950 bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg"
                  title={m.name}
                >
                  {m.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              ))}
          </div>

          {project.members.length > 4 && (
            <span className="text-xs text-slate-400">
              +{project.members.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* ACTIONS */}
      {isAdmin && (
        <div className="relative z-10 mt-6 flex gap-3">

          <button
            onClick={() => onEdit(project)}
            className="flex-1 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 py-3 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            <PencilSquareIcon className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={() => onDelete(project)}
            className="w-14 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center text-red-400 transition-all"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}