import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function BlogCard({ blog, onLike, onBookmark, isLiked, isBookmarked }) {
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
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 text-[11px] font-medium bg-white/90 backdrop-blur-sm text-surface-700 rounded-full">
            {blog.category}
          </span>
          {blog.isPremium && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-lg">
              ✦ Premium
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Author + Read Time */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={blog.authorAvatar}
            alt={blog.author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-surface-700">{blog.author}</p>
            <p className="text-xs text-surface-400">
              {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {blog.readTime}
            </p>
          </div>
        </div>

        <Link to={`/blogs/${blog._id || blog.id}`}>
          <h3 className="text-lg font-bold text-surface-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
            {blog.title}
          </h3>
        </Link>
        <p className="text-sm text-surface-500 line-clamp-2 mb-4">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike?.(blog._id || blog.id)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                isLiked ? "text-red-500" : "text-surface-400 hover:text-red-500"
              }`}
            >
              <svg className="w-4.5 h-4.5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-medium">{blog.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <div className="flex items-center gap-1.5 text-sm text-surface-400">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{blog.comments?.length || 0}</span>
            </div>
          </div>
          <button
            onClick={() => onBookmark?.(blog._id || blog.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked ? "text-primary-600" : "text-surface-400 hover:text-primary-600"
            }`}
          >
            <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
