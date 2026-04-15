import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../store/useStore";

export default function ProfilePage() {
  const { user } = useStore();
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, eventsRes] = await Promise.all([
          fetch("http://localhost:5000/api/blogs"),
          fetch("http://localhost:5000/api/events")
        ]);
        
        const blogsData = await blogsRes.json();
        const eventsData = await eventsRes.json();
        
        if (blogsRes.ok) setBlogs(blogsData);
        if (eventsRes.ok) setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const savedBlogItems = blogs.filter((b) => user?.savedBlogs?.includes(b._id || b.id));
  const savedEventItems = events.filter((e) => user?.savedEvents?.includes(e._id || e.id));

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-2xl border border-surface-100 overflow-hidden mb-8"
        >
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 relative">
            <div className="absolute inset-0">
              <div className="absolute top-8 right-16 w-32 h-32 rounded-full bg-white/10 blur-xl" />
              <div className="absolute -bottom-8 left-1/4 w-24 h-24 rounded-full bg-accent-400/20 blur-xl" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 md:px-8 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-12">
              <div className="relative mx-auto md:mx-0">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-28 h-28 md:w-24 md:h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                {user?.isPremium && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs border-2 border-white shadow-md">
                    ✦
                  </div>
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-extrabold text-surface-900 leading-tight">{user?.name}</h1>
                    <p className="text-primary-600 font-semibold">{user?.role}</p>
                  </div>
                  <div className="flex justify-center md:justify-end">
                    {user?.isPremium ? (
                      <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-md">
                        ✦ Premium Member
                      </span>
                    ) : (
                      <Link
                        to="/pricing"
                        className="px-6 py-2 text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-full transition-all"
                      >
                        Upgrade to Premium
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-surface-100"
            >
              <h3 className="text-lg font-bold text-surface-800 mb-4">About</h3>
              <p className="text-sm text-surface-600 leading-relaxed mb-4">{user?.bio}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-surface-400">Organization</p>
                    <p className="text-sm font-medium text-surface-700">{user?.organization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-surface-400">Experience</p>
                    <p className="text-sm font-medium text-surface-700">{user?.experience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-surface-400">Connections</p>
                    <p className="text-sm font-medium text-surface-700">{user?.connections}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-surface-100"
            >
              <h3 className="text-lg font-bold text-surface-800 mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {user?.interests?.map((interest, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-2xl p-6 border ${
                user?.isPremium
                  ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
                  : "bg-white border-surface-100"
              }`}
            >
              <h3 className="text-lg font-bold text-surface-800 mb-2">Subscription</h3>
              <p className={`text-sm font-semibold mb-2 ${user?.isPremium ? "text-amber-700" : "text-surface-500"}`}>
                {user?.isPremium ? "✦ Premium Plan" : "Free Plan"}
              </p>
              <p className="text-xs text-surface-500 mb-3">
                {user?.isPremium
                  ? "You have access to all premium events, articles, and features."
                  : "Upgrade to unlock premium content and exclusive events."}
              </p>
              {!user?.isPremium && (
                <Link
                  to="/pricing"
                  className="block w-full text-center py-2 text-xs font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg hover:shadow-md transition-all"
                >
                  Upgrade Now
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right Column - Saved Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Blogs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-6 border border-surface-100"
            >
              <h3 className="text-lg font-bold text-surface-800 mb-4">Saved Articles</h3>
              {savedBlogItems.length > 0 ? (
                <div className="space-y-3">
                  {savedBlogItems.map((blog) => (
                    <Link
                      key={blog.id}
                      to={`/blogs/${blog.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 transition-colors group"
                    >
                      <img src={blog.image} alt={blog.title} className="w-16 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-surface-800 group-hover:text-primary-600 transition-colors truncate">
                          {blog.title}
                        </h4>
                        <p className="text-xs text-surface-500">{blog.author} · {blog.readTime}</p>
                      </div>
                      <svg className="w-4 h-4 text-surface-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-surface-500 text-center py-4">No saved articles yet.</p>
              )}
            </motion.div>

            {/* Saved Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-6 border border-surface-100"
            >
              <h3 className="text-lg font-bold text-surface-800 mb-4">Saved Events</h3>
              {savedEventItems.length > 0 ? (
                <div className="space-y-3">
                  {savedEventItems.map((event) => (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 transition-colors group"
                    >
                      <div className="w-14 h-14 rounded-xl bg-primary-50 flex flex-col items-center justify-center flex-shrink-0">
                        <p className="text-[10px] font-bold text-primary-600">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                        </p>
                        <p className="text-lg font-bold text-surface-800 -mt-1">
                          {new Date(event.date).getDate()}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-surface-800 group-hover:text-primary-600 transition-colors truncate">
                          {event.title}
                        </h4>
                        <p className="text-xs text-surface-500">{event.location} · {event.time}</p>
                      </div>
                      {event.isPremium && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full">
                          ✦
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-surface-500 text-center py-4">No saved events yet.</p>
              )}
            </motion.div>

            {/* Activity Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-2xl p-6 border border-surface-100"
            >
              <h3 className="text-lg font-bold text-surface-800 mb-4">Activity Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Articles Read", value: "47", icon: "📖" },
                  { label: "Events Attended", value: "12", icon: "📅" },
                  { label: "Comments Made", value: "28", icon: "💬" },
                  { label: "Connections", value: user?.connections || 0, icon: "🤝" },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-surface-50 rounded-xl">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <p className="text-xl font-extrabold text-surface-800">{stat.value}</p>
                    <p className="text-xs text-surface-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
