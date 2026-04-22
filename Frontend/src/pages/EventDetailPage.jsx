import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";

export default function EventDetailPage() {
  const { id } = useParams();
  const { registeredEvents, registerForEvent, user, isAuthenticated, getAuthHeaders } = useStore();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`, {
          headers: getAuthHeaders(),
        });
        const data = await response.json();
        if (response.ok) {
          setEvent(data);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, isAuthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary-100 mb-4" />
          <div className="h-4 w-32 bg-surface-200 rounded" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-surface-700 mb-2">Event not found</h2>
          <Link to="/events" className="text-primary-600 hover:underline">Back to events</Link>
        </div>
      </div>
    );
  }

  const isRegistered = registeredEvents.includes(event.id || event._id);
  const isRestricted = !event.fullDetails;
  const canAccess = !event.isPremium || user?.isPremium;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-surface-500 mb-6">
          <Link to="/events" className="hover:text-primary-600 transition-colors">Events</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-surface-700 font-medium truncate">{event.title}</span>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-8"
        >
          <img 
            src={event.thumbnail || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"} 
            alt={event.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-2 mb-3">
              {event.isPremium ? (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full">✦ Premium</span>
              ) : (
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent-500 text-white rounded-full">Free</span>
              )}
              <span className="px-3 py-1 text-xs font-medium bg-white/90 text-surface-700 rounded-full">{event.category}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{event.title}</h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-surface-100"
            >
              <h2 className="text-xl font-bold text-surface-800 mb-4">About This Event</h2>
              <p className="text-surface-600 leading-relaxed mb-6">{event.description}</p>

              <div className="relative">
                <div className={`${isRestricted ? "blur-md select-none pointer-events-none" : ""}`}>
                  <h3 className="text-lg font-bold text-surface-800 mb-3">Speakers</h3>
                  <div className="space-y-3 mb-6">
                    {(event.speakers || ["Dr. Panel Speaker", "Prof. Keynote"]).map((speaker, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">
                          {speaker.split(" ").map(w => w[0]).join("")}
                        </div>
                        <span className="font-medium text-surface-700 text-sm">{speaker}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-surface-800 mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {(event.learnings || ["Latest research and innovations", "Practical techniques", "Networking opportunities"]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-surface-600">
                        <svg className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  {event.fullDetails && (
                    <div className="mt-8 pt-8 border-t border-surface-100">
                      <h3 className="text-lg font-bold text-surface-800 mb-4">Event Schedule & Details</h3>
                      <div className="prose prose-surface prose-sm max-w-none text-surface-600">
                        {event.fullDetails}
                      </div>
                    </div>
                  )}
                </div>

                {isRestricted && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[1px] p-6 text-center rounded-2xl">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-surface-900 mb-2">Member Exclusive Details</h4>
                    <p className="text-sm text-surface-600 mb-6 max-w-xs mx-auto">
                      Join CHAMP to view speaker bios, full event schedules, and learning outcomes.
                    </p>
                    <Link
                      to="/login"
                      className="px-6 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700 transition-all shadow-md shadow-primary-500/10"
                    >
                      Sign In to Unlock
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-surface-100 sticky top-24"
            >
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Date</p>
                    <p className="text-sm font-semibold text-surface-700">
                      {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Time</p>
                    <p className="text-sm font-semibold text-surface-700">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Location</p>
                    <p className="text-sm font-semibold text-surface-700">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-surface-500">Attendees</p>
                    <p className="text-sm font-semibold text-surface-700">{event.attendees}+ registered</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-surface-100 pt-4 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-surface-500">Price</span>
                  <span className="text-2xl font-extrabold text-surface-800">{event.price}</span>
                </div>
              </div>

              {event.isPremium && !canAccess ? (
                <div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 mb-3">
                    <p className="text-xs text-amber-700 text-center">
                      ✦ This is a Premium event. <Link to="/pricing" className="font-semibold underline">Upgrade</Link> to register.
                    </p>
                  </div>
                  <Link
                    to="/pricing"
                    className="block w-full py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl hover:shadow-lg transition-all"
                  >
                    Upgrade to Premium
                  </Link>
                </div>
              ) : isRegistered ? (
                <div className="w-full py-3 text-center text-sm font-semibold text-accent-700 bg-accent-50 rounded-xl border border-accent-100">
                  ✓ You're registered!
                </div>
              ) : (
                <button
                  onClick={() => registerForEvent(event.id)}
                  className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 transition-all"
                >
                  Register Now
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
