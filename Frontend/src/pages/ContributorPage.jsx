import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ContributorPage() {
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
            CHAMP Co-Creators Program
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            Become a Contributor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Share operations expertise, author scenario simulations, and build the shared knowledge base of healthcare managers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link to="/join" className="btn-primary font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all">
              Apply to Program
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Become a Contributor */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Why Author with CHAMP?</h2>
            <p className="text-surface-500 font-medium mt-3">Help professionals learn through real-world hospital operational challenges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Influence the Industry", desc: "Build standard operations audit frameworks used by hundreds of partner departments.", icon: "🌟" },
              { title: "Revenue Sharing", desc: "Earn direct royalty distributions on your premium course modules and case studies.", icon: "💰" },
              { title: "Industry Recognition", desc: "Gain L2 & L3 verified badges and highlight your profile to top hospital recruiters.", icon: "🏅" }
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

      {/* Role Benefits (L2 vs L3) */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-8 rounded-[3rem] bg-white border border-surface-200 shadow-sm relative overflow-hidden">
            <span className="text-[9px] text-primary-600 font-black uppercase tracking-widest block mb-4">L2 Track</span>
            <h3 className="text-xl font-black text-surface-900 mb-4">Certified Contributor</h3>
            <p className="text-xs text-surface-500 leading-relaxed mb-6 font-medium">
              Open to experienced hospital coordinators and department heads ready to share templates and lead case study discussions.
            </p>
            <ul className="space-y-3 border-t border-surface-100 pt-6">
              {["Author standard audit sheets", "Lead local city meetups", "Royalties on L2 basic modules"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-bold text-surface-700">
                  <span className="text-emerald-500 text-sm">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-[3rem] bg-white border border-surface-200 shadow-sm relative overflow-hidden">
            <span className="text-[9px] text-primary-600 font-black uppercase tracking-widest block mb-4">L3 Track</span>
            <h3 className="text-xl font-black text-surface-900 mb-4">Executive Fellow Author</h3>
            <p className="text-xs text-surface-500 leading-relaxed mb-6 font-medium">
              Open to chief medical officers, quality directors, and senior hospital administrators seeking to direct proctoring.
            </p>
            <ul className="space-y-3 border-t border-surface-100 pt-6">
              {["Design proctored simulation exams", "Direct Strategic Roundtable panels", "Featured billing audit royalties"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-bold text-surface-700">
                  <span className="text-emerald-500 text-sm">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contribution Journey */}
      <section className="py-20 bg-white border-t border-surface-200/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">The Contributor Journey</h2>
          </div>

          <div className="space-y-8 relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-surface-200" />
            {[
              { step: "01", title: "Submit Credentials", desc: "Provide verification proof files of your hospital administration track record." },
              { step: "02", title: "Proctor Review", desc: "Our admin committee reviews your experience and grants L2 or L3 contributor roles." },
              { step: "03", title: "Publish & Author", desc: "Design simulation-based courses, post SOP checklists, and lead roundtables." }
            ].map((journey, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-primary-600 border-2 border-white" />
                <span className="text-xs font-black text-primary-600 block mb-1">Step {journey.step}</span>
                <h4 className="text-base font-black text-surface-900 mb-1">{journey.title}</h4>
                <p className="text-xs text-surface-500 font-medium leading-relaxed">{journey.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface-950 text-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to co-create with us?</h2>
          <p className="text-sm text-surface-300 font-medium max-w-lg mx-auto leading-relaxed">
            Apply to the Contributor Program today, submit your validation proof, and begin authoring within hours.
          </p>
          <div className="pt-4">
            <Link to="/join" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              Apply to Contribute
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
