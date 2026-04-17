import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./careers.css";

export default function CareersPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="careers-container">
      {/* Hero */}
      <section className="careers-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">CAREERS & OPPORTUNITIES</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Turning Capability into Real Career Growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Opportunities */}
      <section className="careers-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-black text-surface-900 mb-8 uppercase tracking-tighter">Job Opportunities</h2>
              <p className="text-lg text-surface-500 mb-8 font-medium">Healthcare organizations today are not just looking for qualifications—they look for professionals who can contribute from day one.</p>
              <div className="space-y-4">
                 {["Hospital Operations", "Quality & Patient Safety", "Front Office & Coordination", "HR & Administration", "Departmental Management"].map((role, i) => (
                   <div key={i} className="flex gap-4 items-center p-4 bg-surface-50 rounded-xl font-black text-surface-800 text-sm">
                      <span className="text-primary-600">→</span> {role}
                   </div>
                 ))}
              </div>
            </div>
            <div className="bg-surface-900 p-12 rounded-[4rem] text-white">
              <h4 className="text-2xl font-black mb-8 underline decoration-primary-500 decoration-4 underline-offset-8">What Makes This Different</h4>
              <p className="text-surface-400 font-bold uppercase tracking-widest text-xs mb-8">Candidates are shortlisted based on demonstrated capability:</p>
              <ul className="space-y-6 text-xl italic font-medium">
                <li>Community Participation</li>
                <li>Certification Performance</li>
                <li>Practical Engagement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="careers-section bg-surface-50 shadow-inner">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-surface-900 mb-12 uppercase tracking-tighter">Internships</h2>
          <p className="text-xl text-surface-500 mb-16 font-medium">These are not observational roles alone. Interns are encouraged to engage with processes and build confidence through guided exposure.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { t: "Real Understanding", d: "Deep dive into hospital systems." },
              { t: "Actual Workflows", d: "Participation in real-time coordination." },
              { t: "Bridge the Gap", d: "Academic learning meets reality." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-surface-200">
                 <h5 className="font-black text-surface-900 mb-2">{item.t}</h5>
                 <p className="text-xs text-surface-500 font-medium">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Pool */}
      <section className="careers-section bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="talent-pool-box shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-widest">CHAMP 21 Talent Pool</h2>
            <p className="text-surface-300 font-medium mb-12 max-w-2xl mx-auto italic">"A curated group of professionals who have demonstrated readiness for today’s healthcare environment."</p>
            <div className="flex flex-wrap justify-center gap-10 text-sm font-black text-accent-400 uppercase tracking-widest">
               <span>Performance</span> • <span>Participation</span> • <span>Understanding</span>
            </div>
            <p className="mt-16 text-xs text-surface-400 font-medium uppercase tracking-[0.2em]">Trusted source for employers</p>
          </div>
        </div>
      </section>

      {/* Career Support */}
      <section className="careers-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">Career Support (Resume & Interviews)</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  t: "Resume Development", 
                  d: "Align profiles with job expectations, highlighting real practical skills.",
                  i: "📄"
                },
                { 
                  t: "Interview Prep", 
                  d: "Handle scenario-based questions and communicate thought processes clearly.",
                  i: "🎙️"
                },
                { 
                  t: "Role-Based Guidance", 
                  d: "Understanding what specific roles require and preparing accordingly.",
                  i: "🛤️"
                }
              ].map((item, i) => (
                <div key={i} className="opportunity-card text-center">
                   <div className="career-icon-box mx-auto">{item.i}</div>
                   <h4 className="text-xl font-black text-surface-900 mb-4">{item.t}</h4>
                   <p className="text-sm text-surface-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="careers-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-black text-surface-900 mb-6 uppercase tracking-tighter">For Employers (Hire from CHAMP 21)</h2>
             <p className="text-xl text-surface-500 max-w-2xl mx-auto font-medium transition-all hover:text-surface-900 cursor-default">"Access professionals who are ready to perform, not just qualified on paper."</p>
           </div>
           
           <div className="employer-grid">
              {[
                { t: "Access Talent Pool", d: "Identify candidates based on verified capability." },
                { t: "Hire Certified", d: "Demonstrated readiness through practical assessments." },
                { t: "Engage Community", d: "Participate in sessions and talent identification." },
                { t: "Collaborate", d: "Bring real problems and explore solutions with us." }
              ].map((item, i) => (
                <div key={i} className="employer-card text-center">
                   <h5 className="font-black text-surface-900 mb-2 uppercase tracking-tighter">{item.t}</h5>
                   <p className="text-xs text-surface-500 font-bold">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="careers-section bg-surface-900 text-white italic text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-xl opacity-80 leading-relaxed max-w-2xl mx-auto">
             "Career growth in healthcare administration is no longer about time spent or qualifications collected. It is about how clearly you understand systems and how effectively you handle situations."
           </p>
           <div className="mt-12 h-1 w-12 bg-accent-500 mx-auto rounded-full" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="careers-section bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl font-black text-surface-900 mb-4">Take the Next Step</h2>
           <p className="text-xl text-surface-500 mb-16 font-medium">Whether you are looking to grow, explore, or hire, this is where capability meets opportunity.</p>
           
           <div className="flex flex-col md:flex-row justify-center gap-6">
              <button className="btn-primary px-10 py-5">Explore Job Opportunities</button>
              <Link to="/talent-pool" className="btn-outline-dark px-10 py-5">Join the Talent Pool</Link>
              <Link to="/hire" className="btn-outline-dark px-10 py-5">Hire from CHAMP 21</Link>
           </div>
        </div>
      </section>
    </div>
  );
}
