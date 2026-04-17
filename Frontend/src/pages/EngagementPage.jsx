import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./engagement.css";

export default function EngagementPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="engagement-container">
      {/* Hero */}
      <section className="engagement-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">LEARNING & ENGAGEMENT</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Practical, Current, and Continuously Evolving
            </p>
          </motion.div>
        </div>
      </section>

      {/* Learning Philosophy */}
      <section className="engagement-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-surface-900 mb-6 uppercase tracking-tighter">Learning Philosophy (Practical + Co-Created)</h2>
            <p className="text-xl text-surface-500 max-w-3xl mx-auto font-medium italic">"Healthcare administration cannot be mastered through theory alone. Most professionals already know concepts—the challenge is application."</p>
          </div>
          
          <div className="philosophy-split">
            <div className="bg-surface-50 p-12 rounded-[3.5rem] border border-surface-100">
               <h4 className="text-2xl font-black text-surface-900 mb-6 underline decoration-primary-300 decoration-8 underline-offset-8">Relevance to the Present</h4>
               <p className="text-surface-600 leading-relaxed font-medium mb-8">Learning must reflect today’s environment—patient expectations, operational pressures, accreditation demands, and system constraints.</p>
               <div className="flex flex-wrap gap-2 text-xs font-black text-primary-600 uppercase tracking-widest">
                 <span>Practical</span> • <span>Contextual</span> • <span>Evolving</span>
               </div>
            </div>
            <div className="bg-surface-900 p-12 rounded-[3.5rem] text-white">
               <h4 className="text-2xl font-black mb-6">Co-Creation of Knowledge</h4>
               <p className="text-surface-400 leading-relaxed font-medium mb-8">Learning is not delivered from one direction. It is built through shared experiences where professionals bring real situations, discuss approaches, and learn from collective outcomes.</p>
               <div className="w-12 h-1 bg-accent-500 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Structured Learning Models */}
      <section className="engagement-section bg-surface-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[
                { t: "Skill Bootcamps", d: "Focused, intensive learning experiences to build competencies in Hospital Ops, Quality, Safety, and HR Coordination.", badge: "Intensive" },
                { t: "Case-Based Sessions", d: "Learning begins with situations—escalations, discharge process breakdowns, or poor coordination—identifying root causes together.", badge: "Real Scenarios" },
                { t: "Simulation Workshops", d: "Time-bound replicas of real operational disruptions, testing decision-making and prioritization under pressure.", badge: "High Pressure" },
                { t: "Mentorship Circles", d: "Small, led groups where mentors improve thinking and clarity rather than just giving direct answers.", badge: "Guided" }
              ].map((item, i) => (
                <div key={i} className="learning-card">
                   <div className="module-badge">{item.badge}</div>
                   <h4 className="text-2xl font-black text-surface-900 mb-4">{item.t}</h4>
                   <p className="text-surface-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Project-Based & Micro-Learning */}
      <section className="engagement-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div>
                 <h2 className="text-3xl font-black text-surface-900 mb-12 uppercase tracking-tighter">Project-Based Learning</h2>
                 <p className="text-surface-500 mb-10 font-bold italic">"Real learning happens when professionals work on real problems."</p>
                 <div className="space-y-8">
                    {[
                      { t: "Small Formed Teams", d: "Members work on specific challenges like OPD flow or waiting time reduction." },
                      { t: "Execution & Feedback", d: "Trials and initiatives run over a defined period with mentor support." },
                      { t: "Documentation & Sharing", d: "Outcomes are presented and documented for the entire community." }
                    ].map((step, i) => (
                      <div key={i} className="project-step">
                         <h5 className="font-black text-surface-900 mb-1 leading-tight">{step.t}</h5>
                         <p className="text-sm text-surface-500 font-medium">{step.d}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-surface-50 p-12 rounded-[4rem] border border-surface-100 shadow-sm">
                 <h2 className="text-3xl font-black text-surface-900 mb-12 uppercase tracking-tighter">Micro-Learning Modules</h2>
                 <p className="text-surface-500 mb-10 font-medium">Short, focused sessions designed for quick understanding without overwhelming schedules.</p>
                 <div className="space-y-4">
                    {["Handling Patient Escalation", "Basics of Audit Preparation", "Communication in Critical Situations"].map((module, i) => (
                      <div key={i} className="p-5 bg-white rounded-2xl border border-surface-200 flex items-center gap-4 text-surface-900 font-black text-sm">
                         <div className="w-2 h-2 rounded-full bg-primary-600" />
                         {module}
                      </div>
                    ))}
                 </div>
                 <p className="mt-8 text-xs font-black text-surface-400 uppercase tracking-widest text-center">Clarity and Applicability in 15 mins</p>
              </div>
           </div>
        </div>
      </section>

      {/* Activities & Engagements Overview */}
      <section className="engagement-section bg-surface-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">ACTIVITIES & ENGAGEMENTS</h2>
           <p className="text-xl text-surface-400 mb-12 font-medium">CHAMP 21 is an active ecosystem connecting real environments, people, and challenges.</p>
           <div className="w-16 h-px bg-white/20 mx-auto" />
           <p className="mt-12 text-lg text-accent-400 font-bold uppercase tracking-widest italic">Where the Community Comes to Life</p>
        </div>
      </section>

      {/* Activity Grid */}
      <section className="engagement-section bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="activity-grid">
              {[
                { t: "Hospital Immersion Visits", d: "Direct exposure to functioning departments, workflows, and coordination in practice." },
                { t: "City Meetups", d: "Small gatherings for local networking and solving specific daily operational challenges." },
                { t: "Leadership Roundtables", d: "Insight into strategic higher-level thinking, trends, and complex system management." },
                { t: "Hackathons", d: "Collaborative problem-solving where teams develop practical solutions for hospital challenges." },
                { t: "Community Initiatives", d: "Engagement in health awareness and outreach to understand ground patient realities." },
                { t: "Annual Summit", d: "Large-scale gathering for networking, case presentations, and industry recognition." }
              ].map((activity, i) => (
                <div key={i} className="activity-card group">
                   <h4 className="text-xl font-black text-surface-900 mb-4 transition-colors">{activity.t}</h4>
                   <p className="text-sm text-surface-500 font-medium leading-relaxed transition-colors">{activity.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="engagement-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <h2 className="text-3xl font-black text-surface-900 mb-8">Participate, Learn, and Lead</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link to="/contribute-signup" className="btn-primary px-10 py-5">Lead a Session</Link>
                <Link to="/join" className="btn-outline-dark px-10 py-5">Join CHAMP</Link>
                <Link to="/certification-assessment" className="btn-outline-dark px-10 py-5">Explore Certification</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
