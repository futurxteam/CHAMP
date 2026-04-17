import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./insights.css";

export default function InsightsPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="insights-container">
      {/* Hero */}
      <section className="insights-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">INSIGHTS & RESOURCES</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Where Thinking Meets Real Healthcare Practice
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="insights-section bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block uppercase">Why This Section Matters</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">Healthcare is changing faster than most professionals can keep up with. Most available content repeats outdated frameworks.</p>
              
              <div className="bg-surface-50 p-12 rounded-[4rem] border border-surface-100 italic font-medium">
                "CHAMP 21 positions itself as a thinking platform—where insights are grounded in real practice, current context, and shared experience. This section is not about information. It is about clarity."
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles & Blogs */}
      <section className="insights-section bg-surface-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-black text-surface-900 mb-8 uppercase tracking-tighter">Articles & Blogs</h2>
                 <p className="text-lg text-surface-500 mb-8 font-medium">Short, focused pieces that address real questions professionals face in their day-to-day work.</p>
                 <div className="space-y-4">
                    {["Handling patient dissatisfaction", "Balancing cost and quality", "Managing coordination gaps", "Adapting management concepts"].map((topic, i) => (
                      <div key={i} className="p-4 bg-white rounded-xl border border-surface-200 font-bold text-surface-800 text-sm flex items-center gap-4">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary-600" /> {topic}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 bg-primary-600 p-12 rounded-[4rem] text-white shadow-2xl">
                 <h4 className="text-2xl font-black mb-6">Intent: Help professionals think better about what they are already dealing with.</h4>
                 <div className="space-y-3 text-sm font-bold text-surface-100 uppercase tracking-widest opacity-80">
                    <div>• Specific Issue</div>
                    <div>• Practical Perspective</div>
                    <div>• Clear Takeaways</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Real Case Studies */}
      <section className="insights-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="case-study-accent">
              <h2 className="text-3xl font-black mb-8 uppercase tracking-[0.2em] text-center underline decoration-accent-500 decoration-8 underline-offset-8">Real Case Studies (India-Focused)</h2>
              <p className="text-surface-300 font-medium mb-16 text-center italic text-xl">"Understanding real approaches and their impact, not ideal solutions."</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { t: "Patient Escalation", d: "A real complaint escalation and its structural handling." },
                   { t: "Discharge Delays", d: "System-level causes identified in Indian hospital settings." },
                   { t: "Audit Failures", d: "Corrective actions taken after accreditation setbacks." },
                   { t: "Coordination Gaps", d: "Handling staff issues in high-pressure environments." }
                 ].map((study, i) => (
                   <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all cursor-default group">
                      <h5 className="font-black text-accent-400 mb-2 group-hover:text-white transition-colors">{study.t}</h5>
                      <p className="text-xs text-surface-400 font-medium leading-relaxed">{study.d}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Industry Insights & Reports */}
      <section className="insights-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="resource-card">
                 <h3 className="text-2xl font-black text-surface-900 mb-8 border-b-2 border-primary-50 pb-4">Industry Insights</h3>
                 <p className="text-surface-500 mb-8 font-medium">Staying aware of where the system is heading and how you need to adapt.</p>
                 <div className="space-y-4">
                    {[
                      { t: "Changing Expectations", d: "Evolving patient behavior in India." },
                      { t: "Digital Impact", d: "How digital systems change hospital operations." },
                      { t: "Workforce Challenges", d: "Evolving management requirements." }
                    ].map((item, i) => (
                      <div key={i}>
                        <h5 className="font-black text-surface-900 text-sm">{item.t}</h5>
                        <p className="text-xs text-surface-400 font-bold">{item.d}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="resource-card">
                 <h3 className="text-2xl font-black text-surface-900 mb-8 border-b-2 border-primary-50 pb-4">Reports & Whitepapers</h3>
                 <p className="text-surface-500 mb-8 font-medium">Evidence-informed understanding of key healthcare system issues.</p>
                 <div className="space-y-4">
                    {[
                      "Operational Challenge Analysis",
                      "Patient Experience Trends",
                      "Quality & Safety Evaluations",
                      "System Improvement Recommendations"
                    ].map((report, i) => (
                      <div key={i} className="flex gap-4 items-center">
                         <span className="text-primary-600 font-black">📄</span>
                         <span className="font-bold text-surface-800 text-sm leading-tight">{report}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Recorded Sessions */}
      <section className="insights-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 uppercase tracking-widest">Recorded Sessions</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: "Case-Based Learning", d: "Revisit in-depth situational analysis." },
                { t: "Expert Discussions", d: "Industry leaders sharing strategic views." },
                { t: "Bootcamp Recaps", d: "Summaries of intensive skill sessions." },
                { t: "Leadership Talks", d: "Reflective conversations on management." }
              ].map((rec, i) => (
                <div key={i} className="p-8 bg-surface-50 rounded-3xl border border-surface-100 group transition-all hover:bg-surface-900 hover:border-surface-900">
                   <div className="recording-indicator group-hover:text-primary-400">🔴 Recorded</div>
                   <h5 className="font-black text-surface-900 mb-2 leading-tight group-hover:text-white transition-colors">{rec.t}</h5>
                   <p className="text-xs text-surface-400 font-bold group-hover:text-surface-300 transition-colors">{rec.d}</p>
                </div>
              ))}
           </div>
           <p className="mt-16 text-xs font-black text-surface-400 uppercase tracking-widest italic">Learn at your own pace • Practical insights • Real examples</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="insights-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 opacity-5 rounded-bl-full" />
              <h2 className="text-3xl font-black text-surface-900 mb-8">Ready to Deepen Your Thinking?</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
                <Link to="/join" className="btn-primary px-10 py-5">Join CHAMP</Link>
                <Link to="/engagement" className="btn-outline-dark px-10 py-5">Explore Activities</Link>
                <Link to="/contributor" className="btn-outline-dark px-10 py-5">Become a Contributor</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
