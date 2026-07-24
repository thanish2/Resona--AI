import { Brain, TriangleAlert, CircleCheckBig,Bot } from "lucide-react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { useInterview } from "../hooks/useInterview";
import { useState } from "react";


export default function RightPanel({ report }) {
  const [resumeError, setResumeError] = useState("")
  const { getResumePdf, resumeLoading } = useInterview();
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-danger/20 text-danger border-danger/30";

      case "medium":
        return "bg-warning/20 text-warning border-warning/30";

      default:
        return "bg-accent-400/15 text-accent-300 border-accent-400/30";
    }
  };

  const handleGenerateResume = async () => {
    setResumeError("");
    try {
      await getResumePdf({ interviewReportId: report._id });
    } catch (error) {
      setResumeError(
        "Couldn't generate your resume right now. Please try again later.",
      );
    }
  };

  return (
    <aside className="sticky top-8 flex h-fit flex-col gap-6">
      {/* Button */}
      <div className="mb-4 flex flex-col items-end gap-2">
        <button
          onClick={handleGenerateResume}
          disabled={resumeLoading}
          className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary-500 via-primary-400 to-cyan-400 px-8 py-4 text-xl font-bold text-white shadow-[0_0_30px_rgba(124,31,224,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(0,240,255,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <Bot size={22} />
          {resumeLoading ? "Generating..." : "Generate AI Resume"}
        </button>

        {resumeError && <p className="text-sm text-red-400">{resumeError}</p>}
      </div>
      {/* Match Score */}

      <div className="rounded-3xl border border-surface-700 bg-surface-800/70 p-6 backdrop-blur-xl">
        <h3 className="mb-6 text-lg font-bold text-white">Match Score</h3>

        <div className="mx-auto w-40">
          <CircularProgressbar
            value={report.matchScore}
            text={`${report.matchScore}%`}
            styles={buildStyles({
              pathColor: "#7c1fe0",
              trailColor: "#1f1f30",
              textColor: "#ffffff",
              textSize: "16px",
            })}
          />
        </div>

        <p className="mt-5 text-center text-sm text-surface-400">
          Excellent alignment with the job description.
        </p>
      </div>

      {/* Skill Gaps */}

      <div className="rounded-3xl border border-surface-700 bg-surface-800/70 p-6 backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-2">
          <TriangleAlert className="text-warning" size={18} />

          <h3 className="font-bold text-white">Skill Gaps</h3>
        </div>

        <div className="space-y-3">
          {report.skillGaps.map((gap, index) => (
            <div
              key={index}
              className={`rounded-xl border px-4 py-3 ${getSeverityColor(
                gap.severity,
              )}`}
            >
              <div className="font-medium">{gap.skill}</div>

              <div className="mt-1 text-xs uppercase tracking-wider opacity-80">
                {gap.severity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Summary */}

      <div className="rounded-3xl border border-surface-700 bg-surface-800/70 p-6 backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-2">
          <Brain className="text-accent-300" size={18} />

          <h3 className="font-bold text-white">Profile Assessment</h3>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <CircleCheckBig className="mt-1 text-accent-300" size={18} />

            <p className="text-sm leading-6 text-surface-300">
              Here's how your background compares against what this role is
              looking for.
            </p>
          </div>

          <div className="flex gap-3">
            <CircleCheckBig className="mt-1 text-accent-300" size={18} />

            <p className="text-sm leading-6 text-surface-300">
              Some of your listed skills and experience line up with the job
              requirements, while others may need more emphasis or context.
            </p>
          </div>

          <div className="flex gap-3">
            <CircleCheckBig className="mt-1 text-accent-300" size={18} />

            <p className="text-sm leading-6 text-surface-300">
              Review the areas above closely and be ready to explain any gaps
              between your experience and the role in the interview.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
