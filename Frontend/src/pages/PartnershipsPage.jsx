import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PartnershipsPage() {
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
            CHAMP Partner Registry
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            Enterprise Partnerships
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Collaborate with CHAMP to train hospital teams, recruit verified operators, and implement standardized operations audits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link to="/join" className="btn-primary font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all">
              Apply for Partnership
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hospital Partnerships Value Propositions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">For Healthcare Organizations & Hospitals</h2>
            <p className="text-surface-500 font-medium mt-3">Bridge operations gaps and maintain accreditation safety parameters via verified workforce evaluations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Standardized Evaluation", desc: "Audit entry and mid-level coordinators using CHAMP scenario proctor challenges.", icon: "📋" },
              { title: "Recruitment Pathways", desc: "Direct recruitment lookup access into the verified registry talent pool.", icon: "👥" },
              { title: "Custom Bootcamps", desc: "Design clinical flow and patient experience workshops for internal staff.", icon: "🎓" }
            ].map((prop, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-surface-50 border border-surface-200 hover:shadow-lg transition-shadow">
                <span className="text-3xl mb-4 block">{prop.icon}</span>
                <h4 className="text-lg font-black text-surface-900 mb-2">{prop.title}</h4>
                <p className="text-xs text-surface-500 font-medium leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Integrations */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight leading-tight">For Academic Institutions & Universities</h2>
            <p className="text-surface-600 font-medium leading-relaxed">
              Equip healthcare administration postgraduate students with real practical simulations to ensure operational readiness on day one of clinical placement.
            </p>
            <ul className="space-y-4">
              {["Simulated ER operations triage case studies", "Live proctored semester-end compliance checks", "Access to community discussions with senior executives"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-emerald-500 text-lg">✓</span>
                  <span className="text-xs font-black text-surface-700 uppercase tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 bg-white p-8 rounded-[3rem] border border-surface-200 shadow-xl">
            <h4 className="text-lg font-black text-surface-900 mb-4">University Partners Program</h4>
            <p className="text-xs text-surface-500 leading-relaxed mb-6 font-medium">
              Integrate CHAMP proctoring into your hospital management curricula. Partnered universities receive semester-end certification lookups for all final-year students.
            </p>
            <Link to="/join" className="w-full block py-4 bg-surface-900 text-white rounded-2xl hover:bg-surface-800 font-black text-xs uppercase tracking-widest text-center transition-all">
              Integrate CHAMP Curricula
            </Link>
          </div>
        </div>
      </section>

      {/* Grayscale Logo Wall */}
      <section className="py-16 bg-white border-y border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest block mb-10">Trusted Enterprise Ecosystem Partners</span>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale">
            {["AHERF", "Apollo Hospitals", "Max Healthcare", "Fortis Health", "Manipal Hospitals"].map((logo, i) => (
              <span key={i} className="text-lg md:text-xl font-extrabold tracking-widest uppercase text-surface-900">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface-50 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Ready to strengthen your workforce?</h2>
          <p className="text-sm text-surface-500 font-medium max-w-lg mx-auto leading-relaxed">
            Connect with our partnerships director to set up corporate evaluations or university curriculum credits.
          </p>
          <div className="pt-4">
            <Link to="/join" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              Apply for Partnership
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
