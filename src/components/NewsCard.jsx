import { motion } from "framer-motion";

export default function NewsCard({ item, index }) {
  const categoryColors = {
    Regulatory: "bg-blue-50 text-blue-700",
    "Global Health": "bg-emerald-50 text-emerald-700",
    Research: "bg-purple-50 text-purple-700",
    Policy: "bg-amber-50 text-amber-700",
    Technology: "bg-cyan-50 text-cyan-700",
    Workforce: "bg-rose-50 text-rose-700",
  };

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white rounded-xl p-5 border border-surface-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
    >
      <div className="flex gap-4">
        {/* Left colored bar */}
        <div className="w-1 rounded-full bg-gradient-to-b from-primary-400 to-accent-400 flex-shrink-0" />

        <div className="flex-1 min-w-0">
          {/* Top row */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${categoryColors[item.category] || "bg-surface-100 text-surface-600"}`}>
              {item.category}
            </span>
            <span className="text-xs text-surface-400">
              {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-surface-800 group-hover:text-primary-600 transition-colors mb-1.5 line-clamp-2">
            {item.title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-surface-500 line-clamp-2 mb-2">
            {item.summary}
          </p>

          {/* Source */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-surface-400">
              Source: <span className="text-primary-600">{item.source}</span>
            </span>
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              Read more
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
