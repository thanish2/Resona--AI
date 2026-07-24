import React, { useState,useRef,useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Briefcase,
  UploadCloud,
  UserRound,
  WandSparkles,
  Info
} from "lucide-react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate, useLocation } from "react-router";

const Home = () => {
  const { loading,generateReport,reports,getReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const resumeInputRef=useRef(null)
  const [resumeFile, setResumeFile] = useState(null);
  const navigate=useNavigate();
  const location = useLocation();

  const notFoundError = location.state?.error;


  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes


  const [fileError, setFileError] = useState("");

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are allowed.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }


    if (file.size > MAX_FILE_SIZE) {
      setFileError("File size must be under 3MB.");
      setResumeFile(null);
      e.target.value = "";
      return;
    }

    setFileError("");
    setResumeFile(file);
  };

  useEffect(() => {
    getReports();
  }, []);

  const handleGenerateReport=async()=>{
    const resume=resumeInputRef.current.files[0]; 
    const data=await generateReport({jobDescription ,selfDescription,resumeFile});
    navigate(`/interview/${data._id}`);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-900">
        
        <div className="flex flex-col items-center gap-6">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-surface-700 border-t-primary-400"></div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">
              Preparing your report...
            </h2>
            <p className="mt-1 text-l text-surface-400">
              Just a few seconds while we put it together.
            </p>
          </div>
        </div>
      </main>
    );
  }

