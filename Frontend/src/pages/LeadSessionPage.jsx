import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./lead_session.css";

export default function LeadSessionPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="lead-session-container">
      {/* Hero */}
      <section className="lead-session-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">Lead a Session / Workshop</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              CHAMP 21 Co-Creative Learning Initiative
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Lead a Session */}
      <section className="lead-session-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Why Lead a Session</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">In healthcare, some of the most valuable learning comes from people who are actively working in the system—not from theory alone.</p>
              
              <div className="bg-surface-50 p-10 rounded-[3rem] border border-surface-100 italic font-medium">
                "If you have worked through challenges, made decisions, and learned from experience, you already have something valuable to share. Leading a session here is about sharing what actually works."
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Kind of Sessions */}
      <section className="lead-session-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center uppercase tracking-tighter">What Kind of Sessions You Can Lead</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Handling patient complaints & escalation",
                "Managing hospital operations",
                "Preparing teams for accreditation/audits",
                "Improving patient flow",
                "Managing staff challenges",
                "Implementing process improvements"
              ].map((item, i) => (
                <div key={i} className="session-type-card text-center">
                   <h5 className="font-black text-surface-900 text-sm">{item}</h5>
                </div>
              ))}
           </div>
           <p className="mt-12 text-center text-xs font-black text-surface-400 uppercase tracking-widest">Based on: Real experience • Clear understanding • Practical relevance</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="lead-session-section bg-white shadow-inner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center uppercase">How a CHAMP 21 Session Works</h2>
           <div className="space-y-6">
              {[
                { t: "Context Setting", d: "Explain the situation or challenge you are addressing." },
                { t: "Experience Sharing", d: "Describe how the situation was handled." },
                { t: "Approach and Thinking", d: "Explain the decisions taken and why." },
                { t: "Discussion", d: "Participants share their perspectives and questions." },
                { t: "Key Takeaways", d: "Summarize practical points that others can apply." }
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-start p-6 bg-surface-50 rounded-2xl border border-surface-100">
                   <span className="text-primary-600 font-black text-xl leading-none">0{i+1}</span>
                   <div>
                     <h5 className="font-black text-surface-900 mb-1">{step.t}</h5>
                     <p className="text-sm text-surface-500 font-medium">{step.d}</p>
                   </div>
                </div>
              ))}
           </div>
           <p className="mt-12 text-center font-bold italic text-surface-400">"Ensuring sessions are not one-way lectures, but shared learning experiences."</p>
        </div>
      </section>

      {/* Role as Session Lead */}
      <section className="lead-session-section bg-surface-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-black mb-12 uppercase">Your Role as a Session Lead</h2>
           <p className="text-xl text-surface-400 mb-16 font-medium">As a session lead, your responsibility is to guide learning, not dominate it.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Keep the discussion relevant & practical",
                "Encourage participation from members",
                "Share insights with clarity & honesty",
                "Avoid unnecessary complexity"
              ].map((item, i) => (
                <div key={i} className="p-6 border border-white/10 rounded-2xl bg-white/5 italic">
                  {item}
                </div>
              ))}
           </div>
           <p className="mt-16 text-primary-400 font-black tracking-widest uppercase text-xs animate-pulse underline underline-offset-8">Goal: Understand and Apply</p>
        </div>
      </section>

      {/* Who Can Lead */}
      <section className="lead-session-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-black text-surface-900 mb-10 uppercase tracking-tighter">Who Can Lead a Session</h2>
                 <div className="space-y-4">
                    {[
                      "Have handled real situations in healthcare",
                      "Can explain your approach clearly",
                      "Willing to engage with participants",
                      "Open to discussion and feedback"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-surface-50 rounded-xl border border-surface-100 font-bold text-surface-800 italic">
                        <span className="text-primary-600 font-black">✓</span> {item}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 bg-primary-600 p-12 rounded-[4rem] text-white shadow-2xl">
                 <h4 className="text-2xl font-black mb-6">You do not need a senior title.</h4>
                 <p className="text-surface-100 leading-relaxed font-medium mb-8 text-lg">Even early professionals can lead sessions if they bring fresh experiences and practical insights.</p>
                 <div className="h-1 w-20 bg-accent-400 rounded-full" />
              </div>
           </div>
        </div>
      </section>

      {/* Support from CHAMP 21 */}
      <section className="lead-session-section bg-surface-50 shadow-inner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">Support from CHAMP 21</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Structuring your session",
                "Refining your topic",
                "Guiding the flow of discussion",
                "Ensuring community standards"
              ].map((item, i) => (
                <div key={i} className="support-item">
                   <div className="w-8 h-8 bg-surface-900 text-white rounded-lg flex items-center justify-center font-black">⚡</div>
                   <span className="font-bold text-surface-800 text-sm">{item}</span>
                </div>
              ))}
           </div>
           <p className="text-center mt-12 text-surface-400 text-xs font-black uppercase tracking-widest italic">"We maintain consistency and quality together."</p>
        </div>
      </section>

      {/* Gain & Guidelines */}
      <section className="lead-session-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-surface-50 p-12 rounded-[3.5rem] border border-surface-200">
                 <h3 className="text-2xl font-black text-surface-900 mb-10">What You Gain</h3>
                 <ul className="space-y-6">
                    {[
                      { t: "Clarity in Thinking", d: "Explaining your approach strengthens your understanding." },
                      { t: "Confidence in Communication", d: "Learn to present ideas in a structured way." },
                      { t: "Professional Recognition", d: "Acknowledged within the community." },
                      { t: "Leadership Development", d: "Influence others’ learning." }
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-primary-700 font-black">•</span>
                        <div>
                          <p className="font-black text-surface-900">{item.t}</p>
                          <p className="text-sm text-surface-500 font-medium">{item.d}</p>
                        </div>
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="bg-white p-12 rounded-[3.5rem] border border-surface-200 shadow-xl">
                 <h3 className="text-2xl font-black text-primary-600 mb-10 uppercase tracking-tighter">Important Guidelines</h3>
                 <div className="space-y-4">
                    {[
                      "No confidential patient/hospital data",
                      "Focused on practical relevance",
                      "Avoid theoretical/outdated content",
                      "Respectful of different perspectives",
                      "Clear and responsible examples"
                    ].map((item, i) => (
                      <div key={i} className="p-5 bg-surface-50 rounded-2xl text-xs font-bold text-surface-700 border border-surface-100 flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-accent-500" />
                         {item}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="lead-session-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <h2 className="text-3xl font-black text-surface-900 mb-12">Building a more relevant, experience-driven learning ecosystem</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link to="/signup" className="btn-primary px-10 py-5 text-center">Submit Your Session Proposal</Link>
                <Link to="/contributor" className="btn-outline-dark px-10 py-5 text-center">Become a Contributor</Link>
                <Link to="/join" className="btn-outline-dark px-10 py-5 text-center">Join CHAMP</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
