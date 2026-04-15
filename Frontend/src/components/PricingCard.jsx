import { motion } from "framer-motion";

export default function PricingCard({ plan, isCurrentPlan, onUpgrade }) {
  const isPremium = plan.name === "Premium";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${
        isPremium
          ? "bg-gradient-to-br from-primary-600 to-primary-800 border-primary-500 text-white shadow-2xl shadow-primary-500/25"
          : "bg-white border-surface-200 hover:border-primary-200 hover:shadow-xl hover:shadow-surface-900/8"
      }`}
    >
      {isPremium && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className={`text-xl font-bold mb-2 ${isPremium ? "text-white" : "text-surface-800"}`}>
          {plan.name}
        </h3>
        <p className={`text-sm mb-4 ${isPremium ? "text-primary-200" : "text-surface-500"}`}>
          {plan.description}
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-5xl font-extrabold ${isPremium ? "text-white" : "text-surface-900"}`}>
            {plan.price}
          </span>
          {plan.period && (
            <span className={`text-sm ${isPremium ? "text-primary-200" : "text-surface-400"}`}>
              /{plan.period}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPremium ? "text-accent-300" : "text-accent-500"}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={`text-sm ${isPremium ? "text-primary-100" : "text-surface-600"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {isCurrentPlan ? (
        <button
          disabled
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
            isPremium
              ? "bg-white/20 text-white cursor-default"
              : "bg-surface-100 text-surface-400 cursor-default"
          }`}
        >
          Current Plan
        </button>
      ) : (
        <button
          onClick={onUpgrade}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
            isPremium
              ? "bg-white text-primary-700 hover:shadow-xl hover:shadow-white/25"
              : "bg-primary-600 text-white hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25"
          }`}
        >
          {isPremium ? "Upgrade Now" : "Get Started Free"}
        </button>
      )}
    </motion.div>
  );
}
