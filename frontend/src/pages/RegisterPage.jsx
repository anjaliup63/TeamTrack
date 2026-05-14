import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import {
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

import LoadingSpinner from '../components/common/LoadingSpinner';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'member',
  });

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error('Please fill in all fields');
    }

    if (form.password.length < 4) {
      return toast.error(
        'Password must be at least 4 characters'
      );
    }

    if (form.password !== form.confirm) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);

    try {
      const user = await register(
        form.name,
        form.email,
        form.password,
        form.role
      );

      toast.success(
        `Welcome to TeamTrack, ${user.name.split(' ')[0]} 🎉`
      );

      navigate('/dashboard');
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#06131f] via-[#0b1726] to-[#020617] flex items-center justify-center px-6">

      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_30%)]" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-[36px] overflow-hidden border border-white/10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.45)]">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border-r border-white/5 relative overflow-hidden">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_25%)]" />

          {/* LOGO */}
          <div className="relative z-10">

            <div className="relative w-24 h-24 flex items-center justify-center">

              {/* BACKGROUND GLOW */}
              <div className="absolute inset-0 rounded-[32px] bg-cyan-500/20 blur-3xl animate-pulse" />

              {/* OUTER GLASS CARD */}
              <div className="relative w-full h-full rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-center shadow-[0_10px_50px_rgba(0,0,0,0.35)] overflow-hidden">

                {/* LIGHT REFLECTION */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

                {/* INNER BOX */}
                <div className="relative w-16 h-16 rounded-[20px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_8px_25px_rgba(59,130,246,0.45)]">

                  {/* INNER GLOW */}
                  <div className="absolute inset-0 rounded-[20px] bg-white/10" />

                  {/* CUSTOM GRID ICON */}
                  <div className="relative grid grid-cols-2 gap-1.5">

                    <div className="w-3 h-3 rounded-md bg-white shadow-sm" />

                    <div className="w-3 h-3 rounded-md bg-white/80 shadow-sm" />

                    <div className="w-3 h-3 rounded-md bg-white/80 shadow-sm" />

                    <div className="w-3 h-3 rounded-md bg-white shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="mt-8 text-6xl font-black tracking-[-3px] text-white leading-none">
              Team
              <span className="block text-cyan-400">
                Track
              </span>
            </h1>

            <p className="mt-6 text-slate-300 leading-relaxed max-w-md text-lg">
              Create projects, collaborate with teams
              and manage workflows in one powerful
              productivity workspace.
            </p>
          </div>

          {/* FEATURE BOXES */}
          <div className="relative z-10 space-y-4">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-cyan-300 text-sm uppercase tracking-[0.3em] mb-2">
                Smart Workspace
              </p>

              <h3 className="text-white text-xl font-semibold">
                Manage everything in one place
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-blue-300 text-sm uppercase tracking-[0.3em] mb-2">
                Team Collaboration
              </p>

              <h3 className="text-white text-xl font-semibold">
                Work together efficiently
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-slate-950/70 backdrop-blur-2xl p-8 sm:p-12 flex flex-col justify-center">

          {/* MOBILE LOGO */}
          <div className="lg:hidden text-center mb-10">

            <div className="mx-auto relative w-24 h-24 flex items-center justify-center">

              <div className="absolute inset-0 rounded-[32px] bg-cyan-500/20 blur-3xl animate-pulse" />

              <div className="relative w-full h-full rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-center shadow-[0_10px_50px_rgba(0,0,0,0.35)] overflow-hidden">

                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

                <div className="relative w-16 h-16 rounded-[20px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_8px_25px_rgba(59,130,246,0.45)]">

                  <div className="absolute inset-0 rounded-[20px] bg-white/10" />

                  <div className="relative grid grid-cols-2 gap-1.5">

                    <div className="w-3 h-3 rounded-md bg-white shadow-sm" />
                    <div className="w-3 h-3 rounded-md bg-white/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-md bg-white/80 shadow-sm" />
                    <div className="w-3 h-3 rounded-md bg-white shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="mt-5 text-5xl font-black tracking-[-2px] text-white">
              TeamTrack
            </h1>
          </div>

          {/* HEADING */}
          <div className="mb-8">

            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-3">
              Create Workspace
            </p>

            <h2 className="text-4xl font-bold text-white leading-tight">
              Start your productivity journey
            </h2>

            <p className="mt-4 text-slate-400 leading-relaxed max-w-md">
              Build projects, assign tasks and
              collaborate with your team in real time.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}
            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Email Address
              </label>

              <input
                id="reg-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* ROLE */}
            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Select Role
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              >
                <option value="member">
                  Team Member
                </option>

                <option value="admin">
                  Workspace Admin
                </option>
              </select>
            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  id="reg-password"
                  name="password"
                  type={
                    showPass ? 'text' : 'password'
                  }
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 pr-14 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPass((s) => !s)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPass ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM */}
            <div>

              <label className="block text-sm text-slate-300 mb-2">
                Confirm Password
              </label>

              <input
                id="confirm"
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl py-4 text-white font-semibold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:scale-[1.01] hover:opacity-95 transition-all shadow-2xl shadow-cyan-500/20"
            >
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-slate-400 mt-10">

            Already have an account?{' '}

            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}