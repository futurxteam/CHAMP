import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, gradient = false }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl py-12 px-8 mb-8 ${gradient ? '' : 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800'}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{title}</h1>
        {subtitle && (
          <p className="text-primary-200/90 text-lg max-w-2xl">{subtitle}</p>
        )}
      </motion.div>
    </div>
  );
}
