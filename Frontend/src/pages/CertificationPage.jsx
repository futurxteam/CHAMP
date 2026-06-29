import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CertificationPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-surface-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-primary-50/40 via-white to-surface-50/50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary-200/10 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/60 border border-primary-200/50 text-primary-700 text-xs font-black uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            CHAMP Competency Registry
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            Professional Healthcare Certifications
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Validate your clinical operations, quality assurance, and hospital management expertise. Earn digital credentials trusted by premier healthcare organizations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link to="/register-certification" className="btn-primary font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all">
              Begin Competency Assessment
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Certification Levels Display */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "CHAMP L1 - Associate Healthcare Manager",
                desc: "Designed for entry-level executives and students trying to validate foundation metrics in department flow.",
                level: "Level 1",
                questions: "50 MCQ",
                duration: "60 mins",
                passing: "70%",
                difficulty: "Foundation"
              },
              {
                title: "CHAMP L2 - Certified Healthcare Manager",
                desc: "Designed for department managers and coordinators handling active escalations, quality audits, and safety loops.",
                level: "Level 2",
                questions: "60 MCQ + Scenarios",
                duration: "90 mins",
                passing: "75%",
                difficulty: "Intermediate",
                popular: true
              },
              {
                title: "CHAMP L3 - Fellow Clinical Operations Director",
                desc: "Designed for senior executives and CMOs directing long-term strategy, hospital compliance, and revenue cycles.",
                level: "Level 3",
                questions: "80 Scenario Simulations",
                duration: "120 mins",
                passing: "80%",
                difficulty: "Expert"
              }
            ].map((cert, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-surface-50 border border-surface-200 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden">
                {cert.popular && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary-600 text-white text-[9px] font-black uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <div>
                  <span className="text-[10px] text-primary-600 font-black uppercase tracking-widest block mb-4">{cert.level}</span>
                  <h3 className="text-xl font-black text-surface-900 mb-4 leading-snug">{cert.title}</h3>
                  <p className="text-xs text-surface-500 font-medium leading-relaxed mb-6">{cert.desc}</p>
                  
                  <div className="space-y-3 mb-8 border-t border-surface-200/50 pt-6">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-surface-400">Questions:</span>
                      <span className="text-surface-800 font-bold">{cert.questions}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-surface-400">Duration:</span>
                      <span className="text-surface-800 font-bold">{cert.duration}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-surface-400">Passing Score:</span>
                      <span className="text-surface-800 font-bold">{cert.passing}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-surface-400">Difficulty:</span>
                      <span className="text-surface-800 font-bold">{cert.difficulty}</span>
                    </div>
                  </div>
                </div>

                <Link to="/register-certification" className="w-full block py-4 bg-surface-900 text-white hover:bg-surface-800 text-xs font-black uppercase tracking-widest text-center rounded-2xl transition-all">
                  Register For Exam
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path visualization */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">The Certification Lifecycle</h2>
            <p className="text-surface-500 font-medium mt-3">From validation to recruitment, here is how CHAMP works for your credentials.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Step 1: Application", desc: "Select your competency track and verify background credentials." },
              { title: "Step 2: Assessment", desc: "Take the time-bound online simulation exam under proctored tracking." },
              { title: "Step 3: Verification", desc: "Our registry verifies outcomes and registers a unique ID." },
              { title: "Step 4: Promotion", desc: "Share your digital credential and join the verified talent pool." }
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white border border-surface-200 hover:border-primary-400 transition-colors">
                <span className="text-3xl font-extrabold text-primary-600/30 block mb-4">0{i+1}</span>
                <h4 className="text-sm font-black text-surface-900 mb-2">{step.title}</h4>
                <p className="text-[11px] text-surface-500 font-semibold leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Certificate Preview */}
      <section className="py-24 bg-white border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight leading-tight">Industry Recognized Digital Credentials</h2>
            <p className="text-surface-600 font-medium leading-relaxed">
              Every professional who passes a proctored assessment is registered in our public lookup registry. Hospitals can immediately audit your credentials.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-50 p-4 rounded-xl border border-surface-150">
                <h5 className="text-xs font-black text-surface-900 mb-1">Verifiable</h5>
                <p className="text-[10px] text-surface-500 font-medium">Unique hash verifiable live.</p>
              </div>
              <div className="bg-surface-50 p-4 rounded-xl border border-surface-150">
                <h5 className="text-xs font-black text-surface-900 mb-1">Secure</h5>
                <p className="text-[10px] text-surface-500 font-medium">Protected PDF with metadata seal.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md p-8 bg-surface-50 rounded-[3rem] border border-surface-200 shadow-xl relative overflow-hidden bg-gradient-to-br from-surface-50 to-primary-50/10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100 rounded-bl-[3rem] pointer-events-none opacity-40" />
              <div className="flex justify-between items-center mb-8">
                <span className="text-[9px] font-black text-surface-400 uppercase tracking-widest">Institutional Registry</span>
                <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Active</span>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-[8px] text-surface-400 font-black uppercase tracking-widest block mb-0.5">Recipient</span>
                  <p className="text-lg font-black text-surface-900">Jane Doe, MHA</p>
                </div>
                <div>
                  <span className="text-[8px] text-surface-400 font-black uppercase tracking-widest block mb-0.5">Credential</span>
                  <p className="text-xs font-black text-primary-600">CHAMP-Certified Healthcare Manager (L2)</p>
                </div>
                <div className="pt-4 border-t border-surface-200/50 flex justify-between text-[10px] font-semibold text-surface-500">
                  <span>ID: CHMP-8392-L2</span>
                  <span>Verified: Jun 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Success Stories</h2>
            <p className="text-surface-500 font-medium mt-3">Read how certified operators are applying structured workflows in Indian hospital networks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Passing the CHAMP L2 exam allowed our billing team to restructure escalation processes, dropping discharge approval times by 22% in our hospital.",
                author: "Ananya Iyer, CHM",
                role: "Operations Head, Apollo Health Care"
              },
              {
                quote: "The scenario-based simulations perfectly reflect what we encounter on night shifts. It is an exceptional preparation matrix.",
                author: "Siddharth Sen, CPSO",
                role: "Quality QA Lead, Fortis Health Network"
              }
            ].map((story, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-surface-200 shadow-sm">
                <p className="text-sm text-surface-600 font-medium italic leading-relaxed mb-6">"{story.quote}"</p>
                <h5 className="text-xs font-black text-surface-900">{story.author}</h5>
                <p className="text-[10px] text-surface-400 font-bold uppercase tracking-wider">{story.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center px-6 border-t border-surface-200/50">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Ready to validate your healthcare operations expertise?</h2>
          <p className="text-sm text-surface-500 font-medium max-w-lg mx-auto leading-relaxed">
            Register for the online proctored competency exam and earn your digital verification credential.
          </p>
          <div className="pt-4">
            <Link to="/register-certification" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              Become Certified
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
