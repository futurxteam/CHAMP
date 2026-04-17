import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./hire.css";

export default function HirePage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="hire-container">
      {/* Hero */}
      <section className="hire-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">Hire from CHAMP 21</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Find Professionals Who Are Ready to Perform
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Hiring Challenge */}
      <section className="hire-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block uppercase tracking-tighter">The Hiring Challenge in Healthcare</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">Healthcare organizations often face a recurring issue: Candidates may be qualified, but not always ready to handle real responsibilities.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { t: "Longer Training", d: "Extended adaptation periods required for new hires." },
                  { t: "Operational Lag", d: "Inefficiencies caused by lack of ground-level clarity." },
                  { t: "Dependency", d: "Increased pressure on senior staff for micro-management." },
                  { t: "Performance gaps", d: "Inconsistent handling of critical real-world situations." }
                ].map((item, i) => (
                  <div key={i} className="challenge-card">
                     <h5 className="font-black text-surface-900 mb-1 leading-tight">{item.t}</h5>
                     <p className="text-xs text-surface-500 font-medium">{item.d}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-12 text-primary-600 font-black italic">"The need is clear: Professionals who can understand, adapt, and act from day one."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="hire-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="diff-box shadow-2xl">
              <h2 className="text-3xl font-black mb-8 uppercase tracking-widest text-center">What Makes CHAMP 21 Different</h2>
              <p className="text-surface-300 font-medium mb-12 max-w-2xl mx-auto text-center">CHAMP 21 does not just connect employers with candidates. It connects them with evaluated and continuously engaged professionals.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {[
                   "Participated in real scenario-based discussions",
                   "Engaged in practical learning environments",
                   "Assessed through competency-based certification",
                   "Demonstrated real-world decision-making ability"
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl italic">
                      <span className="text-accent-400 font-black">✓</span>
                      <span className="text-surface-100 font-medium text-sm">{item}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="hire-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 uppercase tracking-tighter">What You Get as an Employer</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { t: "Access Talent Pool", d: "Curated list of professionals with demonstrated capability." },
                { t: "Verified Profiles", d: "Candidates assessed through structured, practical evaluation." },
                { t: "Better Alignment", d: "Profiles matched based on actual readiness, not just paper." },
                { t: "Reduced Training", d: "Professionals who require less time to adapt to responsibilities." }
              ].map((item, i) => (
                <div key={i} className="employer-value-card">
                   <h5 className="font-black text-surface-900 mb-4 uppercase tracking-tighter leading-tight">{item.t}</h5>
                   <p className="text-xs text-surface-500 font-bold leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* How You Can Engage */}
      <section className="hire-section bg-surface-50 shadow-inner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center uppercase tracking-widest">How You Can Engage</h2>
           <div className="engage-grid">
              {[
                { t: "Hire Directly", d: "Access and recruit from the Talent Pool." },
                { t: "Post Opportunities", d: "Share job openings with a prepared audience." },
                { t: "Participate", d: "Engage with professionals through discussions." },
                { t: "Collaborate", d: "Contribute real challenges to shape standards." }
              ].map((item, i) => (
                <div key={i} className="engage-item">
                   <h5 className="font-black text-surface-900 mb-2 leading-tight uppercase tracking-tighter">{item.t}</h5>
                   <p className="text-xs text-surface-500 font-medium">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="hire-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-black text-surface-900 mb-10 uppercase tracking-tighter">Why This Matters</h2>
                 <p className="text-lg text-surface-500 mb-10 font-medium">Hiring professionals prepared for current realities directly impacts your overall system strength.</p>
                 <div className="flex flex-wrap gap-4">
                    {["Operational Efficiency", "Patient Experience", "Team Performance", "System Strength"].map((badge, i) => (
                      <span key={i} className="impact-badge">{badge}</span>
                    ))}
                 </div>
              </div>
              <div className="flex-1 bg-surface-50 p-12 rounded-[4rem] border border-surface-200 shadow-xl">
                 <h4 className="text-2xl font-black text-surface-900 mb-6 italic italic">"Healthcare systems depend on people who can make decisions and take responsibility."</h4>
                 <div className="h-1 w-20 bg-primary-600 rounded-full" />
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hire-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <h2 className="text-3xl font-black text-surface-900 mb-8">Build Your Team with 21st Century Professionals</h2>
              <p className="text-surface-500 font-medium mb-12">If you are looking to hire professionals who are not just qualified, but capable, this is the right place to begin.</p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button className="btn-primary px-10 py-5">Access Talent Pool</button>
                <button className="btn-outline-dark px-10 py-5">Post a Job</button>
                <button className="btn-outline-dark px-10 py-5">Partner with CHAMP</button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
