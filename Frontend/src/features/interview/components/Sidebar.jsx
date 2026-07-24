import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Code2,
  MessageSquareText,
  Route,
  Sparkles,
} from "lucide-react";

export default function Sidebar({ tab, setTab }) {
  const menu = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "technical",
      label: "Technical",
      icon: Code2,
    },
    {
      id: "behavioral",
      label: "Behavioral",
      icon: MessageSquareText,
    },
    {
      id: "roadmap",
      label: "Roadmap",
      icon: Route,
    },
  ];

  return (
    <aside className="sticky top-8 flex h-[92vh] flex-col rounded-3xl border border-surface-700 bg-surface-800/60 p-6 backdrop-blur-xl">
      {/* Logo */}

      <div className="mb-12 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/15">
          <Sparkles size={24} className="text-primary-300" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">AI Report</h2>

          <p className="text-sm text-surface-400">Interview Analysis</p>
        </div>
      </div>

      {/* Navigation */}

      <div className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = tab === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{
                x: 4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setTab(item.id)}
              className={`relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300

                ${
                  active
                    ? "bg-primary-500/15 text-white"
                    : "text-surface-300 hover:bg-surface-700/50"
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-primary-400"
                />
              )}

              <Icon
                size={20}
                className={active ? "text-primary-300" : "text-surface-400"}
              />

              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-auto rounded-2xl border border-accent-400/20 bg-accent-400/5 p-5">
        <h3 className="mb-2 text-sm font-semibold text-accent-300">
          AI Recommendation
        </h3>

        <p className="text-sm leading-7 text-surface-300">
          Complete the Roadmap after reviewing your Technical Questions to
          maximize your interview readiness.
        </p>
      </div>
    </aside>
  );
}
