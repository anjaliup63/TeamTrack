import { useEffect, useState } from 'react';

import { projectsAPI } from '../api/projects';
import { useAuth } from '../context/AuthContext';

import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';

import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';

import toast from 'react-hot-toast';

import {
  FolderOpenIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function ProjectsPage() {
  const { isAdmin } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await projectsAPI.getAll();

      setProjects(res.data.projects);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (project) => {
    setEditProject(project);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditProject(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditProject(null);
  };

  const handleSuccess = () => {
    handleClose();
    fetchProjects();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await projectsAPI.delete(deleteTarget._id);

      toast.success(`"${deleteTarget.title}" deleted`);

      setDeleteTarget(null);

      fetchProjects();
    } catch {
      toast.error('Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  const filtered = projects.filter((p) => {
    const matchSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === 'all' || p.status === filter;

    return matchSearch && matchFilter;
  });

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
              Project Management
            </h1>

            <p className="mt-3 text-cyan-100 max-w-2xl">
              Organize projects, track progress and collaborate
              efficiently across your workspace.
            </p>
          </div>

          {isAdmin && (
            <button
              id="create-project-btn"
              onClick={handleCreate}
              className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-medium hover:opacity-90 transition-all flex items-center gap-2 w-fit"
            >
              <PlusIcon className="w-5 h-5" />
              Create Project
            </button>
          )}
        </div>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
          <p className="text-slate-400 text-sm">
            Total Projects
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {projects.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
          <p className="text-slate-400 text-sm">
            Active Projects
          </p>

          <h2 className="text-3xl font-bold text-cyan-400 mt-2">
            {
              projects.filter((p) => p.status === 'active')
                .length
            }
          </h2>
        </div>

        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6">
          <p className="text-slate-400 text-sm">
            Completed
          </p>

          <h2 className="text-3xl font-bold text-emerald-400 mt-2">
            {
              projects.filter(
                (p) => p.status === 'completed'
              ).length
            }
          </h2>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}
          <div className="relative flex-1">

            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-2xl bg-slate-900 border border-slate-700 px-12 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-2xl bg-slate-900 border border-slate-700 px-5 py-3 text-white outline-none focus:border-cyan-500 transition-all lg:w-56"
          >
            <option value="all">All Projects</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* PROJECTS GRID */}
      {loading ? (
        <div className="flex justify-center py-24">
          <LoadingSpinner size="xl" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-16 flex flex-col items-center justify-center text-center">

          <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center mb-6">
            <FolderOpenIcon className="w-10 h-10 text-slate-500" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            No Projects Found
          </h2>

          <p className="text-slate-400 mt-3 max-w-md">
            Start managing your team workspace by creating
            your first project.
          </p>

          {isAdmin && (
            <button
              onClick={handleCreate}
              className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-all flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Create Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">

          {filtered.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              isAdmin={isAdmin}
              onEdit={handleEdit}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* CREATE/EDIT MODAL */}
      <Modal
        isOpen={showModal}
        onClose={handleClose}
        title={editProject ? 'Edit Project' : 'Create Project'}
      >
        <ProjectForm
          project={editProject}
          onSuccess={handleSuccess}
          onCancel={handleClose}
        />
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Project"
        size="sm"
      >
        <div className="space-y-5">

          <p className="text-slate-300 leading-relaxed">
            Are you sure you want to delete{' '}
            <strong className="text-white">
              "{deleteTarget?.title}"
            </strong>
            ?
          </p>

          <div className="flex gap-3">

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 rounded-2xl bg-red-500 hover:bg-red-600 transition-all py-3 text-white font-medium"
            >
              {deleting ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Delete Project'
              )}
            </button>

            <button
              onClick={() => setDeleteTarget(null)}
              className="px-5 py-3 rounded-2xl bg-slate-800 text-white hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}