import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router';
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User, BrainCircuit } from "lucide-react";
import { useAuth } from "../hooks/useAuth";


const Register = () => {

    const {loading,handleRegister}=useAuth()
    
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();
    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        await handleRegister({ username, email, password });
        navigate("/");
      } catch (error) {
        const message=error?.response?.data?.message||"Something went wrong. Please try again.";
        setError(message);
      }
      
    };
    if (loading) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-surface-900">
          <div className="flex flex-col items-center gap-6">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-surface-700 border-t-primary-400"></div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">Loading...</h2>
              <p className="mt-1 text-sm text-surface-400">
                Please wait a moment.
              </p>
            </div>
          </div>
        </main>
      );
    }
return (
  <main className="relative min-h-screen overflow-hidden bg-surface-900 font-sans">
    {/* Background Glow */}
    <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-primary-500/20 blur-[180px]" />
    <div className="absolute right-0 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent-400/20 blur-[180px]" />

    {/* Grid */}
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "45px 45px",
      }}
    />

    {/* Floating Particles */}
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="absolute left-20 top-28 h-3 w-3 rounded-full bg-primary-400"
    />
    <motion.div
      animate={{ y: [0, 25, 0] }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute right-32 top-40 h-2 w-2 rounded-full bg-accent-300"
    />
    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 7, repeat: Infinity }}
      className="absolute bottom-28 left-1/3 h-2.5 w-2.5 rounded-full bg-primary-300"
    />

    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-20 px-10">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden w-1/2 lg:block"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-200">
          <Sparkles size={16} />
          Build Your Career with AI
        </div>

        <h1 className="text-6xl font-black leading-tight text-white">
          Create Your
          <span className="block bg-gradient-to-r from-primary-300 via-primary-400 to-accent-300 bg-clip-text text-transparent">
            AI Career Hub
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-8 text-surface-300">
          Join thousands of students using AI to optimize resumes, prepare for
          interviews, analyze job descriptions, and land their dream jobs.
        </p>

        <div className="mt-12 grid gap-5">
          <div className="flex items-center gap-4 rounded-2xl border border-surface-700 bg-surface-800/70 p-5 backdrop-blur-xl">
            <BrainCircuit className="text-accent-300" size={28} />
            <div>
              <h3 className="font-semibold text-white">
                AI Interview Practice
              </h3>
              <p className="text-sm text-surface-400">
                Practice role-specific interview questions instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-surface-700 bg-surface-800/70 p-5 backdrop-blur-xl">
            <Sparkles className="text-primary-300" size={28} />
            <div>
              <h3 className="font-semibold text-white">
                ATS Resume Optimization
              </h3>
              <p className="text-sm text-surface-400">
                Build resumes recruiters actually want to read.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full lg:w-[460px]"
      >
        <div className="form-container rounded-3xl border border-surface-700 bg-surface-800/70 p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(124,31,224,0.15)]">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-400 shadow-lg shadow-primary-500/30">
              <Sparkles className="text-white" />
            </div>

            <h1 className="text-4xl font-bold text-white">Create Account</h1>

            <p className="mt-2 text-surface-400">
              Start preparing for your dream job today.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="space-y-5"
          >
            <div className="input-group">
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-surface-200"
              >
                Username
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400"
                />

                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full rounded-xl border border-surface-600 bg-surface-700 py-3 pl-12 pr-4 text-white placeholder:text-surface-400 outline-none transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20"
                />
              </div>
            </div>

            <div className="input-group">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-surface-200"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400"
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-surface-600 bg-surface-700 py-3 pl-12 pr-4 text-white placeholder:text-surface-400 outline-none transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20"
                />
              </div>
            </div>

            <div className="input-group">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-surface-200"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400"
                />

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-surface-600 bg-surface-700 py-3 pl-12 pr-4 text-white placeholder:text-surface-400 outline-none transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm font-medium text-danger">
                {error}
              </p>
            )}

            <button className="button primary-button mt-2 w-full rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 py-3 text-lg font-semibold text-white shadow-lg shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary-500/50">
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-surface-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary-300 transition-colors duration-300 hover:text-primary-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  </main>
);
}

export default Register
