import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./contributor.css";

export default function ContributorPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="contributor-container">
      {/* Hero */}
      <section className="contributor-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white">Become a Contributor</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              CHAMP 21 Co-Creative Learning Network
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Contribution Matters */}
      <section className="contributor-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Why Contribution Matters</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">Healthcare is too dynamic today for knowledge to come from one direction. Most real learning does not come from textbooks—it comes from the ground.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <ul className="space-y-4 font-bold text-surface-800">
                  <li className="flex gap-3"><span className="text-primary-600">✦</span> Managing patient expectations</li>
                  <li className="flex gap-3"><span className="text-primary-600">✦</span> Handling operational breakdowns</li>
                  <li className="flex gap-3"><span className="text-primary-600">✦</span> Preparing for audits</li>
                  <li className="flex gap-3"><span className="text-primary-600">✦</span> Coordinating teams under pressure</li>
                </ul>
                <div className="accent-border-box">
                  <p className="italic font-medium text-surface-700">"But most of these insights remain with individuals. CHAMP 21 is built to change that—enabling you to not only learn, but to contribute to a shared body of practical knowledge."</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Can Become a Contributor */}
      <section className="contributor-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-black text-surface-900 mb-6">Who Can Become a Contributor</h2>
             <p className="text-lg text-surface-600 max-w-2xl mx-auto font-medium">You do not need a title to contribute. You need experience, intent, and clarity.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Professionals", desc: "Handled real hospital situations and operational complexities." },
                { title: "Reflective Learners", desc: "Someone who has learned through experience and deep reflection." },
                { title: "Practical Guides", desc: "Willing to share insights that can practically benefit others." },
                { title: "Open Thinkers", desc: "Open to discussion, feedback, and continuous collaborative learning." }
              ].map((item, i) => (
                <div key={i} className="contributor-card">
                   <h4 className="text-primary-700 font-black mb-4">{item.title}</h4>
                   <p className="text-sm text-surface-500 font-bold leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
           <div className="mt-16 bg-surface-900 p-10 rounded-[3rem] text-center">
              <p className="text-white text-xl font-black">Entry-level professionals, Managers, and Senior Leaders all add value in different ways.</p>
           </div>
        </div>
      </section>

      {/* What Does a Contributor Do */}
      <section className="contributor-section bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">What Does a Contributor Do</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Lead Case Discussions", desc: "Bring real scenarios (anonymized) and guide structured conversations." },
                { title: "Share Experiences", desc: "Explain how a situation was handled, what worked, and what did not." },
                { title: "Facilitate Sessions", desc: "Focused sessions on operations, quality, or team management." },
                { title: "Refine Certification", desc: "Help design or refine real-world scenarios used in assessments." },
                { title: "Mentor Members", desc: "Support early professionals in understanding their modern roles." },
                { title: "Collaborative Solving", desc: "Address real challenges brought by other community members." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-4 border-b border-surface-100 pb-8">
                   <div className="text-primary-600 font-black text-xs uppercase tracking-widest">Activity 0{i+1}</div>
                   <h4 className="text-xl font-black text-surface-800">{item.title}</h4>
                   <p className="text-surface-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* The CHAMP 21 Approach */}
      <section className="contributor-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-surface-900">
           <h2 className="text-3xl font-black mb-16 uppercase tracking-tighter">The CHAMP 21 Approach to Contribution</h2>
           <div className="flex flex-wrap justify-center gap-6">
              {["Relevance", "Clarity", "Responsibility", "Openness", "Continuous Learning"].map((item, i) => (
                <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-surface-200 shadow-sm w-full md:w-64">
                   <h4 className="font-black text-primary-600 mb-4">{item}</h4>
                   <p className="text-xs text-surface-400 font-bold uppercase tracking-widest">Core Pillar</p>
                </div>
              ))}
           </div>
           <p className="mt-16 text-surface-500 font-medium italic max-w-2xl mx-auto">This is not for theoretical sessions. Every input must reflect real, current healthcare scenarios without sensitive data sharing.</p>
        </div>
      </section>

      {/* What Contributors Gain */}
      <section className="contributor-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">What Contributors Gain</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {[
                  { t: "Deeper Clarity", d: "Explaining real situations helps you refine your own thinking." },
                  { t: "Professional Recognition", d: "Your work and insights are acknowledged within the community." },
                  { t: "Leadership Development", d: "Opportunities to guide, mentor, and take strategic initiative." },
                  { t: "Influence on Industry", d: "Your inputs help shape how others approach management." }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-surface-50 rounded-2xl border border-surface-100 flex items-start gap-4">
                    <div className="w-8 h-8 bg-surface-900 text-white rounded-lg flex items-center justify-center font-black flex-shrink-0">✓</div>
                    <div>
                      <h5 className="font-black text-surface-900">{item.t}</h5>
                      <p className="text-sm text-surface-500 font-medium">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-primary-600 p-12 rounded-[4rem] text-white shadow-2xl">
                 <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-6">Expanding Your Network</p>
                 <h4 className="text-3xl font-black leading-tight mb-8">Connect with professionals across roles, institutions, and regions.</h4>
                 <div className="h-2 w-24 bg-accent-500 rounded-full" />
              </div>
           </div>
        </div>
      </section>

      {/* How to Become a Contributor */}
      <section className="contributor-section bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-black text-surface-900 mb-16">How to Become a Contributor</h2>
           <div className="space-y-12">
              {[
                { s: "Step 01", t: "Join Membership", d: "Participate in discussions and activities." },
                { s: "Step 02", t: "Express Interest", d: "Share your area of expertise or healthcare experience." },
                { s: "Step 03", t: "Begin Small", d: "Start with guided case discussions or small group sessions." }
              ].map((step, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-8 text-left">
                   <div className="text-primary-600 font-black text-5xl opacity-20">{step.s}</div>
                   <div>
                     <h4 className="text-2xl font-black text-surface-900 mb-2">{step.t}</h4>
                     <p className="text-surface-600 font-medium">{step.d}</p>
                   </div>
                </div>
              ))}
           </div>
           <p className="mt-16 text-surface-400 font-medium uppercase tracking-[0.2em] text-xs">The community team will support you throughout</p>
        </div>
      </section>

      {/* A Different Way to Grow */}
      <section className="contributor-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black mb-16 uppercase tracking-tighter">A Different Way to Grow</h2>
           <div className="growth-visual mx-auto max-w-4xl shadow-2xl">
              <div className="relative z-10">
                <p className="text-2xl md:text-4xl font-black mb-8">When professionals share what they know, the entire system becomes stronger.</p>
                <p className="text-accent-400 font-bold uppercase tracking-widest text-sm">Beyond Outdated Systems</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-30" />
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="contributor-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl md:text-5xl font-black text-surface-900 mb-8 leading-tight">Take the Next Step</h2>
           <p className="text-xl text-surface-600 mb-16 leading-relaxed font-medium">If you believe your experience can help others, this is the right place for you.</p>
           
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <p className="text-2xl font-black text-surface-800 mb-12">Become a contributor and build a more relevant, experience-driven healthcare learning ecosystem.</p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link to="/signup" className="btn-primary px-12 py-5 text-xl text-center">Apply to Contribute</Link>
                <Link to="/join" className="btn-outline-dark px-12 py-5 text-xl text-center">Join the Community</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
