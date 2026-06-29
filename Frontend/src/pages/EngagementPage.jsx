import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EngagementPage() {
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
            CHAMP Learning Academy
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            Advance with Healthcare Experts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Master clinical administration, department flow coordination, and quality standards through expert-led courses and proctored simulations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link to="/join" className="btn-primary font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all">
              Explore Learning Platform
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Featured Course Catalog</h2>
            <p className="text-surface-500 font-medium mt-3">Interactive syllabus modules addressing actual clinical bottlenecks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Hospital Operations & Workflow Optimization",
                instructor: "Dr. Rajesh Kurup, MHA",
                modules: 12,
                duration: "8 hours",
                price: "Free",
                thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop"
              },
              {
                title: "Healthcare Compliance, Quality Audits & NABH Preparation",
                instructor: "Priya Sharma, Quality Director",
                modules: 15,
                duration: "10 hours",
                price: "Premium",
                thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop"
              },
              {
                title: "Digital Health Systems & Electronic Medical Records Integration",
                instructor: "Amit Verma, CIO MedHealth",
                modules: 8,
                duration: "6 hours",
                price: "Free",
                thumbnail: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=400&h=250&fit=crop"
              }
            ].map((course, i) => (
              <div key={i} className="group rounded-[2.5rem] bg-surface-50 border border-surface-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-primary-600 text-white text-[9px] font-black uppercase tracking-wider">
                      {course.price}
                    </span>
                  </div>
                  <div className="p-8">
                    <h4 className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mb-2">{course.instructor}</h4>
                    <h3 className="text-base font-black text-surface-900 mb-4 leading-snug">{course.title}</h3>
                    <div className="flex gap-4 text-xs font-bold text-surface-500">
                      <span>📚 {course.modules} Modules</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0 mt-4">
                  <Link to="/join" className="w-full block py-4 bg-surface-900 text-white rounded-2xl hover:bg-surface-800 font-black text-xs uppercase tracking-widest text-center transition-all">
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Structured Learning Tracks</h2>
            <p className="text-surface-500 font-medium mt-3">Select a specialized domain path to target your career objectives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Clinical Operations", desc: "Patient flow, waiting time reductions, ER triage workflows.", icon: "🏥" },
              { title: "Quality & QA Compliance", desc: "NABH, HIPAA compliance audits, patient safety standards.", icon: "🏅" },
              { title: "Healthcare Technology", desc: "EMR integration, telemetry pipelines, digital analytics tools.", icon: "💻" },
              { title: "Strategic Leadership", desc: "Hospital budget pipelines, revenue cycle leadership, policy audits.", icon: "📈" }
            ].map((cat, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white border border-surface-200 hover:border-primary-400 transition-colors">
                <span className="text-3xl mb-4 block">{cat.icon}</span>
                <h4 className="text-sm font-black text-surface-900 mb-2">{cat.title}</h4>
                <p className="text-[11px] text-surface-500 font-semibold leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Panel */}
      <section className="py-20 bg-white border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Meet the Experts</h2>
            <p className="text-surface-500 font-medium mt-3">Learn directly from clinical coordinators, directors, and quality auditors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Rajesh Kurup, MHA",
                role: "Chief Medical Officer",
                desc: "Over 20 years managing multi-specialty clinical operations and ER workflows in regional health networks.",
                avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&h=120&fit=crop"
              },
              {
                name: "Priya Sharma",
                role: "Quality QA Auditor",
                desc: "Certified NABH compliance auditor specializing in emergency incident proctoring and audit sheets.",
                avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=120&h=120&fit=crop"
              },
              {
                name: "Amit Verma",
                role: "Chief Information Officer",
                desc: "Digital health researcher and integrator with extensive experience installing EMR clusters across India.",
                avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=120&h=120&fit=crop"
              }
            ].map((inst, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-surface-50 border border-surface-200 text-center">
                <img src={inst.avatar} className="w-20 h-20 rounded-full object-cover mx-auto mb-6 shadow-md" alt="" />
                <h4 className="text-base font-black text-surface-900 mb-1">{inst.name}</h4>
                <span className="text-[10px] text-primary-600 font-black uppercase tracking-wider block mb-4">{inst.role}</span>
                <p className="text-xs text-surface-500 font-medium leading-relaxed">{inst.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface-900 text-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to begin learning?</h2>
          <p className="text-sm text-surface-300 font-medium max-w-lg mx-auto leading-relaxed">
            Gain immediate access to free micro-learning courses, select a path, and earn verifiable CPE credits.
          </p>
          <div className="pt-4 flex justify-center gap-4 flex-col sm:flex-row">
            <Link to="/join" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              Join CHAMP Academy
            </Link>
            <Link to="/certification" className="inline-block px-10 py-5 border border-white/20 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
              Certifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