return (
  <main className="relative min-h-screen overflow-hidden bg-surface-900 px-6 py-10 font-sans">
    {/* Background */}
    <div className="absolute left-0 top-0 h-[35rem] w-[35rem] rounded-full bg-primary-500/20 blur-[180px]" />
    <div className="absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-accent-400/20 blur-[180px]" />

    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          "linear-gradient(to right, white 1px, transparent 1px),linear-gradient(to bottom, white 1px, transparent 1px)",
        backgroundSize: "45px 45px",
      }}
    />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 mx-auto max-w-7xl"
    >
      {notFoundError && (
        <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
          {notFoundError}
        </p>
      )}
      {/* Header */}

      <div className="mb-10 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-5 py-2 text-sm text-primary-200">
          <Sparkles size={16} />
          AI Interview Preparation
        </div>

        <h1 className="text-5xl font-black text-white">
          Prepare Smarter with AI
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-surface-300">
          Upload your resume, paste a job description and let AI generate your
          personalized interview preparation report in seconds.
        </p>
      </div>

      {/* Main Card */}

      <div className="rounded-[32px] border border-surface-700 bg-surface-800/70 p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(124,31,224,0.15)]">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* LEFT */}

          <div className="left flex flex-col">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-primary-500/20 p-3">
                <Briefcase className="text-primary-300" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Job Description
                </h2>

                <p className="text-sm text-surface-400">
                  Paste the complete job description below.
                </p>
              </div>
            </div>

            <textarea
              name="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              id="jobDescription"
              placeholder="Paste the job description from LinkedIn, Indeed or any company portal..."
              className="h-[470px] w-full resize-none rounded-3xl border border-surface-600 bg-surface-700/70 p-6 text-white placeholder:text-surface-400 outline-none transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20"
            />
            {/*  AI report includes*/}
            <div className="mt-5 rounded-3xl border border-accent-400/20 bg-accent-400/5 p-5">
              <div className="mb-4 flex items-center gap-2 text-accent-300">
                <Sparkles size={18} />
                <span className="font-semibold">AI Report Includes</span>
              </div>

              <div className="grid grid-cols-2 gap-1 text-md">
                <div className="rounded-xl bg-surface-700/50 px-10 py-1 text-surface-200">
                  ✓ Match Score
                </div>

                <div className="rounded-xl bg-surface-700/50 px-10 py-1 text-surface-200">
                  ✓ ATS Score
                </div>

                <div className="rounded-xl bg-surface-700/50 px-10 py-1 text-surface-200">
                  ✓ Skill Gap
                </div>

                <div className="rounded-xl bg-surface-700/50 px-10 py-1 text-surface-200">
                  ✓ Interview Qs
                </div>

                <div className="rounded-xl bg-surface-700/50 px-10 py-1 text-surface-200">
                  ✓ Suggestions
                </div>

                <div className="rounded-xl bg-surface-700/50 px-10 py-1 text-surface-200">
                  ✓ Resume Analysis
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="right flex flex-col gap-6">
            {/* Upload */}
            {fileError && (
              <p className="mt-2 text-sm text-red-400">{fileError}</p>
            )}
            <div className="rounded-3xl border border-surface-700 bg-surface-700/60 p-6 transition-all duration-300 hover:border-primary-500">
              <label
                htmlFor="resume"
                className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"
              >
                <UploadCloud className="text-accent-300" />
                Upload Resume
              </label>

              <label
                htmlFor="resume"
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary-500/40 px-6 py-10 text-center transition hover:border-primary-400 hover:bg-primary-500/10"
              >
                <UploadCloud size={50} className="mb-4 text-primary-300" />

                {resumeFile ? (
                  <>
                    <h3 className="font-semibold text-white">
                      {resumeFile.name}
                    </h3>
                    <p className="mt-2 text-sm text-surface-400">
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold text-white">
                      Drag & Drop Resume
                    </h3>
                    <p className="mt-2 text-sm text-surface-400">
                      or click to browse
                    </p>
                  </>
                )}

                <p className="mt-4 text-xs uppercase tracking-widest text-primary-300">
                  PDF only · Max 5MB
                </p>
              </label>

              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                className="hidden"
                ref={resumeInputRef}
                onChange={handleResumeChange}
              />
            </div>
            <div className="relative my-5">
              <hr className="border-surface-700" />

              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-800 px-3 text-xs text-surface-400">
                OR
              </span>
            </div>

            {/* Self Description */}

            <div className="rounded-3xl border border-surface-700 bg-surface-700/60 p-6">
              <label
                htmlFor="selfDescription"
                className="mb-4 flex items-center gap-2 text-lg font-semibold text-white"
              >
                <UserRound className="text-accent-300" />
                Quick Self Description
              </label>

              <textarea
                name="selfDescription"
                onChange={(e) => setSelfDescription(e.target.value)}
                value={selfDescription}
                id="selfDescription"
                placeholder="Briefly describe your experience, projects, skills and achievements if you don't have a resume."
                className="h-48 w-full resize-none rounded-2xl border border-surface-600 bg-surface-800 p-5 text-white placeholder:text-surface-400 outline-none transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20"
              ></textarea>
            </div>

            <div className="mt-5 rounded-2xl border border-accent-400/20 bg-accent-400/10 p-4">
              <div className="flex items-start gap-3">
                <Info size={18} className="mt-0.5 text-accent-300" />

                <p className="text-sm leading-6 text-surface-300">
                  Either your{" "}
                  <span className="font-semibold text-white">Resume</span> or a
                  <span className="font-semibold text-white">
                    {" "}
                    Self Description
                  </span>{" "}
                  is required to generate a personalized interview report.
                </p>
              </div>
            </div>

            {/* Button */}

            <button
              onClick={handleGenerateReport}
              className="button mt-auto flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400 py-4 text-lg font-bold text-white shadow-[0_0_35px_rgba(124,31,224,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_55px_rgba(124,31,224,0.5)]"
            >
              <WandSparkles size={20} />
              Generate AI Report
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      {reports && reports.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-white">Recent Reports</h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((r) => (
              <div
                key={r._id}
                onClick={() => navigate(`/interview/${r._id}`)}
                className="cursor-pointer rounded-2xl border border-surface-700 bg-surface-800/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-[0_0_35px_rgba(124,31,224,0.15)]"
              >
                <h3 className="truncate font-semibold text-white">
                  {r.title || "Untitled Report"}
                </h3>

                <p className="mt-1 text-xs text-surface-400">
                  {new Date(r.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <div className="mt-4 flex gap-4">
                  {r.matchScore !== undefined && (
                    <div className="flex-1 rounded-xl bg-surface-700/50 px-3 py-2 text-center">
                      <p className="text-lg font-bold text-primary-300">
                        {r.matchScore}%
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-surface-400">
                        Match
                      </p>
                    </div>
                  )}

                  {r.atsScore !== undefined && (
                    <div className="flex-1 rounded-xl bg-surface-700/50 px-3 py-2 text-center">
                      <p className="text-lg font-bold text-accent-300">
                        {r.atsScore}%
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-surface-400">
                        ATS
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {reports && reports.length === 0 && (
        <div className="mt-14 rounded-2xl border border-dashed border-surface-700 p-10 text-center text-surface-400">
          No reports yet. Generate your first one above!
        </div>
      )}
    </motion.div>
  </main>
);
};

export default Home;
