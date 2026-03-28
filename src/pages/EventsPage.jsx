import { useState } from "react";
import useStore from "../store/useStore";
import EventCard from "../components/EventCard";
import PageHeader from "../components/PageHeader";
import { events } from "../data/events";

export default function EventsPage() {
  const { registeredEvents, registerForEvent } = useStore();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = ["All", "Free", "Premium", "Conference", "Workshop", "Virtual"];

  const filteredEvents = events.filter((e) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Free" && !e.isPremium) ||
      (filter === "Premium" && e.isPremium) ||
      (filter === "Virtual" && e.location.toLowerCase().includes("virtual")) ||
      e.category === filter;
    const matchesSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Events"
          subtitle="Discover conferences, workshops, and networking opportunities in healthcare"
        />

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-surface-100 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 text-sm text-surface-800 placeholder-surface-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex overflow-x-auto pb-2 -mb-2 no-scrollbar md:flex-wrap gap-2 mt-4">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  filter === f
                    ? "bg-primary-600 text-white shadow-md shadow-primary-500/25"
                    : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-surface-500">
            Showing <span className="font-semibold text-surface-700">{filteredEvents.length}</span> events
          </p>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isRegistered={registeredEvents.includes(event.id)}
                onRegister={registerForEvent}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-surface-700 mb-2">No events found</h3>
            <p className="text-sm text-surface-500">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
