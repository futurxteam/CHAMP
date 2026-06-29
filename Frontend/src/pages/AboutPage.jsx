import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AboutPage() {
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
            Our Mission & Purpose
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            About CHAMP
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Building the next generation of verified, competent healthcare management and administration professionals in India.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Split */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] text-primary-600 font-black uppercase tracking-widest block">The Foundation</span>
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Our Mission & Core Purpose</h2>
            <p className="text-sm text-surface-500 leading-relaxed font-medium">
              We operate under a simple reality: Hospital workflows have entered the 21st century. The people managing clinical delivery must be verified, competent, and aligned to present day patient safety audit checks.
            </p>
            <div className="bg-surface-50 p-6 rounded-2xl border border-surface-150 font-medium text-xs text-surface-600 italic">
              "We are bridging the gap between theoretical health administration textbooks and ground clinical realities."
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            <div className="p-8 rounded-[2rem] bg-surface-50 border border-surface-200">
              <h4 className="text-sm font-black text-primary-600 uppercase tracking-wider mb-2">Our Vision</h4>
              <p className="text-xs text-surface-500 leading-relaxed font-medium">
                To establish CHAMP as the national institutional registry of competence in hospital operations, quality compliance, and billing lifecycle management.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-surface-50 border border-surface-200">
              <h4 className="text-sm font-black text-primary-600 uppercase tracking-wider mb-2">Platform Goals</h4>
              <p className="text-xs text-surface-500 leading-relaxed font-medium">
                Empower L2 & L3 practitioners to mentor peer networks, author practical case study templates, and reduce ER triage bottlenecks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Platform Roadmap</h2>
          </div>

          <div className="space-y-8 relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-surface-200" />
            {[
              { year: "2024", title: "Launch of L1 Foundation Tracks", desc: "Introduced foundational MCQ and proctored modules for hospital admin graduates." },
              { year: "2025", title: "EMR & NABH 5th Edition Modules", desc: "Integrated digital clinical case proctor simulations in partnerships with major regional hubs." },
              { year: "2026", title: "National Institutional Registry Launch", desc: "Cryptographically verifiable digital credential lookups deployed globally." }
            ].map((step, i) => (
              <div key={i} className="relative pl-12">
                <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-primary-600 border-2 border-white" />
                <span className="text-xs font-black text-primary-600 block mb-1">{step.year}</span>
                <h4 className="text-base font-black text-surface-900 mb-1">{step.title}</h4>
                <p className="text-xs text-surface-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-surface-200/50 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Join a growing healthcare professional ecosystem</h2>
          <p className="text-sm text-surface-500 font-medium max-w-lg mx-auto leading-relaxed">
            Validate operations competence, join peer discussions, and access verified institutional lookup databases.
          </p>
          <div className="pt-4">
            <Link to="/join" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              Join CHAMP Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
