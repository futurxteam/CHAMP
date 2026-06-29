import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EventsOverviewPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-surface-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-primary-50/40 via-white to-surface-50/50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary-200/10 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/60 border border-primary-200/50 text-primary-700 text-xs font-black uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            CHAMP Live Connect
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            Healthcare Events & Conferences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Register for virtual roundtables, local city meetups, and process audit bootcamps led by senior medical administrators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link to="/events" className="btn-primary font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all">
              Browse Upcoming Events
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Events Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Upcoming Engagements</h2>
            <p className="text-surface-500 font-medium mt-3">Interactive sessions structured around present-day healthcare coordination demands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Digital Health Summit 2026",
                date: "July 12, 2026",
                format: "Virtual (Zoom)",
                category: "Conference",
                thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
              },
              {
                title: "Hospital Operations Roundtable: Post-Pandemic Scaling",
                date: "July 28, 2026",
                format: "In-Person (Bengaluru)",
                category: "Roundtable",
                thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop"
              },
              {
                title: "Clinical Leadership Seminar & Networking",
                date: "August 10, 2026",
                format: "Virtual (Teams)",
                category: "Workshop",
                thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop"
              }
            ].map((evt, i) => (
              <div key={i} className="group rounded-[2.5rem] bg-surface-50 border border-surface-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={evt.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-primary-600 text-white text-[9px] font-black uppercase tracking-wider">
                      {evt.category}
                    </span>
                  </div>
                  <div className="p-8">
                    <span className="text-[9px] text-surface-400 font-bold uppercase tracking-widest block mb-2">{evt.date}</span>
                    <h3 className="text-base font-black text-surface-900 mb-4 leading-snug">{evt.title}</h3>
                    <p className="text-xs text-surface-500 font-medium">{evt.format}</p>
                  </div>
                </div>

                <div className="p-8 pt-0 mt-4">
                  <Link to="/events" className="w-full block py-4 bg-surface-900 text-white rounded-2xl hover:bg-surface-800 font-black text-xs uppercase tracking-widest text-center transition-all">
                    Register For Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Featured Panels & Speakers</h2>
            <p className="text-surface-500 font-medium mt-3">Learn from certified practitioners directing major clinical operations networks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Dr. Jacob Varghese", role: "Quality Director", org: "City Health Link", avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop" },
              { name: "Ananya Iyer, CHM", role: "COO Operations", org: "Metro Care Solutions", avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=100&h=100&fit=crop" },
              { name: "Dr. Rajesh Kurup", role: "CMO Strategic Clinicals", org: "AHERF Group", avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop" },
              { name: "Amit Verma", role: "Digital Systems VP", org: "MedLife Integrations", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" }
            ].map((speaker, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white border border-surface-200 text-center">
                <img src={speaker.avatar} className="w-16 h-16 rounded-full object-cover mx-auto mb-4 shadow-sm" alt="" />
                <h4 className="text-sm font-black text-surface-900 mb-1">{speaker.name}</h4>
                <p className="text-[10px] text-surface-500 font-bold uppercase tracking-wider">{speaker.role}</p>
                <p className="text-[9px] text-primary-600 font-bold uppercase tracking-widest mt-1">{speaker.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events History */}
      <section className="py-20 bg-white border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Recent Sessions Retrospective</h2>
            <p className="text-surface-500 font-medium mt-3">Browse presentation slides and documented notes from past community meetups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "OPD Flow & Queue Optimization Bootcamp", desc: "A 3-hour deep dive review on waiting list bottlenecks in pediatric wards.", date: "June 12, 2026" },
              { title: "Emergency Triage Under NABH audits", desc: "Practical compliance checklists and safety drill parameters.", date: "May 28, 2026" }
            ].map((pEv, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-surface-50 border border-surface-200">
                <span className="text-[9px] text-surface-400 font-black uppercase tracking-widest block mb-2">{pEv.date}</span>
                <h4 className="text-base font-black text-surface-900 mb-3">{pEv.title}</h4>
                <p className="text-xs text-surface-500 font-medium leading-relaxed mb-6">{pEv.desc}</p>
                <Link to="/join" className="text-xs font-black text-primary-600 uppercase tracking-widest hover:text-primary-700">
                  Access Notes →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface-50 border-t border-surface-200/50 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Looking to host a session?</h2>
          <p className="text-sm text-surface-500 font-medium max-w-lg mx-auto leading-relaxed">
            Certified L2 & L3 operators are encouraged to lead workshops and operations roundtables.
          </p>
          <div className="pt-4">
            <Link to="/lead-session" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              Apply to Lead Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
