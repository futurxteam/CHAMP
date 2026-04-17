import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./events_overview.css";

export default function EventsOverviewPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="ev-overview-container">
      {/* Hero */}
      <section className="ev-overview-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">EVENTS</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Focused, Dynamic, and Built Around Real Engagement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Events Matter */}
      <section className="ev-overview-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block uppercase">Why Events Matter</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">Understanding improves when professionals step beyond routine work. Events at CHAMP 21 are structured spaces for real issues and practical approaches.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                 {[
                   "Real issues discussed",
                   "Practical approaches shared",
                   "Professionals connect with purpose"
                 ].map((item, i) => (
                   <div key={i} className="p-6 bg-surface-50 rounded-2xl border border-surface-100 font-black text-xs uppercase tracking-widest text-surface-700">
                      {item}
                   </div>
                 ))}
              </div>
              <p className="text-center mt-12 text-primary-600 font-extrabold italic">"Goal: To help professionals become more capable, not just more informed."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="ev-overview-section bg-surface-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-black text-surface-900 mb-8 uppercase tracking-tighter">Upcoming Events</h2>
                 <p className="text-lg text-surface-500 mb-8 font-medium">Planned based on current challenges, member needs, and industry developments.</p>
                 <div className="space-y-4">
                    {["Case discussion sessions", "Skill-based workshops", "Hospital immersion visits", "Leadership roundtables", "Hackathons & Challenges"].map((type, i) => (
                      <div key={i} className="flex gap-4 items-center p-4 bg-white rounded-xl border border-surface-200 font-bold text-surface-800 text-sm">
                         <span className="text-primary-600 font-black">→</span> {type}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 bg-surface-900 p-12 rounded-[4rem] text-white">
                 <h4 className="text-2xl font-black mb-8 underline decoration-primary-500 decoration-4 underline-offset-8">What Each Listing Includes:</h4>
                 <ul className="space-y-4 font-bold text-surface-400 uppercase tracking-widest text-xs">
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500" /> Topic & Focus Area</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500" /> Date & Format</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500" /> Target Audience</li>
                   <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-500" /> Learning Outcomes</li>
                 </ul>
                 <p className="mt-12 text-sm italic font-medium">"Emphasis on relevance and clarity for informed participation."</p>
              </div>
           </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="ev-overview-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-black text-surface-900 mb-4 uppercase tracking-tighter">Past Events</h2>
           <p className="text-surface-500 font-medium italic mb-16 underline decoration-surface-200 underline-offset-8 decoration-2">"Reflecting the journey of a growing community."</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                { t: "Hospital Operations", d: "Structured workshops on process flow and coordination." },
                { t: "Patient Experience", d: "Discussions on expectations and ground realities." },
                { t: "Accreditation", d: "Practical sessions on quality and safety standards." },
                { t: "Meetups", d: "Local community initiatives and offline networking." }
              ].map((ev, i) => (
                <div key={i} className="event-type-card hover:bg-surface-50 group">
                   <h5 className="font-black text-surface-900 mb-2 group-hover:text-primary-600 transition-colors uppercase tracking-widest text-xs">{ev.t}</h5>
                   <p className="text-xs text-surface-500 font-medium leading-relaxed">{ev.d}</p>
                </div>
              ))}
           </div>
           <div className="mt-16 flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-surface-300">
             <span>Transparency</span> • <span>Continuity</span> • <span>Progress</span>
           </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="ev-overview-section bg-surface-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="highlight-box shadow-2xl">
              <h2 className="text-3xl font-black mb-12 uppercase tracking-widest text-center">Event Highlights</h2>
              <p className="text-surface-400 font-medium mb-16 text-center italic text-xl">"Learning from each event extends beyond those who attended."</p>
              
              <div className="space-y-12">
                 {[
                   { t: "Key Takeaways", d: "Structured summaries of the most important practical lessons discussed." },
                   { t: "Real Perspectives", d: "Reflections shared by participants and industry speakers on the ground." },
                   { t: "System Observations", d: "Shared insights on how healthcare environments are changing in real-time." }
                 ].map((item, i) => (
                   <div key={i} className="highlight-item">
                      <h4 className="text-2xl font-black mb-2">{item.t}</h4>
                      <p className="text-surface-400 font-medium italic">{item.d}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Register Section */}
      <section className="ev-overview-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 uppercase tracking-tighter">Register for Events</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                { t: "Simple Registration", d: "View available events and register based on interest and professional role." },
                { t: "Engage, Not Just Attend", d: "Members are encouraged to participate actively and share ground realities." }
              ].map((item, i) => (
                <div key={i} className="register-step">
                   <div className="w-12 h-12 bg-surface-900 text-white rounded-full flex items-center justify-center font-black flex-shrink-0 text-xl">{i+1}</div>
                   <div>
                     <h5 className="font-black text-surface-900 mb-1">{item.t}</h5>
                     <p className="text-sm text-surface-500 font-medium">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>
           <p className="mt-12 text-sm text-primary-600 font-black italic">"Post-registration: Event instructions and pre-session context are shared automatically."</p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="ev-overview-section bg-surface-50 shadow-inner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-black text-surface-900 mb-12 uppercase tracking-tighter">What Makes CHAMP 21 Events Different</h2>
           <p className="text-xl text-surface-500 mb-16 font-medium italic">"Part of a continuous learning process, not a one-time activity."</p>
           
           <div className="flex flex-wrap justify-center gap-4">
              {["Scenario-Connected", "Interactive Design", "Participant-Led Contribution", "Practical Value Focus"].map((badge, i) => (
                <span key={i} className="difference-badge">{badge}</span>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ev-overview-section bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-surface-50 p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary-600 opacity-5 rounded-br-full" />
              <h2 className="text-3xl font-black text-surface-900 mb-8 italic">"Move beyond routine work. Engage with real discussions."</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
                <Link to="/events" className="btn-primary px-10 py-5">View Upcoming Events</Link>
                <Link to="/engagement" className="btn-outline-dark px-10 py-5">Explore Activities</Link>
                <Link to="/join" className="btn-outline-dark px-10 py-5">Join CHAMP</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
