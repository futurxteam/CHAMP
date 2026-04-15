import { useState, useEffect } from "react";
import useStore from "../store/useStore";
import BlogCard from "../components/BlogCard";
import PageHeader from "../components/PageHeader";

const blogCategories = ["All", "General", "Technology", "Wellness", "Clinical", "Research"];

export default function BlogsPage() {
  const { likedBlogs, toggleBlogLike, toggleBlogBookmark, user, getAuthHeaders, isAuthenticated } = useStore();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/blogs", {
          headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (response.ok) {
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [isAuthenticated]);

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = category === "All" || b.category === category;
    const matchesSearch =
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Community & Blogs"
          subtitle="Expert articles, research insights, and community discussions"
        />

        {/* Search + Category Filters */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-surface-100 shadow-sm mb-8">
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 text-sm text-surface-800 placeholder-surface-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
            />
          </div>
          <div className="flex overflow-x-auto pb-2 -mb-2 no-scrollbar md:flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  category === cat
                    ? "bg-primary-600 text-white shadow-md shadow-primary-500/25"
                    : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-surface-500 mb-6">
          {loading ? "Searching for articles..." : `Showing ${filteredBlogs.length} articles`}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-surface-100 animate-pulse border border-surface-200" />
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id || blog._id}
                blog={blog}
                isLiked={likedBlogs.includes(blog.id || blog._id)}
                isBookmarked={user?.savedBlogs?.includes(blog.id || blog._id)}
                onLike={toggleBlogLike}
                onBookmark={toggleBlogBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-surface-700 mb-2">No articles found</h3>
            <p className="text-sm text-surface-500">Try a different category or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
