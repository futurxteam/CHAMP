import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./certification.css";

export default function CertificationPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="cert-container">
      {/* Hero Section */}
      <section className="cert-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">Explore Certification</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold mb-8 uppercase tracking-widest">
              CHAMP 21 Certification & Competency Assessment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why This Certification Exists */}
      <section className="cert-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Why This Certification Exists</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl">In healthcare administration, the real test is not what you know. It is how you respond when situations become uncertain, complex, and time-sensitive.</p>
              <p>Most certifications available today still focus on concepts that were designed in a different era. They assess memory, not readiness.</p>
              
              <div className="bg-surface-50 p-10 rounded-[3rem] border border-surface-100 my-12">
                <p className="text-primary-700 font-black mb-6 uppercase tracking-wider text-sm">Hospitals today require something very different:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Faster decision-making",
                    "Better coordination across departments",
                    "Stronger understanding of patient expectations",
                    "Ability to handle real-time operational challenges"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-surface-900">
                      <div className="w-2 h-2 rounded-full bg-primary-600" />
                      <span className="font-bold">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p className="italic text-center text-primary-600 font-bold text-lg">
                CHAMP 21 Certification is designed to reflect this shift. It evaluates whether a professional is prepared to function effectively in the 21st century healthcare environment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="cert-section border-t border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-surface-900 mb-4">What Makes CHAMP 21 Different</h2>
            <p className="text-surface-600 font-medium italic">"This is not a traditional exam. It is a competency-based assessment system."</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Focus on Application, Not Just Knowledge", desc: "Instead of asking 'what is correct,' the assessment focuses on 'what will you do.'" },
              { title: "Built Around Present-Day Challenges", desc: "Scenarios reflect actual situations seen in Indian hospitals today." },
              { title: "Designed for Different Levels", desc: "Each level is aligned with what is expected from professionals at that stage." },
              { title: "Continuously Evolving via Co-Creation", desc: "Refined using inputs from practicing professionals within our community." },
            ].map((item, i) => (
              <motion.div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-surface-200 hover:border-primary-400 transition-colors">
                <h4 className="font-black text-primary-700 mb-3">{item.title}</h4>
                <p className="text-surface-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="cert-section border-t border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 text-center mb-16">Certification Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                lvl: "Entry-Level",
                forWhom: "Professionals beginning their careers",
                focus: ["Understanding hospital systems", "Basic operational awareness", "Simple real-life situations", "Structured thinking"]
              },
              {
                lvl: "Mid-Level",
                forWhom: "Managing departments or processes",
                focus: ["Decision-making in operations", "Patient & team challenges", "Process improvement thinking", "Balancing quality and efficiency"]
              },
              {
                lvl: "Senior & CXO",
                forWhom: "Professionals in leadership roles",
                focus: ["Strategic decision-making", "High-pressure leadership", "System-level thinking", "Critical communication"]
              }
            ].map((level, i) => (
              <motion.div key={i} className="level-card">
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-black tracking-widest text-primary-600 px-3 py-1 bg-primary-50 rounded-full">Tier 0{i+1}</span>
                  <h3 className="text-2xl font-black text-surface-900 mt-4">{level.lvl}</h3>
                  <p className="text-surface-500 text-sm font-medium italic mt-2">{level.forWhom}</p>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase text-surface-400 tracking-tighter">Core Focus Areas:</p>
                  {level.focus.map((f, j) => (
                    <div key={j} className="flex items-center justify-center gap-3">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                      <span className="text-sm font-bold text-surface-700">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Structure */}
      <section className="cert-section border-t border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">Assessment Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "📝", title: "Scenario Solving", desc: "Realistic situations requiring structured solutions." },
              { icon: "🔘", title: "Objective Questions", desc: "Clarity in key management & operation concepts." },
              { icon: "📊", title: "Case Analysis", desc: "Prioritization and decision-making in short cases." },
              { icon: "🧠", title: "Situational Judgment", desc: "Professional response to sensitive challenges." },
              { icon: "⏱️", title: "Simulation Tasks", desc: "Time-bound operational decision-making." },
              { icon: "🎯", title: "Role-Based Specifics", desc: "Questions tailored to your exact responsibility level." },
            ].map((item, i) => (
              <div key={i} className="assessment-item text-surface-900">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-primary-700 mb-1">{item.title}</h4>
                  <p className="text-xs text-surface-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Creative model */}
      <section className="cert-section border-t border-surface-100 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 mb-8">Co-Creative Assessment Model</h2>
          <p className="text-lg text-surface-600 mb-12">CHAMP 21 Certification is not built in isolation. Practicing professionals actively contribute to designing scenarios and identifying emerging challenges.</p>
          <div className="p-10 border border-surface-200 rounded-[3rem]">
            <p className="text-xl font-black text-surface-800 italic">"Ensuring that the certification stays aligned with what is actually happening in hospitals today."</p>
            <div className="w-12 h-1 bg-primary-600 mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* Certification Outcome */}
      <section className="cert-section border-t border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-surface-900 mb-8">Certification Outcome</h2>
              <div className="space-y-4">
                <div className="outcome-badge border border-surface-200 shadow-sm">CHAMP 21 Certified Professional (Level-Specific)</div>
                <div className="outcome-badge border border-surface-200 shadow-sm">Detailed Performance Scorecard</div>
                <div className="outcome-badge border border-surface-200 shadow-sm">Recognition within the CHAMP 21 Community</div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-surface-200">
                <p className="text-xs font-black text-primary-600 uppercase mb-8 tracking-widest">Scorecard Insights:</p>
                <div className="space-y-8">
                  {["Problem-solving ability", "Decision-making approach", "Operational understanding", "Practical readiness"].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-black text-surface-800">{item}</span>
                        <span className="text-[10px] font-bold text-surface-400">BENCHMARK 0{i+1}</span>
                      </div>
                      <div className="h-3 w-full bg-surface-100 rounded-full overflow-hidden border border-surface-200">
                        <motion.div 
                          className="h-full bg-surface-900"
                          initial={{ width: 0 }}
                          whileInView={{ width: "85%" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="cert-section border-t border-surface-100 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 mb-8">Why This Matters</h2>
          <p className="text-lg text-surface-500 mb-12 font-medium">Hospitals today are looking for professionals who can handle situations independently and responsibly.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Think beyond theory",
              "Respond to real challenges",
              "Prepared for current demands"
            ].map((text, i) => (
              <div key={i} className="p-8 bg-surface-900 text-white rounded-2xl font-black shadow-lg">
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="cert-section border-t border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 text-center mb-16">How to Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              "Register for the certification",
              "Access preparation resources",
              "Attempt the assessment online",
              "Receive your report & certificate"
            ].map((step, i) => (
              <div key={i} className="group">
                <div className="step-bubble mx-auto group-hover:scale-110 transition-transform">{i+1}</div>
                <p className="font-black text-surface-900 text-sm whitespace-pre-line">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cert-cta-section text-center">
          <motion.div 
            className="cert-cta-card" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-black text-surface-900 mb-6 leading-tight">Take the Next Step</h3>
            <p className="text-surface-500 mb-12 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Clarity for where you stand. Direction for how you improve. Join a community built on shared growth.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/register-certification" className="px-10 py-5 bg-primary-600 text-white font-black rounded-2xl shadow-xl hover:bg-primary-500 transition-all">Register for Certification</Link>
              <Link to="/join-community" className="px-10 py-5 bg-surface-900 text-white font-black rounded-2xl hover:bg-surface-800 transition-all">Join the Community</Link>
            </div>
          </motion.div>
      </section>
    </div>
  );
}
