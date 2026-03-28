import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import { blogs } from "../data/blogs";

export default function BlogDetailPage() {
  const { id } = useParams();
  const { likedBlogs, toggleBlogLike, toggleBlogBookmark, user } = useStore();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-700 mb-2">Article not found</h2>
          <Link to="/blogs" className="text-primary-600 hover:underline">Back to articles</Link>
        </div>
      </div>
    );
  }

  const isLiked = likedBlogs.includes(blog.id);
  const isBookmarked = user?.savedBlogs?.includes(blog.id);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-surface-500 mb-6">
          <Link to="/blogs" className="hover:text-primary-600 transition-colors">Community</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-surface-700 font-medium truncate">{blog.title}</span>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl overflow-hidden h-64 md:h-80 mb-8"
        >
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 md:p-10 border border-surface-100"
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">{blog.category}</span>
            {blog.isPremium && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full">✦ Premium</span>
            )}
            <span className="text-xs text-surface-400">{blog.readTime}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-surface-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-surface-100">
            <img src={blog.authorAvatar} alt={blog.author} className="w-12 h-12 rounded-full object-cover ring-2 ring-surface-100" />
            <div>
              <p className="font-semibold text-surface-800">{blog.author}</p>
              <p className="text-sm text-surface-500">
                Published {new Date(blog.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="prose prose-surface max-w-none mb-8">
            {blog.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-surface-600 leading-relaxed mb-4 text-[15px]">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-surface-100">
            <button
              onClick={() => toggleBlogLike(blog.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isLiked ? "bg-red-50 text-red-600" : "bg-surface-100 text-surface-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {blog.likes + (isLiked ? 1 : 0)} Likes
            </button>
            <button
              onClick={() => toggleBlogBookmark(blog.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isBookmarked ? "bg-primary-50 text-primary-600" : "bg-surface-100 text-surface-600 hover:bg-primary-50 hover:text-primary-600"
              }`}
            >
              <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isBookmarked ? "Saved" : "Save"}
            </button>
          </div>
        </motion.article>

        {/* Comments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 md:p-8 border border-surface-100 mt-6"
        >
          <h3 className="text-lg font-bold text-surface-800 mb-6">
            Comments ({blog.comments.length})
          </h3>

          {/* Add Comment */}
          <div className="flex items-start gap-3 mb-6 pb-6 border-b border-surface-100">
            <img src={user?.avatar} alt="You" className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1">
              <textarea
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 text-sm text-surface-800 placeholder-surface-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none resize-none"
              />
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
                  Post Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comment List */}
          {blog.comments.length > 0 ? (
            <div className="space-y-4">
              {blog.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3 p-4 bg-surface-50 rounded-xl">
                  <img src={comment.avatar} alt={comment.user} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-surface-800">{comment.user}</span>
                      <span className="text-xs text-surface-400">
                        {new Date(comment.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <p className="text-sm text-surface-600 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-surface-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
