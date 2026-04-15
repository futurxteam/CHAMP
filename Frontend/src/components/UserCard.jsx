import { motion } from "framer-motion";

export default function UserCard({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl p-5 border border-surface-100 hover:shadow-lg hover:shadow-surface-900/8 transition-all duration-300 text-center"
    >
      <div className="relative inline-block mb-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover ring-3 ring-surface-100"
        />
        {user.isPremium && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white text-[9px] border-2 border-white">
            ✦
          </div>
        )}
      </div>
      <h4 className="font-semibold text-surface-800 text-sm">{user.name}</h4>
      <p className="text-xs text-primary-600 font-medium mb-1">{user.role}</p>
      <p className="text-xs text-surface-400 mb-3">{user.organization}</p>
      <button className="w-full py-2 text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
        + Connect
      </button>
    </motion.div>
  );
}
