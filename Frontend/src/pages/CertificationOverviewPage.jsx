import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./certification_overview.css";

export default function CertificationOverviewPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="cert-overview-container">
      {/* Hero */}
      <section className="cert-overview-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">CERTIFICATION & ASSESSMENT</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              CHAMP 21 Flagship Competency Framework
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="cert-overview-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Certification Overview</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">Healthcare administration today demands more than theoretical understanding.</p>
              
              <p>CHAMP 21 Certification evaluates how professionals think, respond, and act in real situations—not just what they know. Most existing systems do not measure these practical abilities.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                {[
                  "Handle real-time operational challenges",
                  "Make decisions under pressure",
                  "Balance expectations with constraints",
                  "Maintain quality while managing costs"
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-surface-50 rounded-2xl flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-600" />
                    <span className="text-sm font-bold text-surface-800">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-center mt-12 font-black text-xs uppercase tracking-widest text-primary-600">Built for: Clarity • Relevance • Real-world Application</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Traditional Fails */}
      <section className="cert-overview-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">Why Traditional Certifications Fall Short</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { t: "Focus on Memory", d: "Professionals are tested on what they can recall, not how they handle real situations." },
                { t: "Outdated Contexts", d: "Scenarios and frameworks may not reflect current hospital realities." },
                { t: "Limited Decision-Making", d: "Minimal emphasis on how professionals prioritize and adapt under pressure." },
                { t: "One-Size-Fits-All", d: "Same structures used for professionals at vastly different responsibility levels." },
                { t: "Minimal Industry Input", d: "Designed without continuous validation from active practitioners." }
              ].map((item, i) => (
                <div key={i} className="limit-card">
                   <h4 className="font-black text-surface-900 mb-2">{item.t}</h4>
                   <p className="text-sm text-surface-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Assessment Approach */}
      <section className="cert-overview-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-accent-500 inline-block">Assessment Approach</h2>
           <p className="text-2xl font-black text-surface-900 my-12 leading-snug">"Is the professional ready to function effectively in today’s healthcare environment?"</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { t: "Real-World Relevance", d: "All scenarios are based on situations that occur in hospitals today." },
                { t: "Decision-Focused", d: "Participants assessed on how they think, prioritize, and act." },
                { t: "Role-Based Design", d: "Each level reflects actual responsibilities in the workplace." },
                { t: "Co-Creative Development", d: "Inputs from practicing professionals continuously refine the assessment." }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-surface-50 rounded-3xl border border-surface-100 flex items-start gap-4">
                   <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-black flex-shrink-0 text-xs">✓</div>
                   <div>
                     <h5 className="font-black text-surface-900 mb-1 uppercase tracking-tighter">{item.t}</h5>
                     <p className="text-xs text-surface-500 font-bold">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="cert-overview-section bg-surface-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 text-center mb-16 uppercase tracking-widest">Certification Levels</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { 
                  l: "Entry-Level", 
                  for: "Beginning of careers",
                  focus: ["Understanding workflows", "Operational awareness", "Simple real-life situations", "Structured thinking"]
                },
                { 
                  l: "Mid-Level", 
                  for: "Managers of teams/processes",
                  focus: ["Operational decision-making", "Patient/Team challenges", "Process improvement", "Quality & Efficiency"]
                },
                { 
                  l: "Senior / CXO", 
                  for: "Leadership & Strategic roles",
                  focus: ["High-level decision-making", "System-wide planning", "Complex sensitive situations", "Strategic direction"]
                }
              ].map((level, i) => (
                <div key={i} className="p-12 bg-white rounded-[3rem] border border-surface-200">
                   <div className="text-[10px] font-black tracking-[0.3em] text-primary-600 uppercase mb-4">Level 0{i+1}</div>
                   <h4 className="text-2xl font-black text-surface-900 mb-2 uppercase">{level.l}</h4>
                   <p className="text-xs text-surface-400 font-bold mb-8 italic">{level.for}</p>
                   <div className="space-y-3">
                      {level.focus.map((f, j) => (
                        <div key={j} className="text-sm font-bold text-surface-700">{f}</div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Assessment Components */}
      <section className="cert-overview-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center uppercase">Assessment Components</h2>
           <div className="component-grid">
              {[
                { t: "Scenario Problem Solving", d: "Realistic hospital situations requiring structured analysis & analysis." },
                { t: "Objective Questions", d: "Understanding essential management and operations concepts." },
                { t: "Situational Judgment", d: "Choosing professional responses to sensitive challenges." },
                { t: "Simulations", d: "Time-bound tasks replicating real operational conditions under pressure." }
              ].map((item, i) => (
                <div key={i} className="component-card">
                   <h5 className="font-black text-primary-700 mb-4">{item.t}</h5>
                   <p className="text-sm text-surface-500 font-bold leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Exam Process */}
      <section className="cert-overview-section bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">Exam Process</h2>
           <div className="step-flow">
              {[
                { s: "01", t: "Registration", d: "Select your level and complete enrollment." },
                { s: "02", t: "Preparation", d: "Access sample scenarios and community guidance." },
                { s: "03", t: "Assessment", d: "Attempt the online, structured evaluation window." },
                { s: "04", t: "Evaluation", d: "Responses assessed on clarity and relevance." },
                { s: "05", t: "Result", d: "Receive your performance scorecard and certificate." }
              ].map((step, i) => (
                <div key={i} className="step-item">
                   <span className="text-4xl font-black opacity-10">{step.s}</span>
                   <div>
                     <h4 className="font-black text-surface-900">{step.t}</h4>
                     <p className="text-sm text-surface-500 font-medium">{step.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Sample & Benefits */}
      <section className="cert-overview-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="p-12 border border-surface-200 rounded-[3rem]">
                 <h3 className="text-2xl font-black text-surface-900 mb-8">Sample Assessment</h3>
                 <p className="text-surface-500 mb-8 font-medium">Familiarize yourself with the format and understand expectations.</p>
                 <div className="space-y-4">
                    {["Example scenarios", "Practice objective questions", "Sample case discussions"].map((item, i) => (
                      <div key={i} className="p-4 bg-surface-50 rounded-xl font-bold text-surface-700 border border-surface-100">{item}</div>
                    ))}
                 </div>
              </div>
              <div>
                 <h3 className="text-2xl font-black text-surface-900 mb-12 text-center">Certification Benefits</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Clarity of Capability", "Practical Readiness", "Professional Recognition", "Career Advancement"].map((item, i) => (
                      <div key={i} className="benefit-badge">{item}</div>
                    ))}
                 </div>
                 <div className="mt-8 benefit-badge bg-primary-600 text-white border-primary-600">Community Integration</div>
              </div>
           </div>
        </div>
      </section>

      {/* Verify Section */}
      <section className="cert-overview-section bg-surface-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="verify-box shadow-2xl">
              <h2 className="text-3xl font-black mb-8 uppercase tracking-widest">Verify Certificate</h2>
              <p className="text-surface-300 font-medium mb-12 max-w-2xl mx-auto">Each certified professional receives a unique ID, digital certificate, and platform verification access for employers.</p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                 <button className="px-10 py-5 bg-white text-surface-900 font-black rounded-2xl">Verify authenticity</button>
                 <button className="px-10 py-5 border border-white/20 text-white font-black rounded-2xl">Review details</button>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cert-overview-section bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-surface-50 p-12 md:p-16 rounded-[4rem] border border-surface-200">
              <h2 className="text-3xl font-black text-surface-900 mb-8">Ready to Validate Your Readiness?</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link to="/register-certification" className="btn-primary px-10 py-5">Register for Certification</Link>
                <Link to="/join-community" className="btn-outline-dark px-10 py-5">Join the Community</Link>
                <Link to="/contributor" className="btn-outline-dark px-10 py-5">Become a Contributor</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
