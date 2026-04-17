import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./community_ecosystem.css";

export default function CommunityEcosystemPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="ecosystem-container">
      {/* Hero */}
      <section className="ecosystem-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">COMMUNITY</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              A Living Ecosystem for Healthcare Administration Professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Community Overview */}
      <section className="ecosystem-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Community Overview</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">CHAMP 21 is not a directory of professionals. It is a working ecosystem.</p>
              
              <p>Healthcare today is too dynamic for professionals to operate in isolation. Decisions are interconnected. Challenges are recurring. Solutions are often contextual.</p>
              <p className="italic font-medium border-l-4 border-primary-100 pl-8 my-8">"This community exists to connect those insights and make them usable."</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                {[
                  "Discuss real situations they are facing",
                  "Learn how others approach challenges",
                  "Build structured thinking through shared experiences",
                  "Stay aligned with 21st century realities"
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-surface-50 rounded-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-600" />
                    <span className="text-sm font-bold text-surface-800">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-center mt-12 font-black text-xs uppercase tracking-widest text-surface-400 italic">"It is about building relevance, clarity, and capability through continuous engagement."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="ecosystem-section bg-surface-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-black text-surface-900 mb-12 uppercase tracking-tighter">Who Can Join</h2>
                 <p className="text-lg text-surface-500 mb-8 font-medium">Open to individuals connected to healthcare administration willing to actively engage.</p>
                 <div className="space-y-3">
                    {["Early professional / Student", "Hospital executive (Ops/Coordination)", "Department manager", "Quality, HR or Admin professional", "Senior leader / CXO", "Transitioning into healthcare mgmt"].map((role, i) => (
                      <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-xl border border-surface-200">
                         <span className="text-primary-600 font-black">✓</span>
                         <span className="font-bold text-surface-800 text-sm">{role}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 bg-surface-900 p-12 rounded-[4rem] text-white">
                 <h4 className="text-2xl font-black mb-8 underline decoration-primary-500 decoration-4 underline-offset-8">What Matters More</h4>
                 <p className="text-surface-400 font-bold uppercase tracking-widest text-xs mb-8">It's not your title, but your intent:</p>
                 <ul className="space-y-6 text-xl italic font-medium">
                   <li>Willingness to learn</li>
                   <li>Openness to share</li>
                   <li>Interest in real-world challenges</li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="ecosystem-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-black text-surface-900 mb-16">How the Community Works</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                { t: "Regular Engagements", d: "Scenario discussions, case analysis, offline & online activities." },
                { t: "Problem-Centered", d: "Conversations built around real issues, not abstract topics." },
                { t: "Cross-Level Interaction", d: "Interaction across all stages for broader system understanding." },
                { t: "Ongoing Participation", d: "Consistent involvement increases value over time." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-surface-50 rounded-[2.5rem] border border-surface-100">
                   <h5 className="font-black text-surface-900 mb-2">{item.t}</h5>
                   <p className="text-sm text-surface-500 font-medium">{item.d}</p>
                </div>
              ))}
           </div>
           <p className="mt-16 text-primary-600 font-black italic">"This is not a platform you visit occasionally. It is a space you grow within."</p>
        </div>
      </section>

      {/* Co-Creation Model */}
      <section className="ecosystem-section bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-xl">
             <h2 className="text-3xl font-black text-surface-900 mb-8 text-center">Co-Creation Model (Learn + Contribute)</h2>
             <div className="space-y-8 text-surface-600 font-medium text-lg leading-relaxed">
                <p>Traditional models separate roles—some teach, others learn. In real healthcare, learning happens differently. CHAMP 21 removes that separation.</p>
                <div className="flex flex-col md:flex-row gap-8 py-10 border-y border-surface-100">
                   <div className="flex-1 text-center">
                      <span className="stat-num">EVERY</span>
                      <span className="stat-label">Member Learns</span>
                   </div>
                   <div className="w-px bg-surface-200 hidden md:block" />
                   <div className="flex-1 text-center">
                      <span className="stat-num">EVERY</span>
                      <span className="stat-label">Member Contributes</span>
                   </div>
                </div>
                <div className="italic text-surface-500 text-sm">
                   Example: Junior shares a problem → Manager shares similar experience → Senior adds refinement and strategic perspective.
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Member Roles */}
      <section className="ecosystem-section bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-4 text-center">Member Roles</h2>
           <p className="text-center text-surface-500 font-medium italic mb-16">Roles are not fixed. They evolve as professionals grow.</p>
           
           <div className="role-grid">
              {[
                { t: "Learners", d: "Observe discussions, ask questions, build clarity in system functions and structured thinking.", type: "start" },
                { t: "Contributors", d: "Share real experiences, participate in problem-solving, support others with practical clarity.", type: "evolve" },
                { t: "Mentors", d: "Guiding through strategic perspective and practical direction in complex decision-making.", type: "leader" }
              ].map((role, i) => (
                <div key={i} className={`role-card ${role.type === 'leader' ? 'mentor' : ''}`}>
                   <span className="text-[10px] font-black tracking-[0.3em] text-surface-400 uppercase mb-4 block">Position 0{i+1}</span>
                   <h4 className="text-2xl font-black text-surface-900 mb-6 uppercase tracking-tighter">{role.t}</h4>
                   <p className="text-sm text-surface-500 font-bold leading-relaxed">{role.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="ecosystem-section bg-surface-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center underline decoration-accent-500 decoration-8 underline-offset-8">Community Guidelines</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { t: "Respect Privacy", d: "No sharing of confidential patient or institutional info." },
                { t: "Constructive Participation", d: "Aim to add clarity and value, not criticism without direction." },
                { t: "Relevance", d: "Focus on real, current healthcare scenarios." },
                { t: "Consistency", d: "Active participation is encouraged to gain full value." }
              ].map((item, i) => (
                <div key={i} className="guideline-item">
                   <div className="w-10 h-10 bg-surface-900 text-white rounded-full flex items-center justify-center font-black flex-shrink-0">{i+1}</div>
                   <div>
                     <h5 className="font-black text-surface-900 mb-1">{item.t}</h5>
                     <p className="text-xs text-surface-500 font-medium">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Member Stories */}
      <section className="ecosystem-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-20 uppercase tracking-tighter">Member Stories</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { p: "Early Professional", s: "I understood how hospitals actually function only after being part of discussions here. It helped me connect theory with real practice." },
                { p: "Mid-Level Manager", s: "Listening to how others handled similar challenges helped me improve my own decision-making." },
                { p: "Senior Professional", s: "It is a space where experiences are shared honestly. It also helps me stay connected with ground-level realities." }
              ].map((story, i) => (
                <div key={i} className="story-bubble">
                   <p className="text-surface-700 font-bold italic mb-8 relative z-10">{story.s}</p>
                   <div className="h-px w-12 bg-surface-200 mx-auto mb-4" />
                   <p className="text-xs font-black uppercase tracking-widest text-primary-600">{story.p}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="ecosystem-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <h2 className="text-3xl font-black text-surface-900 mb-8">Join the Ecosystem</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link to="/join-community" className="btn-primary px-10 py-5">Join the Community</Link>
                <Link to="/register-certification" className="btn-outline-dark px-10 py-5">Begin Assessment</Link>
                <Link to="/contributor" className="btn-outline-dark px-10 py-5">Become a Contributor</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
