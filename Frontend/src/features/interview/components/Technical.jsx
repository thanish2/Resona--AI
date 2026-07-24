import { Code2, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function Technical({ questions }) {
  return (
    <div>
      {/* Header */}

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm text-primary-300">
          <Code2 size={16} />
          Technical Round
        </div>

        <h1 className="mt-5 text-4xl font-black text-white">
          Technical Interview Questions
        </h1>

        <p className="mt-3 max-w-3xl leading-7 text-surface-400">
          These questions are generated using your resume and the uploaded job
          description. Read the intention carefully before preparing your
          answer.
        </p>
      </div>

      {/* Questions */}

      <div className="space-y-8 ">
        {questions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-3xl border border-surface-700 bg-surface-700/30 overflow-hidden"
          >
            {/* Top */}

            <div className="border-b border-surface-700 p-10">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent-400/20 bg-accent-400/15 text-lg font-bold text-accent-300">
                  {index + 1}
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-primary-300">
                    Question
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    Technical Question {index + 1}
                  </h2>
                </div>
              </div>

              <p className="text-lg leading-8 text-surface-200">
                {item.question}
              </p>
            </div>

            {/* Bottom */}

            <div className="flex">
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

              {/* Answer */}

              <div className="p-8 flex-[65]">
                <div className="mb-5 flex items-center gap-2">
                  <Lightbulb size={18} className="text-accent-300" />

                  <h3 className="font-semibold text-white">Suggested Answer</h3>
                </div>

                <p className="leading-8 text-surface-300">{item.answer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
