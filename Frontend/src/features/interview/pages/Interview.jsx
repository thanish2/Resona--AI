import { useState,useEffect } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate,useParams } from "react-router";

import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";

import Overview from "../components/Overview";
import Technical from "../components/Technical";
import Behavioral from "../components/Behavioral";
import Roadmap from "../components/Roadmap";




export default function Interview() {
  const [tab, setTab] = useState("overview");
  const { report, getReportById, resumeLoading,loading } = useInterview();
  


  if (!report) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-900">
        <div className="flex flex-col items-center gap-6">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-surface-700 border-t-primary-400"></div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">
              Loading your report...
            </h2>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-surface-900 text-white">
      <div className="mx-auto grid max-w-[1800px] grid-cols-[250px_1fr_330px] gap-8 p-8">
        <Sidebar tab={tab} setTab={setTab} />

        <section className="min-h-[92vh] rounded-3xl border border-surface-700 bg-surface-800/60 p-10">
          {tab === "overview" && (
            <Overview
              tab={tab}
              setTab={setTab}
              title={report.title}
              report={report}
            />
          )}

          {tab === "technical" && (
            <Technical questions={report.technicalQuestions} />
          )}

          {tab === "behavioral" && (
            <Behavioral questions={report.behavioralQuestions} />
          )}

          {tab === "roadmap" && <Roadmap roadmap={report.preparationPlan} />}
        </section>

        <RightPanel report={report} />
      </div>
    </main>
  );
}
