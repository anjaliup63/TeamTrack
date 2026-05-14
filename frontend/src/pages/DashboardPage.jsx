import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../api/dashboard';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

import { format } from 'date-fns';
import toast from 'react-hot-toast';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

import {
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI
      .getStats()
      .then((r) => setData(r.data))
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!data) return null;

  const {
    stats,
    recentTasks,
    overdueTaskList,
    teamStats,
  } = data;

  const doughnutData = {
    labels: ['Todo', 'Progress', 'Completed'],
    datasets: [
      {
        data: [
          stats.todoTasks,
          stats.inProgressTasks,
          stats.doneTasks,
        ],
        backgroundColor: [
          '#334155',
          '#06b6d4',
          '#10b981',
        ],
        borderWidth: 0,
      },
    ],
  };

  const cards = [
    {
      title: 'Total Tasks',
      value: stats.totalTasks,
      icon: ClipboardDocumentListIcon,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Completed',
      value: stats.doneTasks,
      icon: CheckCircleIcon,
      color: 'from-emerald-500 to-green-500',
    },
    {
      title: 'In Progress',
      value: stats.inProgressTasks,
      icon: ClockIcon,
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Overdue',
      value: stats.overdueTasks,
      icon: ExclamationTriangleIcon,
      color: 'from-rose-500 to-red-500',
    },
  ];

  return (
    <div className="space-y-8">

      {/* HERO SECTION */}
      <div className="rounded-[32px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 p-8 text-white relative overflow-hidden">

        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <p className="text-cyan-100 text-sm mb-2">
              Team Productivity Workspace
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>

            <p className="mt-3 text-cyan-100 max-w-2xl">
              Monitor projects, track team productivity and manage
              tasks efficiently with TeamTrack.
            </p>
          </div>

          <div className="flex gap-4">

            <Link
              to="/projects"
              className="px-5 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition-all"
            >
              View Projects
            </Link>

            <Link
              to="/tasks"
              className="px-5 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition-all"
            >
              Manage Tasks
            </Link>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-800 bg-slate-950 p-6 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-slate-400 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-xl`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* TASK STATUS */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Task Analytics
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Overview of current task distribution
                </p>
              </div>
            </div>

            <div className="h-72 flex items-center justify-center">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#cbd5e1',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* RECENT TASKS */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="text-xl font-semibold text-white">
                  Recent Tasks
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Latest activity from your workspace
                </p>
              </div>

              <Link
                to="/tasks"
                className="text-cyan-400 text-sm hover:text-cyan-300"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-3">

              {recentTasks.length === 0 && (
                <p className="text-slate-500 text-sm">
                  No recent tasks available
                </p>
              )}

              {recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/20 transition-all"
                >

                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        task.project?.color || '#06b6d4',
                    }}
                  />

                  <div className="flex-1 min-w-0">

                    <p className="text-white font-medium truncate">
                      {task.title}
                    </p>

                    <p className="text-xs text-slate-400 truncate mt-1">
                      {task.project?.title}
                    </p>
                  </div>

                  <Badge variant={task.status} size="xs" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* QUICK STATUS */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">

            <h2 className="text-lg font-semibold text-white mb-5">
              Workspace Status
            </h2>

            <div className="space-y-4">

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    Active Projects
                  </span>

                  <FolderIcon className="w-5 h-5 text-cyan-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mt-3">
                  {stats.totalProjects || 0}
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    Completion Rate
                  </span>

                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                </div>

                <h3 className="text-2xl font-bold text-white mt-3">
                  {stats.totalTasks
                    ? Math.round(
                        (stats.doneTasks / stats.totalTasks) * 100
                      )
                    : 0}
                  %
                </h3>
              </div>
            </div>
          </div>

          {/* TEAM PERFORMANCE */}
          {isAdmin && teamStats?.length > 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">

              <h2 className="text-lg font-semibold text-white mb-5">
                Team Performance
              </h2>

              <div className="space-y-4">

                {teamStats.slice(0, 5).map((member) => (
                  <div key={member._id}>

                    <div className="flex items-center justify-between mb-2">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                          {member.name
                            ?.split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-white text-sm font-medium">
                            {member.name}
                          </p>

                          <p className="text-slate-400 text-xs">
                            {member.completed}/{member.assigned} tasks
                          </p>
                        </div>
                      </div>

                      <span className="text-cyan-400 text-sm font-medium">
                        {member.completionRate}%
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{
                          width: `${member.completionRate}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OVERDUE */}
          {overdueTaskList.length > 0 && (
            <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">

              <h2 className="text-lg font-semibold text-red-300 mb-5">
                Overdue Tasks
              </h2>

              <div className="space-y-3">

                {overdueTaskList.slice(0, 4).map((task) => (
                  <div
                    key={task._id}
                    className="p-4 rounded-2xl border border-red-500/10 bg-black/20"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <p className="text-red-100 text-sm font-medium">
                          {task.title}
                        </p>

                        <p className="text-red-300/70 text-xs mt-1">
                          Due {format(new Date(task.dueDate), 'MMM d')}
                        </p>
                      </div>

                      <Badge variant={task.priority} size="xs" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}