import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EventCard({ event, onRegister, isRegistered }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-surface-900/10 border border-surface-100 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {event.isPremium ? (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-lg">
              ✦ Premium
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-accent-500 text-white rounded-full shadow-lg">
              Free
            </span>
          )}
          <span className="px-2.5 py-1 text-[11px] font-medium bg-white/90 backdrop-blur-sm text-surface-700 rounded-full">
            {event.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-center shadow-lg">
          <p className="text-xs font-bold text-primary-600">
            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
          </p>
          <p className="text-lg font-bold text-surface-800 -mt-1">
            {new Date(event.date).getDate()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/events/${event.id}`}>
          <h3 className="text-lg font-bold text-surface-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
            {event.title}
          </h3>
        </Link>
        <p className="text-sm text-surface-500 line-clamp-2 mb-4">
          {event.description}
        </p>

        {/* Meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-surface-500">
            <svg className="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {event.time}
          </div>
          <div className="flex items-center gap-2 text-sm text-surface-500">
            <svg className="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-100">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-surface-200 border-2 border-white" />
              ))}
            </div>
            <span className="text-xs text-surface-500">{event.attendees}+ attending</span>
          </div>
          
          {isRegistered ? (
            <span className="px-3 py-1.5 text-xs font-semibold text-accent-700 bg-accent-50 rounded-lg">
              ✓ Registered
            </span>
          ) : (
            <button
              onClick={() => onRegister?.(event.id)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors hover:shadow-md"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
