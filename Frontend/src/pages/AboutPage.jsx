import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./about.css";

export default function AboutPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="about-container">
      {/* Hero */}
      <section className="about-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white">ABOUT CHAMP 21</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Certified Healthcare Administration and Management Professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Our Story</h2>
            <h3 className="text-2xl font-black text-surface-800 mb-8">Why CHAMP 21 Was Created</h3>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left">
              <p>Healthcare in India has grown rapidly in the last two decades. Hospitals have expanded, technology has advanced, and patient awareness has increased. But one important aspect has not evolved at the same pace: <span className="text-surface-900 font-black italic">The way healthcare administration professionals are prepared.</span></p>
              
              <div className="story-accent">
                "Many professionals face real situations—patient escalation, operational delays, audit pressures—and often have to learn through trial and error. CHAMP 21 was created to address this gap."
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  "Learning based on real-world scenarios",
                  "Prepared for current realities, not past models",
                  "Knowledge built collectively"
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-surface-50 rounded-2xl border border-surface-100 font-bold text-sm text-surface-800">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="about-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="mission-card">
                 <h2 className="text-3xl font-black text-primary-600 mb-6 uppercase tracking-tighter">Vision</h2>
                 <p className="text-xl font-bold text-surface-700 leading-relaxed">
                   To build a national network of healthcare administration and management professionals who are prepared, adaptable, and capable of handling the realities of the 21st century healthcare system.
                 </p>
              </div>
              <div className="mission-card">
                 <h2 className="text-3xl font-black text-primary-600 mb-6 uppercase tracking-tighter">Mission</h2>
                 <ul className="space-y-4 text-surface-600 font-medium">
                   {[
                     "Move beyond outdated frameworks and approaches",
                     "Develop practical decision-making ability",
                     "Learn continuously through real-world exposure",
                     "Contribute to a shared ecosystem of knowledge",
                     "Strengthen healthcare systems through better management"
                   ].map((text, i) => (
                     <li key={i} className="flex gap-4">
                       <span className="text-accent-500 font-black">→</span>
                       {text}
                     </li>
                   ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="about-section bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 mb-12 uppercase">The CHAMP 21 Philosophy</h2>
          <p className="text-lg text-surface-600 leading-relaxed font-medium italic mb-12">"Healthcare cannot be managed effectively today using approaches that were designed for a different time."</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
             <div className="p-8 bg-surface-900 text-white rounded-[2rem] flex-1 font-black text-sm uppercase tracking-[0.2em] shadow-xl">Relevance over tradition</div>
             <div className="p-8 bg-primary-600 text-white rounded-[2rem] flex-1 font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary-500/30">Participation over passive learning</div>
          </div>
        </div>
      </section>

      {/* Moving Beyond */}
      <section className="about-section bg-surface-50 shadow-inner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200">
             <h2 className="text-3xl font-black text-surface-900 mb-12 text-center underline decoration-primary-300 decoration-8 underline-offset-8">Moving Beyond 20th Century Thinking</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                   <p className="text-surface-600">While traditional concepts provide a foundation, today’s healthcare presents new challenges:</p>
                   <div className="grid grid-cols-1 gap-3">
                     {[
                       "Increased patient awareness & expectations",
                       "Greater regulatory/accreditation requirements",
                       "Rapid technology integration",
                       "Focus on quality, cost, and efficiency"
                     ].map((item, i) => (
                       <div key={i} className="flex items-center gap-4 bg-surface-50 p-4 rounded-xl border border-surface-100">
                         <div className="w-2 h-2 rounded-full bg-primary-600" />
                         <span className="text-sm font-bold text-surface-800">{item}</span>
                       </div>
                     ))}
                   </div>
                </div>
                <div className="space-y-6">
                  <p className="font-black text-surface-900 uppercase tracking-widest text-xs opacity-50">Our Encouragement:</p>
                  <ul className="space-y-4 text-surface-700 italic font-medium text-lg border-l-4 border-surface-900 pl-8">
                    <li>Re-examine traditional approaches</li>
                    <li>Adapt them to current realities</li>
                    <li>Develop new ways of thinking</li>
                  </ul>
                  <p className="text-xs font-black text-surface-400 mt-8">"This is not about rejecting the past. It is about ensuring relevance in the present."</p>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Co-Creative Model */}
      <section className="about-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-black text-surface-900 mb-6">Co-Creative Learning Model</h2>
             <p className="text-xl text-surface-500 max-w-2xl mx-auto font-medium italic">"Knowledge evolves continuously through participation."</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { actor: "Junior Professional", action: "Raise a real issue from the ground" },
                { actor: "Department Manager", action: "Share how a similar situation was handled" },
                { actor: "Senior Leader", action: "Add strategic perspective and direction" }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-surface-50 rounded-[3rem] border border-surface-100">
                   <div className="step-label">{item.actor}</div>
                   <p className="font-bold text-surface-800 leading-relaxed">{item.action}</p>
                </div>
              ))}
           </div>

           <div className="mt-20 p-12 bg-surface-900 rounded-[4rem] text-white text-center">
              <h4 className="text-2xl font-black mb-10 leading-snug">Learning becomes: Continuous, collaborative, and grounded in real practice.</h4>
              <div className="flex flex-wrap justify-center gap-8">
                {["Relevant", "Inclusive", "Open"].map((attr, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                    <span className="font-black text-sm uppercase tracking-widest">{attr}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* Leadership & Network */}
      <section className="about-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-white p-12 rounded-[4rem] border border-surface-200 shadow-xl">
                 <h3 className="text-2xl font-black text-surface-900 mb-8 border-b-2 border-primary-100 pb-4">Leadership & Core Team</h3>
                 <p className="text-surface-600 mb-8 leading-relaxed font-medium">Guided by professionals who understand both the academic and operational sides of healthcare.</p>
                 <div className="team-list">
                    {["Hospital Admin", "Management Edu", "Quality & Safety", "Ops Development"].map((item, i) => (
                      <span key={i} className="team-badge">{item}</span>
                    ))}
                 </div>
                 <p className="mt-8 text-xs font-black text-surface-400 uppercase tracking-widest">Focusing on responsibility and direction</p>
              </div>
              <div className="bg-white p-12 rounded-[4rem] border border-surface-200 shadow-xl">
                 <h3 className="text-2xl font-black text-surface-900 mb-8 border-b-2 border-primary-100 pb-4">Advisory Network</h3>
                 <p className="text-surface-600 mb-8 leading-relaxed font-medium">Supported by an experienced network of administrators, industry experts, and academic leaders.</p>
                 <div className="space-y-4">
                    {[
                      "Providing strategic guidance",
                      "Validating certification direction",
                      "Sharing emerging trends",
                      "Strengthening industry connections"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 text-sm font-bold text-surface-700">
                        <span className="text-primary-600">✓</span>
                        {item}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="about-section bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl md:text-5xl font-black text-surface-900 mb-8 leading-tight uppercase tracking-tighter">Your Journey Begins with Clarity</h2>
           <p className="text-xl text-surface-600 mb-16 leading-relaxed font-medium">Join CHAMP 21 and prepare for the 21st century healthcare environment.</p>
           
           <div className="bg-white p-16 rounded-[4rem] border border-surface-200 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 opacity-5 rounded-bl-full" />
              <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
                <Link to="/join" className="btn-primary px-10 py-5">Join CHAMP</Link>
                <Link to="/certification" className="btn-outline-dark px-10 py-5">Explore Certification</Link>
                <Link to="/join-community" className="btn-outline-dark px-10 py-5">Join the Community</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
