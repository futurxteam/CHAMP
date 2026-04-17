import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./partnerships.css";

export default function PartnershipsPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="partnerships-container">
      {/* Hero */}
      <section className="partnerships-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">PARTNERSHIPS</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Building Stronger Healthcare Systems Through Collaboration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Partnerships Matter */}
      <section className="partnerships-section bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block uppercase tracking-tighter">Why Partnerships Matter</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">Healthcare systems do not improve in isolation. Real impact comes when hospitals, academic institutions, and industry players work together to bridge the gap.</p>
              
              <div className="bg-surface-50 p-12 rounded-[4rem] border border-surface-200">
                 <p className="text-xl italic font-medium leading-relaxed">"CHAMP 21 is designed to act as the connecting layer. Partnerships are structured collaborations aimed at strengthening healthcare management in the 21st century."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hospital Partnerships */}
      <section className="partnerships-section bg-surface-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-black text-surface-900 mb-8 uppercase tracking-tighter">Hospital Partnerships</h2>
                 <p className="text-lg text-surface-500 mb-10 font-medium">Hospitals are where real healthcare happens, system tests occur, and operational challenges emerge every day.</p>
                 <div className="space-y-4">
                    {[
                      { t: "Workforce Capability", d: "Support staff through practical learning and certification." },
                      { t: "Learning Environments", d: "Use real scenarios to build case-based learning." },
                      { t: "Recruitment Support", d: "Connect with evaluated professionals ready for day one." },
                      { t: "Continuous Engagement", d: "Involve teams in sessions and knowledge-sharing." }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-white rounded-xl border border-surface-200">
                         <h5 className="font-black text-surface-900 text-sm">{item.t}</h5>
                         <p className="text-xs text-surface-500 font-medium">{item.d}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="gain-panel bg-white shadow-xl">
                 <h4 className="text-xl font-black text-primary-600 mb-8 uppercase tracking-widest text-center">What Hospitals Gain</h4>
                 <ul className="space-y-4">
                    {["Access to trained, evaluated professionals", "Reduced onboarding challenges", "Opportunities to shape talent", "Industry learning platform"].map((gain, i) => (
                      <li key={i} className="flex gap-4 font-bold text-surface-700 text-sm">
                         <span className="text-accent-500">🏢</span> {gain}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Academic Collaborations */}
      <section className="partnerships-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-black text-surface-900 mb-8 uppercase tracking-tighter">Academic Collaborations</h2>
                 <p className="text-lg text-surface-500 mb-10 font-medium">Strengthening the foundation where theory meets reality to ensure students are ready for hospital responsibilities.</p>
                 <div className="space-y-4">
                    {[
                      { t: "Theory & Practice", d: "Introduce case-based and scenario-driven learning." },
                      { t: "Student Readiness", d: "Prepare students for actual roles in healthcare." },
                      { t: "Industry Exposure", d: "Connect students with practicing professionals." },
                      { t: "Faculty Development", d: "Align faculty with current industry realities." }
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-surface-50 rounded-xl border border-surface-100 italic">
                         <h5 className="font-black text-surface-900 text-sm">{item.t}</h5>
                         <p className="text-xs text-surface-500 font-medium">{item.d}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 gain-panel bg-surface-900 text-white border-0 shadow-2xl">
                 <h4 className="text-xl font-black text-accent-400 mb-8 uppercase tracking-widest text-center">Academic Gains</h4>
                 <ul className="space-y-4">
                    {["Improved student outcomes", "Stronger industry alignment", "Enhanced program credibility", "Practical learning frameworks"].map((gain, i) => (
                      <li key={i} className="flex gap-4 font-medium text-surface-200 text-sm italic">
                         <span className="text-primary-400">🎓</span> {gain}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Industry Partners */}
      <section className="partnerships-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-black text-surface-900 mb-8 uppercase tracking-tighter">Industry Partners</h2>
                 <p className="text-lg text-surface-500 mb-10 font-medium">Working with tech, consulting, and quality firms to integrate practical solutions and system-level insights.</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { t: "Practical Solutions", d: "Integrate tools into learning." },
                      { t: "Industry Insights", d: "Share updated perspectives." },
                      { t: "Joint Initiatives", d: "Address real challenges." },
                      { t: "System Improvement", d: "Improve delivery practices." }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-white rounded-2xl border border-surface-200">
                         <h5 className="font-black text-surface-900 text-xs mb-1 uppercase">{item.t}</h5>
                         <p className="text-[10px] text-surface-400 font-bold">{item.d}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="gain-panel bg-primary-600 text-white border-0 shadow-2xl">
                 <h4 className="text-xl font-black text-accent-300 mb-8 uppercase tracking-widest text-center">Industry Gains</h4>
                 <ul className="space-y-4">
                    {["Direct professional engagement", "Operational challenge insight", "Unified solution platform", "Ecosystem contribution"].map((gain, i) => (
                      <li key={i} className="flex gap-4 font-bold text-surface-50 text-sm">
                         <span className="text-surface-900">📦</span> {gain}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="partnerships-section bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-10 uppercase tracking-tighter">Become a Partner</h2>
           <p className="text-xl text-surface-500 mb-16 font-medium italic">"Partnership is based on intent, not visibility. It is about improving how healthcare is managed."</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Collaborate on learning initiatives",
                "Support certification frameworks",
                "Engage in community discussions",
                "Contribute to knowledge sharing"
              ].map((item, i) => (
                <div key={i} className="p-5 bg-surface-50 border border-surface-200 rounded-2xl flex items-center gap-4 text-sm font-black text-surface-800 uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-primary-600" /> {item}
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Partnership Approach */}
      <section className="partnerships-section bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="partnership-approach-box shadow-2xl">
              <h2 className="text-3xl font-black mb-16 uppercase tracking-[0.2em] underline decoration-accent-500 decoration-8 underline-offset-8">Partnership Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {["Relevance to Needs", "Mutual Value", "Long-term Engagement"].map((item, i) => (
                   <div key={i} className="approach-stat">{item}</div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="partnerships-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <h2 className="text-3xl font-black text-surface-900 mb-12 uppercase">Strengthen the Healthcare System Together</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button className="btn-primary px-12 py-5">Corporate Partnership Inquiry</button>
                <Link to="/about" className="btn-outline-dark px-12 py-5">Read Our Story</Link>
                <Link to="/join" className="btn-outline-dark px-12 py-5">Join the Community</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
