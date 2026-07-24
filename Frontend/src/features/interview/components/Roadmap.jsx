import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2 } from "lucide-react";

export default function Roadmap({ roadmap = [] }) {
  return (
    <div>
      {/* Header */}

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm text-primary-300">
          <CalendarDays size={16} />
          AI Preparation Plan
        </div>

        <h1 className="mt-5 text-4xl font-black text-white">
          {roadmap.length} Days Preperation Roadmap
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-surface-400">
          Follow this personalized roadmap to maximize your interview
          preparation before the big day.
        </p>
      </div>

      {/* Timeline */}

      <div className="space-y-6">
        {roadmap.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-surface-700 bg-surface-700/30 p-6"
          >
            {/* Header */}

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/15 text-lg font-bold text-primary-300">
                  {day.day}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-primary-300">
                    Day {day.day}
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    {day.focus}
                  </h2>
                </div>
              </div>

              <span className="rounded-full bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300">
                Study Plan
              </span>
            </div>

            {/* Tasks */}

            <div className="space-y-3">
              {(day.tasks ?? []).map((task, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-surface-800 px-5 py-1"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-accent-300"
                  />

                  <p className="leading-7 text-surface-300">{task}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
