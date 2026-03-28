import { useState } from "react";
import NewsCard from "../components/NewsCard";
import PageHeader from "../components/PageHeader";
import { news } from "../data/news";

export default function NewsPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Research", "Technology", "Policy", "Global Health", "Regulatory", "Workforce"];

  const filteredNews = category === "All" ? news : news.filter((n) => n.category === category);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Healthcare News"
          subtitle="Stay informed with the latest breakthroughs, policy changes, and industry trends"
        />

        {/* Category Filters */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-surface-100 shadow-sm mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
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

        {/* News Feed */}
        <p className="text-sm text-surface-500 mb-6">
          Showing <span className="font-semibold text-surface-700">{filteredNews.length}</span> articles
        </p>

        <div className="space-y-3">
          {filteredNews.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
