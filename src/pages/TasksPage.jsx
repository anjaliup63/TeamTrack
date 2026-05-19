import { useEffect, useState } from 'react';

import { projectsAPI } from '../api/projects';
import { tasksAPI } from '../api/tasks';

import { useAuth } from '../context/AuthContext';

import KanbanBoard from '../components/tasks/KanbanBoard';
import TaskForm from '../components/tasks/TaskForm';

import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';

import toast from 'react-hot-toast';

import {
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

export default function TasksPage() {
  const { isAdmin } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const params = {};

      if (filterProject) {
        params.project = filterProject;
      }

      if (filterPriority) {
        params.priority = filterPriority;
      }

      const res = await tasksAPI.getAll(params);

      setTasks(res.data.tasks);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    projectsAPI
      .getAll()
      .then((r) => setProjects(r.data.projects))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [filterProject, filterPriority]);

  const handleStatusChange = async (taskId, status) => {
    try {
      await tasksAPI.updateStatus(taskId, status);

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, status } : t
        )
      );
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);

      setTasks((prev) =>
        prev.filter((t) => t._id !== taskId)
      );

      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleSuccess = () => {
    setShowModal(false);
    setEditTask(null);

    fetchTasks();
  };

  const filtered = tasks.filter(
    (t) =>
      t.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      t.project?.title
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const completedTasks = tasks.filter(
    (t) => t.status === 'done'
  ).length;

  const progressTasks = tasks.filter(
    (t) => t.status === 'in-progress'
  ).length;

  return (
    <div className="space-y-8">

      {/* HERO */}
      <div className="rounded-[32px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 p-8 relative overflow-hidden text-white">

        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-cyan-100 text-sm mb-2">
              TeamTrack Workspace
            </p>

            <h1 className="text-4xl font-bold">
              Task Management
            </h1>

            <p className="mt-3 text-cyan-100 max-w-2xl">
              Organize daily work, track progress and manage
              productivity across your team.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setEditTask(null);
                setShowModal(true);
              }}
              className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition-all flex items-center gap-2 w-fit"
            >
              <PlusIcon className="w-5 h-5" />
              Create Task
            </button>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              Total Tasks
            </p>

            <ClipboardDocumentListIcon className="w-6 h-6 text-cyan-400" />
          </div>

          <h2 className="text-3xl font-bold text-white mt-3">
            {tasks.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              Completed
            </p>

            <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
          </div>

          <h2 className="text-3xl font-bold text-emerald-400 mt-3">
            {completedTasks}
          </h2>
        </div>

        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              In Progress
            </p>

            <ClockIcon className="w-6 h-6 text-amber-400" />
          </div>

          <h2 className="text-3xl font-bold text-amber-400 mt-3">
            {progressTasks}
          </h2>
        </div>
      </div>

      {/* FILTERS */}
      <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5">

        <div className="flex flex-col xl:flex-row gap-4">

          {/* Search */}
          <div className="relative flex-1">

            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks or projects..."
              className="w-full rounded-2xl bg-slate-900 border border-slate-700 px-12 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Project Filter */}
          <select
            value={filterProject}
            onChange={(e) =>
              setFilterProject(e.target.value)
            }
            className="rounded-2xl bg-slate-900 border border-slate-700 px-5 py-3 text-white outline-none focus:border-cyan-500 transition-all xl:w-60"
          >
            <option value="">All Projects</option>

            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.title}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(e.target.value)
            }
            className="rounded-2xl bg-slate-900 border border-slate-700 px-5 py-3 text-white outline-none focus:border-cyan-500 transition-all xl:w-52"
          >
            <option value="">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* BOARD */}
      {loading ? (
        <div className="flex justify-center py-24">
          <LoadingSpinner size="xl" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-16 flex flex-col items-center justify-center text-center">

          <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-6">
            <ClipboardDocumentListIcon className="w-10 h-10 text-slate-500" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            No Tasks Found
          </h2>

          <p className="text-slate-400 mt-3 max-w-md">
            Create and organize tasks to start tracking
            your workspace productivity.
          </p>

          {isAdmin && (
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-all flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Create Task
            </button>
          )}
        </div>
      ) : (
        <KanbanBoard
          tasks={filtered}
          isAdmin={isAdmin}
          onEdit={(task) => {
            setEditTask(task);
            setShowModal(true);
          }}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* MODAL */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditTask(null);
        }}
        title={editTask ? 'Edit Task' : 'Create Task'}
        size="lg"
      >
        <TaskForm
          task={editTask}
          projects={projects}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowModal(false);
            setEditTask(null);
          }}
        />
      </Modal>
    </div>
  );
}