import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import EventCard from "../components/EventCard";
import BlogCard from "../components/BlogCard";
import UserCard from "../components/UserCard";
import NewsCard from "../components/NewsCard";

export default function HomePage() {
  const { user, registeredEvents, registerForEvent, likedBlogs, toggleBlogLike, toggleBlogBookmark, getAuthHeaders, isAuthenticated } = useStore();
  
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = getAuthHeaders();
        const [blogsRes, eventsRes, newsRes, usersRes] = await Promise.all([
          fetch("http://localhost:5000/api/blogs", { headers }),
          fetch("http://localhost:5000/api/events", { headers }),
          fetch("http://localhost:5000/api/news"),
          fetch("http://localhost:5000/api/users", { headers })
        ]);

        const [blogsData, eventsData, newsData, usersData] = await Promise.all([
          blogsRes.json(),
          eventsRes.json(),
          newsRes.json(),
          usersRes.json()
        ]);

        setBlogs(Array.isArray(blogsData) ? blogsData : []);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setNews(Array.isArray(newsData) ? newsData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const suggestedUsers = users.slice(0, 4);
  const upcomingEvents = events.slice(0, 3);
  const featuredBlogs = blogs.slice(0, 3);
  const latestNews = news.slice(0, 4);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-6 sm:p-8 md:p-12 mb-8 sm:mb-10"
        >
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent-500/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary-300/20 blur-3xl" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-white/5" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight"
              >
                {user ? `Welcome back, ${user.name.split(" ")[0]} 👋` : "Welcome to CHAMP 🏥"}
              </motion.h1>
              <p className="text-primary-100/90 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
                {user 
                  ? <>Stay updated with the latest in healthcare innovation. You have <span className="text-accent-300 font-bold">3 new notifications</span> and <span className="text-accent-300 font-bold">2 upcoming events</span>.</>
                  : "Join the premier community for healthcare professionals to connect, learn, and transform the future of medicine together."
                }
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/events"
                className="px-6 py-2.5 bg-white text-primary-700 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 transition-all text-center"
              >
                Browse Events
              </Link>
              <Link
                to="/blogs"
                className="px-6 py-2.5 bg-white/15 backdrop-blur-sm text-white font-bold text-sm rounded-xl border border-white/20 hover:bg-white/25 transition-all text-center"
              >
                Read Articles
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Community Members", value: "10,200+", icon: "👥", color: "from-blue-500 to-blue-600" },
            { label: "Events This Month", value: "24", icon: "📅", color: "from-emerald-500 to-emerald-600" },
            { label: "Articles Published", value: "1,450+", icon: "📝", color: "from-purple-500 to-purple-600" },
            { label: "Countries Reached", value: "85+", icon: "🌍", color: "from-amber-500 to-orange-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-2xl p-5 border border-surface-100 hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-extrabold text-surface-800">{stat.value}</p>
              <p className="text-xs text-surface-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Loading State or Content */}
        {loading ? (
          <div className="space-y-12 animate-pulse">
            <div className="h-48 bg-surface-100 rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-64 bg-surface-100 rounded-2xl" />)}
            </div>
          </div>
        ) : (
          <>
            {/* Upcoming Events */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-surface-800">Upcoming Events</h2>
                  <p className="text-sm text-surface-500 mt-1">Don't miss these opportunities to learn and connect</p>
                </div>
                <Link to="/events" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 group">
                  View all
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event._id || event.id}
                    event={event}
                    isRegistered={registeredEvents.includes(event._id || event.id)}
                    onRegister={registerForEvent}
                  />
                ))}
              </div>
            </section>

            {/* Featured Articles */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-surface-800">Featured Articles</h2>
                  <p className="text-sm text-surface-500 mt-1">Expert insights from the healthcare community</p>
                </div>
                <Link to="/blogs" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 group">
                  View all
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredBlogs.map((blog) => (
                  <BlogCard
                    key={blog._id || blog.id}
                    blog={blog}
                    isLiked={likedBlogs.includes(blog._id || blog.id)}
                    isBookmarked={user?.savedBlogs?.includes(blog._id || blog.id)}
                    onLike={toggleBlogLike}
                    onBookmark={toggleBlogBookmark}
                  />
                ))}
              </div>
            </section>

            {/* Two Column: News + Connections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Latest News */}
              <section className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-surface-800">Healthcare News</h2>
                    <p className="text-sm text-surface-500 mt-1">Stay informed with the latest developments</p>
                  </div>
                  <Link to="/news" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 group">
                    View all
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="space-y-3">
                  {latestNews.map((item, i) => (
                    <NewsCard key={item._id || item.id} item={item} index={i} />
                  ))}
                </div>
              </section>

              {/* Suggested Connections */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-surface-800">Connect</h2>
                  <p className="text-sm text-surface-500 mt-1">People you may know</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  {suggestedUsers.map((u) => (
                    <UserCard key={u._id || u.id} user={u} />
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
