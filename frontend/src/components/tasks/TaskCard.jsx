import { format, isPast } from 'date-fns';

import {
  ArrowPathIcon,
  CalendarIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  PlayIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

import Badge from '../common/Badge';

export default function TaskCard({
  task,
  isAdmin,
  onEdit,
  onDelete,
  onStatusChange,
  provided,
  snapshot,
}) {
  const isOverdue =
    task.dueDate &&
    isPast(new Date(task.dueDate)) &&
    task.status !== 'done';

  const nextStatus = {
    todo: 'inprogress',
    inprogress: 'done',
    done: 'todo',
  };

  const nextLabel = {
    todo: 'Start',
    inprogress: 'Complete',
    done: 'Reopen',
  };

  const nextIcon = {
    todo: <PlayIcon className="w-4 h-4" />,
    inprogress: (
      <CheckCircleIcon className="w-4 h-4" />
    ),
    done: <ArrowPathIcon className="w-4 h-4" />,
  };

  return (
    <div
      ref={provided?.innerRef}
      {...(provided?.draggableProps || {})}
      {...(provided?.dragHandleProps || {})}
      className={`group relative overflow-hidden rounded-[28px] border bg-slate-950 p-5 transition-all duration-300 hover:-translate-y-1 ${
        snapshot?.isDragging
          ? 'border-cyan-400 shadow-2xl scale-[1.03]'
          : 'border-slate-800 hover:border-cyan-500/30'
      } ${
        isOverdue
          ? 'ring-1 ring-red-500/20'
          : ''
      }`}
    >

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />

      {/* TOP */}
      <div className="relative z-10 flex items-start justify-between gap-3">

        <div className="flex flex-wrap items-center gap-2">

          <Badge variant={task.priority} size="xs" />

          {isOverdue && (
            <span className="px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-red-500/10 text-red-400 border border-red-500/20">
              Overdue
            </span>
          )}

          {task.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full text-[10px] uppercase tracking-wide bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-[11px] uppercase tracking-widest text-slate-500">
          {task.status}
        </div>
      </div>

      {/* TITLE */}
      <div className="relative z-10 mt-5">

        <h3
          className={`text-lg font-bold leading-snug ${
            task.status === 'done'
              ? 'line-through text-slate-500'
              : 'text-white'
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
            {task.description}
          </p>
        )}
      </div>

      {/* ASSIGNEE + DATE */}
      <div className="relative z-10 mt-6 flex items-center justify-between gap-3">

        {/* USER */}
        <div className="flex items-center gap-3 min-w-0">

          {task.assignee ? (
            <>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-lg flex-shrink-0">

                {task.assignee.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </div>

              <div className="min-w-0">

                <p className="text-sm text-white font-medium truncate">
                  {task.assignee.name}
                </p>

                <p className="text-xs text-slate-500">
                  Assigned Member
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-slate-500 text-sm">

              <UserCircleIcon className="w-5 h-5" />

              Unassigned
            </div>
          )}
        </div>

        {/* DATE */}
        {task.dueDate && (
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs ${
              isOverdue
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <CalendarIcon className="w-4 h-4" />

            {format(new Date(task.dueDate), 'MMM d')}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="relative z-10 mt-6 flex gap-3">

        <button
          onClick={() =>
            onStatusChange(
              task._id,
              nextStatus[task.status]
            )
          }
          className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition-all py-3 text-white text-sm font-semibold flex items-center justify-center gap-2"
        >
          {nextIcon[task.status]}
          {nextLabel[task.status]}
        </button>

        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(task)}
              className="w-12 rounded-2xl bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-all flex items-center justify-center text-white"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => onDelete(task._id)}
              className="w-12 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center justify-center text-red-400"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}