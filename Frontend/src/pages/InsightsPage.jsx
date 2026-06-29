import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function InsightsPage() {
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
            CHAMP Intelligence & Insights
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            Healthcare Management Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Stay updated with proctored operations case studies, compliance breakdowns, and clinical administration research papers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link to="/blogs" className="btn-primary font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all">
              Browse Articles
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Highlight Card */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-[3.5rem] border border-surface-200 bg-gradient-to-tr from-white to-primary-50/5 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[9px] text-primary-600 font-black uppercase tracking-widest bg-primary-50 px-2.5 py-1 rounded-full inline-block">Featured Analysis</span>
                <h3 className="text-2xl md:text-3xl font-black text-surface-900 leading-tight">Optimizing Emergency Room Triage Delays under NABH 5th Edition Frameworks</h3>
                <p className="text-sm text-surface-500 leading-relaxed font-medium">
                  A structured retrospective study detailing how active digital workflow tracking in major regional wards reduced patient transfer times by 18 minutes.
                </p>
                <div className="flex gap-4 text-xs font-bold text-surface-400">
                  <span>By Dr. Rajesh Kurup</span>
                  <span>•</span>
                  <span>10 Min Read</span>
                </div>
              </div>
              <div className="lg:col-span-4 text-left lg:text-right">
                <Link to="/blogs" className="inline-block px-8 py-4 bg-surface-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-surface-800 transition-colors">
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending & Articles Grid */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <h3 className="text-2xl font-black text-surface-900 tracking-tight">Latest Clinical Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Standardizing escalation pathways for nocturnal nursing teams", category: "HospitalOps", author: "Priya Sharma", time: "6 Min Read" },
                  { title: "Review of telemetry pipelines and EMR security checks", category: "Technology", author: "Amit Verma", time: "8 Min Read" },
                  { title: "Addressing discharge delays through automated billing checks", category: "Finance", author: "Ananya Iyer", time: "5 Min Read" },
                  { title: "Building patient safety audits under high ICU volumes", category: "QualityQA", author: "Dr. Jacob Varghese", time: "12 Min Read" }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-white border border-surface-200 hover:border-primary-400 transition-colors flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-primary-600 font-black uppercase tracking-widest block mb-2">{item.category}</span>
                      <h4 className="text-sm font-black text-surface-900 mb-4">{item.title}</h4>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-surface-400 border-t border-surface-100 pt-4 mt-4">
                      <span>{item.author}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <h3 className="text-2xl font-black text-surface-900 tracking-tight">Research & Publications</h3>
              <div className="space-y-4">
                {[
                  { title: "Retrospective ER Workflow Optimization Report", downloads: "250+ Downloads", format: "PDF" },
                  { title: "NABH 5th Edition Audit Readiness Template", downloads: "410+ Downloads", format: "DOCX" }
                ].map((doc, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-surface-200 flex justify-between items-center hover:border-primary-400 transition-colors">
                    <div>
                      <h4 className="text-xs font-black text-surface-900 mb-1">{doc.title}</h4>
                      <span className="text-[10px] text-surface-400 font-semibold">{doc.downloads}</span>
                    </div>
                    <span className="text-[9px] font-black text-primary-600 bg-primary-50 px-2 py-1 rounded">
                      {doc.format}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-surface-200/50 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Want to contribute an article?</h2>
          <p className="text-sm text-surface-500 font-medium max-w-lg mx-auto leading-relaxed">
            Certified L2 & L3 operators have authoring routes to publish case studies and research reports.
          </p>
          <div className="pt-4">
            <Link to="/contributor" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              Apply as Contributor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
