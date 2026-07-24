import { motion } from "framer-motion";
import {
  MessageSquareText,
  Users,
  Target,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export default function Behavioral({ questions }) {
  return (
    <div>
      {/* Header */}

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-400/10 px-4 py-2 text-sm text-accent-300">
          <MessageSquareText size={16} />
          Behavioural Round
        </div>

        <h1 className="mt-5 text-4xl font-black text-white">
          Behavioural Interview Questions
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-surface-400">
          Behavioural interviews evaluate communication, ownership, leadership
          and teamwork. Structure your answers using the STAR framework.
        </p>
      </div>

      {/* STAR */}

      <div className="mb-10 rounded-2xl border border-primary-500/20 bg-primary-500/5 px-5 py-4">
        <div className="mb-3 flex items-center gap-2">
          <Users className="text-primary-300" size={16} />

          <h2 className="text-sm font-semibold text-white">
            STAR Answer Framework
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[
            ["S", "Situation"],
            ["T", "Task"],
            ["A", "Action"],
            ["R", "Result"],
          ].map(([letter, title]) => (
            <div
              key={letter}
              className="flex items-center gap-2 rounded-xl bg-surface-800 px-3 py-2"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-500/15 text-xs font-bold text-primary-300">
                {letter}
              </div>

              <h3 className="text-sm font-medium text-white">{title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Questions */}

      <div className="space-y-8">
        {questions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            className="overflow-hidden rounded-3xl border border-surface-700 bg-surface-700/30"
          >
            {/* Header */}

            <div className="border-b border-surface-700 p-10">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent-400/20 bg-accent-400/15 text-lg font-bold text-accent-300">
                  {index + 1}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-300">
                    Behavioural
                  </p>

                  <h2 className="mt-1.5 text-xl font-bold text-white">
                    Question {index + 1}
                  </h2>
                </div>
              </div>

              <p className="text-lg leading-8 text-surface-200">
                {item.question}
              </p>
            </div>

            <div className="flex ">
              {/* Intention */}

              <div className="flex-[35] border-r border-surface-700 p-8">
                <div className="mb-5 flex items-center gap-2">
                  <Target size={18} className="text-warning" />

                  <h3 className="font-semibold text-white">
                    Interviewer's Intention
                  </h3>
                </div>

                <p className="leading-8 text-surface-400">{item.intention}</p>
              </div>

              {/* Suggested */}

              <div className="flex-[65] p-8">
                <div className="mb-5 flex items-center gap-2">
                  <Lightbulb size={18} className="text-accent-300" />

                  <h3 className="font-semibold text-white">Suggested Answer</h3>
                </div>

                <div className="rounded-2xl border border-accent-400/20 bg-accent-400/5 p-5">
                  <div className="flex gap-3">
                    <CheckCircle2 size={18} className="mt-1 text-accent-300" />

                    <p className="leading-8 text-surface-300">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
