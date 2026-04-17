import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./register.css";

export default function RegisterCertificationPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="register-container">
      {/* Hero Section */}
      <section className="register-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white">Register for Certification</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              CHAMP 21 Certification & Competency Assessment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Before You Register */}
      <section className="register-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Before You Register</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center">Take a moment to understand what you are signing up for.</p>
              
              <div className="bg-surface-900 p-10 rounded-[3rem] text-white shadow-xl my-12">
                <p className="text-accent-400 font-black mb-4 uppercase tracking-widest text-sm">Professional Advisory:</p>
                <p className="text-2xl font-black mb-6">"This is not a routine exam. It is an assessment of how prepared you are to function in today’s healthcare environment."</p>
                <p className="opacity-70 italic">If you are looking for something that simply adds a certificate to your profile, this may not serve that purpose.</p>
              </div>

              <p className="text-center font-black text-surface-900 text-2xl mb-8">But if you want to:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  "Understand your current capability",
                  "Identify gaps in your approach",
                  "Improve how you handle real situations"
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-surface-50 rounded-2xl border border-surface-100 flex flex-col items-center text-center gap-4">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-black">✓</div>
                    <span className="font-bold text-surface-800">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-center mt-12 text-primary-600 font-black text-xl italic underline underline-offset-8">Then this certification is designed for you.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Choose Your Level */}
      <section className="register-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-surface-900 mb-4">Choose Your Level</h2>
          <p className="text-surface-500 mb-16 font-medium">Select the level that best matches your current role and responsibilities.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                lvl: "Entry-Level",
                roles: ["Starting your career in healthcare administration", "Working as a trainee or junior executive", "Looking to build clarity in hospital operations"]
              },
              {
                lvl: "Mid-Level",
                roles: ["Managing a department or a team", "Handling day-to-day hospital operations", "Responsible for processes, coordination, and outcomes"]
              },
              {
                lvl: "Senior & CXO",
                roles: ["Leading departments or entire institutions", "Making strategic and high-impact decisions", "Responsible for system-level performance"]
              }
            ].map((level, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="level-select-card">
                <h3 className="text-2xl font-black text-primary-600 mb-6">{level.lvl}</h3>
                <p className="text-xs font-black text-surface-400 uppercase tracking-widest mb-6">If you are:</p>
                <ul className="space-y-4 text-left">
                  {level.roles.map((role, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-surface-100 rounded-full flex-shrink-0 mt-1" />
                      <span className="text-sm font-bold text-surface-700">{role}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-10 py-4 bg-surface-900 text-white font-black rounded-xl hover:bg-primary-600 transition-all">
                  Select {level.lvl}
                </button>
              </motion.div>
            ))}
          </div>
          <p className="mt-16 text-surface-400 font-bold italic">
            "Choosing the correct level ensures that the assessment reflects your real work environment."
          </p>
        </div>
      </section>

      {/* What the Registration Includes */}
      <section className="register-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-surface-900 mb-4">What the Registration Includes</h2>
            <p className="text-surface-600">Once you register, you will receive access to a structured pathway.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Assessment Access", desc: "Entry to the CHAMP 21 certification exam in your selected category." },
              { title: "Preparation Support", desc: "Access to sample scenarios, practice questions, and community guidance." },
              { title: "Community Integration", desc: "Opportunity to interact with other professionals preparing for the assessment." },
              { title: "Performance Evaluation", desc: "A detailed scorecard and analytical report after completion." },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-surface-50 rounded-3xl border border-surface-100 h-full">
                <div className="w-12 h-1.5 bg-primary-600 mb-6 rounded-full" />
                <h4 className="font-black text-surface-900 mb-3">{item.title}</h4>
                <p className="text-xs text-surface-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="register-section bg-surface-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black mb-16">Registration Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { step: "Step 1", title: "Personal Details", desc: "Complete your basic details and professional information." },
              { step: "Step 2", title: "Select Level", desc: "Select the certification level that matches your experience." },
              { step: "Step 3", title: "Confirm & Schedule", desc: "Set your assessment window and finalize registration." },
              { step: "Step 4", title: "Engage & Prepare", desc: "Access resources and begin engaging with the community." },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-black text-white/10 absolute -top-10 left-1/2 -translate-x-1/2">0{i+1}</div>
                <h4 className="text-accent-400 font-black mb-2">{s.step}</h4>
                <h5 className="font-bold mb-4">{s.title}</h5>
                <p className="text-xs opacity-60 leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Format */}
      <section className="register-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-surface-900">
          <h2 className="text-3xl font-black mb-16">Assessment Format (What to Expect)</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "Scenario-based problem solving",
              "Objective questions",
              "Case analysis",
              "Situational judgment",
              "Role-specific challenges"
            ].map((format, i) => (
              <div key={i} className="px-8 py-4 bg-surface-900 text-white rounded-2xl font-black">
                {format}
              </div>
            ))}
          </div>
          <p className="mt-12 text-surface-400 font-bold uppercase tracking-widest text-sm">Reflecting real situations seen in hospitals today</p>
        </div>
      </section>

      {/* Important Note */}
      <section className="register-section bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 rounded-[4rem] border border-surface-200 shadow-xl">
             <h2 className="text-3xl font-black text-surface-900 mb-8">Important Note</h2>
             <p className="text-lg text-surface-600 mb-10 font-medium">This certification follows a co-creative approach. Many of the scenarios and discussions you encounter are shaped by real professionals working in the field.</p>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Relevant", desc: "The assessment remains practical." },
                  { title: "Practical", desc: "Learning is built on reality." },
                  { title: "Capability", desc: "Outcomes reflect real skill." }
                ].map((note, i) => (
                  <div key={i} className="text-left">
                    <h5 className="font-black text-primary-600 mb-2 uppercase tracking-tighter">{note.title}</h5>
                    <p className="text-sm text-surface-500 font-bold">{note.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* After Completion */}
      <section className="register-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 mb-16">After You Complete the Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div className="text-left space-y-6">
                {[
                  "Your certification (based on successful completion)",
                  "A detailed performance report",
                  "Insights into your strengths and areas for improvement"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-accent-400 rounded-lg flex items-center justify-center font-black">✓</div>
                    <span className="text-lg font-bold text-surface-800">{item}</span>
                  </div>
                ))}
             </div>
             <div className="bg-surface-900 p-10 rounded-[3rem] text-white text-left">
                <p className="text-accent-400 font-black mb-6 uppercase tracking-widest text-xs">Continuous Engagement Opportunity:</p>
                <ul className="space-y-4 font-bold text-lg">
                  <li>• Re-engage with the community</li>
                  <li>• Improve and reattempt (if needed)</li>
                  <li>• Contribute to future learning and assessments</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="register-cta-section text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl md:text-5xl font-black text-surface-900 mb-8 leading-tight">Take the Next Step</h2>
           <p className="text-xl text-surface-600 mb-16 leading-relaxed font-medium">If you are ready to evaluate yourself based on real-world expectations, this is the right place to begin.</p>
           
           <div className="bg-white p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <p className="text-2xl font-black text-surface-900 mb-12">Register for the CHAMP 21 Certification and understand where you stand in today’s healthcare environment.</p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button className="btn-primary px-10 py-5">Complete Your Registration</button>
                <Link to="/certification" className="btn-outline-dark px-10 py-5">Explore Certification Again</Link>
                <Link to="/join-community" className="btn-outline-dark px-10 py-5">Join the Community First</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
