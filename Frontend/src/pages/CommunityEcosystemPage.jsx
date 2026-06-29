import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CommunityEcosystemPage() {
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
            CHAMP Ecosystem Network
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            Join the Healthcare Community
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Connect with certified administrators, exchange clinical operations workflows, and participate in peer discussions to solve real-world healthcare delivery challenges.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link to="/join-community" className="btn-primary font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all">
              Join the Community
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Visual Platform Showcase */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-[3rem] border border-surface-200 bg-gradient-to-tr from-white to-primary-50/10 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 space-y-6">
                <span className="text-[10px] text-primary-600 font-black uppercase tracking-widest block">Live Platform Workspace</span>
                <h3 className="text-2xl font-black text-surface-900 leading-tight">Dynamic Discussions & Operations Insights</h3>
                <p className="text-sm text-surface-500 leading-relaxed font-medium">
                  A place where clinicians and operators ask questions, publish Case Studies, and critique audit frameworks in real time.
                </p>
              </div>
              <div className="lg:col-span-8 bg-surface-50 p-6 rounded-[2rem] border border-surface-150 space-y-4">
                <div className="bg-white p-4 rounded-xl border border-surface-200 flex gap-4 items-center">
                  <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                  <div>
                    <h5 className="text-xs font-black text-surface-900">c/QualityAssurance • Dr. Jacob Varghese</h5>
                    <p className="text-[11px] text-surface-500 font-medium">Draft guidelines for emergency-room triage audit under NABH 5th edition.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-surface-200 flex gap-4 items-center">
                  <div className="w-1.5 h-8 bg-primary-500 rounded-full" />
                  <div>
                    <h5 className="text-xs font-black text-surface-900">c/HospitalOps • Priya Sharma</h5>
                    <p className="text-[11px] text-surface-500 font-medium">Standard Operating Procedure for critical incident escalation paths during night shifts.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">Structured Community Domains</h2>
            <p className="text-surface-500 font-medium mt-3">We cluster operations discussions to help you locate domain-specific solutions easily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Case Discussions", desc: "Collaborate on real emergency triage, patient safety incidents, and flow bottlenecks.", icon: "🏥" },
              { title: "Knowledge Sharing", desc: "Access standard operating procedures, documentation checklists, and audit sheets.", icon: "📚" },
              { title: "Research & Innovation", desc: "Critique healthcare technologies, EMR implementation trials, and administrative studies.", icon: "🔬" },
              { title: "Networking Circles", desc: "Direct messaging and mentorship routes with verified hospital administrators.", icon: "🤝" },
              { title: "Operations Management", desc: "Optimize billing bottlenecks, inventory scheduling, and workforce allocations.", icon: "📊" },
              { title: "Clinical Business", desc: "Review revenue cycle pathways, insurance compliance, and corporate models.", icon: "💼" }
            ].map((feat, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-surface-200 hover:border-primary-500 hover:shadow-lg transition-all">
                <span className="text-3xl mb-4 block">{feat.icon}</span>
                <h4 className="text-lg font-black text-surface-900 mb-2">{feat.title}</h4>
                <p className="text-xs text-surface-500 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending & Contributors Preview */}
      <section className="py-20 bg-white border-y border-surface-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-2xl font-black text-surface-900 tracking-tight">Trending Peer Discussions</h3>
            <div className="space-y-4">
              {[
                { title: "Best practices for EMR compliance training for senior medical staff?", replies: 38, category: "DigitalHealth" },
                { title: "Reducing outpatient waiting times in pediatric departments during monsoon peaks", replies: 27, category: "HospitalOps" },
                { title: "Addressing staffing shortages in night-shift ICU nursing units legally", replies: 19, category: "QualityAssurance" }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-surface-50 border border-surface-150 flex justify-between items-center hover:border-primary-400 transition-colors">
                  <div>
                    <span className="text-[9px] text-primary-600 font-black uppercase tracking-widest block mb-2">{item.category}</span>
                    <h4 className="text-sm font-black text-surface-900">{item.title}</h4>
                  </div>
                  <span className="text-xs font-black text-surface-400 bg-white px-3 py-1.5 rounded-full border border-surface-150">
                    💬 {item.replies} Replies
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-2xl font-black text-surface-900 tracking-tight">Featured Contributors</h3>
            <div className="space-y-4">
              {[
                { name: "Dr. Rajesh Kurup", role: "Chief Medical Officer", cert: "L3 certified" },
                { name: "Priya Sharma", role: "Quality QA Director", cert: "L2 certified" },
                { name: "Amit Verma", role: "Hospital CIO", cert: "L2 certified" }
              ].map((user, i) => (
                <div key={i} className="p-4 rounded-2xl bg-surface-50 border border-surface-150 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-sm">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-surface-900">{user.name}</h4>
                    <p className="text-[10px] text-surface-400 font-bold uppercase tracking-wider">{user.role} • {user.cert}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Statistics */}
      <section className="py-20 bg-surface-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-4xl font-extrabold block mb-2">5,000+</span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">Active Discussion Threads</span>
          </div>
          <div>
            <span className="text-4xl font-extrabold block mb-2">350+</span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">Verified Case Studies</span>
          </div>
          <div>
            <span className="text-4xl font-extrabold block mb-2">10,000+</span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">Ecosystem Members</span>
          </div>
          <div>
            <span className="text-4xl font-extrabold block mb-2">99.8%</span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">Helpful Response Rate</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Ready to join the network?</h2>
          <p className="text-sm text-surface-500 font-medium max-w-lg mx-auto leading-relaxed">
            Gain real clinical perspectives, verify your experience level, and network with active managers now.
          </p>
          <div className="pt-4">
            <Link to="/join-community" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              Join Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
