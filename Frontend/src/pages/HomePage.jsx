import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./home.css";

export default function HomePage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              CHAMP 21
            </motion.h1>
            <p className="hero-subtitle">
              Certified Healthcare Administration and Management Professionals for the 21st Century
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link to="/join" className="btn-primary">Join CHAMP 21</Link>
              <Link to="/certification" className="btn-secondary">Explore Certification</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Message */}
      <section className="home-section bg-white">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="section-title"> 21st Century Readiness</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p>
                Healthcare today is not what it was even a decade ago.
              </p>
              <p>
                Patient expectations are higher. Systems are more complex. Decisions need to be faster, more accountable, and more transparent. Technology is influencing every layer of care delivery. At the same time, hospitals are expected to maintain quality, control costs, and ensure patient safety without compromise.
              </p>
              <p>
                Yet, much of what professionals rely on today—frameworks, approaches, and training—has its roots in a different time.
              </p>
              <div className="bg-primary-50 p-10 rounded-[2.5rem] border-l-8 border-primary-600 my-12 shadow-sm">
                <p className="text-primary-900 font-black text-2xl mb-4 leading-tight">CHAMP 21 is built on a simple and necessary shift:</p>
                <p className="text-surface-800 text-xl font-semibold mb-6">Healthcare systems have entered the 21st century. <br /><span className="text-primary-700">The people managing them must be prepared for it.</span></p>
                <p className="text-surface-600 italic leading-relaxed">
                  This platform exists to help healthcare administration and management professionals move beyond outdated thinking and develop the clarity, adaptability, and decision-making ability required in today’s environment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="home-section bg-surface-50">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Who This Is For</h2>
            <p className="text-surface-600 max-w-3xl mx-auto mt-4">
              CHAMP 21 is designed for professionals across the healthcare system who are directly or indirectly responsible for how hospitals function.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Entry-Level Executives",
                desc: "Professionals who are starting their journey and are trying to understand how real hospital systems operate beyond textbooks. They need clarity, exposure, and confidence."
              },
              {
                title: "Mid-Level Managers",
                desc: "Professionals handling departments, teams, and daily operations. They are expected to deliver results, often without structured support that reflects current challenges."
              },
              {
                title: "Senior Leaders & CXOs",
                desc: "Decision-makers responsible for quality, operations, finances, and long-term direction. They need perspectives that go beyond traditional approaches."
              }
            ].map((role, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="feature-card"
              >
                <h3 className="text-xl font-black text-primary-700 mb-4">{role.title}</h3>
                <p className="text-surface-600 text-sm leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-lg font-bold text-surface-400 italic mt-16 max-w-3xl mx-auto">
            "What connects all of them is a shared reality: They are working in a system that is evolving faster than the way they were trained for it."
          </div>
        </div>
      </section>

      {/* What Members Gain */}
      <section className="home-section bg-white">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What Members Gain</h2>
            <p className="text-surface-600 mt-4">Being part of CHAMP 21 is not about passive learning. It is about becoming more capable in real situations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Clarity in Decision-Making", desc: "Members learn how to approach real problems in structured ways, instead of reacting without direction." },
              { title: "Exposure to Real Scenarios", desc: "Learning is built around situations that actually occur in hospitals—patient complaints, operational bottlenecks, accreditation challenges, team issues." },
              { title: "Confidence in Handling Responsibilities", desc: "Through continuous engagement, members develop the ability to handle situations with more assurance." },
              { title: "Access to a Professional Network", desc: "A community of professionals across India who are dealing with similar challenges, sharing insights, and supporting each other." },
              { title: "Career Growth with Relevance", desc: "Opportunities, guidance, and preparation aligned with what hospitals are actually looking for today." },
            ].map((gain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-surface-50 border border-surface-100 hover:bg-primary-50 transition-colors"
              >
                <h4 className="font-extrabold text-surface-900 mb-3">{gain.title}</h4>
                <p className="text-sm text-surface-600 leading-relaxed font-medium">{gain.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Highlight */}
      <section className="home-section cert-section">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-black mb-8 leading-tight">Certification Highlight – CHAMP 21 Assessment</h2>
              <div className="space-y-6 text-surface-600 leading-relaxed">
                <p className="text-lg font-bold text-surface-900">In many cases, certifications measure what a professional knows. But in real hospital environments, what matters is how a professional thinks, decides, and acts.</p>
                <p>The CHAMP 21 Certification is designed to reflect this reality. It is a structured, multi-level assessment for Entry-Level, Mid-Level, and Senior professionals.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                  {[
                    "Real scenario-based problem solving",
                    "Objective understanding of concepts",
                    "Case analysis and decision-making",
                    "Situational judgment",
                    "Practical application via simulations"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center text-[10px] text-white font-bold">✓</div>
                      <span className="text-sm font-bold text-surface-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-lg">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="cert-card"
              >
                <p className="text-3xl font-black text-surface-900 mb-4 leading-tight">This is not just an exam.</p>
                <p className="text-primary-600 text-xl font-bold mb-8 italic">It is an evaluation of readiness for today’s healthcare environment.</p>
                <p className="text-surface-600 mb-10 leading-relaxed font-medium">Professionals who complete this certification demonstrate that they are prepared not just in theory, but in practice.</p>
                <Link to="/register-certification" className="w-full inline-block text-center py-5 bg-surface-900 text-white font-black rounded-2xl hover:bg-surface-800 transition-all shadow-xl">
                  Begin Assessment
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Community + Co-Creation Model */}
      <section className="home-section bg-white">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Community + Co-Creation Model</h2>
            <p className="text-surface-600 max-w-3xl mx-auto mt-4">Traditional learning often follows a one-way approach—one teaches, others listen. That model is no longer sufficient. CHAMP 21 is built as a co-creative learning system.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-surface-600">
              <p className="text-xl font-semibold text-surface-900 underline decoration-primary-300 decoration-4 underline-offset-4">This means:</p>
              <ul className="space-y-6">
                {[
                  "Professionals do not just learn from structured sessions",
                  "They also learn from each other’s experiences",
                  "Active contributors share real cases, insights, and solutions"
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 flex-shrink-0 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <span className="text-lg font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl" />
              <p className="text-accent-400 font-black mb-6 italic text-lg">In this environment:</p>
              <div className="space-y-4">
                <blockquote className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white italic text-sm leading-relaxed">
                  "A manager handling a real issue can bring it to discussion."
                </blockquote>
                <blockquote className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white italic text-sm leading-relaxed">
                  "Another professional shares how it was handled."
                </blockquote>
                <blockquote className="bg-white/5 p-5 rounded-2xl border border-white/10 text-white italic text-sm leading-relaxed">
                  "A senior leader adds perspective based on experience."
                </blockquote>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-white font-black text-xl leading-snug">
                  A continuous cycle where <span className="text-primary-400 text-gradient">learning is built from real practice</span>, and practice is improved through shared learning.
                </p>
                <p className="text-surface-400 text-xs mt-4 font-bold uppercase tracking-widest">Strengthening the Ecosystem</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Activities */}
      <section className="home-section bg-surface-50">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Key Activities</h2>
            <p className="text-surface-600 mt-4 max-w-2xl mx-auto">CHAMP 21 operates through physical and virtual engagements designed around real-world relevance.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { title: "Hospital Immersion Visits", desc: "Understanding systems in real settings." },
              { title: "City-Level Meetups", desc: "Focused practical discussions." },
              { title: "Leadership Roundtables", desc: "Conversations on evolving demands." },
              { title: "Case-Based Learning", desc: "Analyzing real scenarios." },
              { title: "Skill Bootcamps", desc: "Operations, Quality, Safety." },
              { title: "Healthcare Hackathons", desc: "Collaborative problem-solving." },
              { title: "Community Initiatives", desc: "Beyond hospital walls." },
              { title: "Active Contribution", desc: "Learn by sharing." },
            ].map((activity, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="activity-badge"
              >
                <div className="text-primary-600 mb-2">✦</div>
                <h4 className="font-bold text-surface-900 leading-tight mb-1">{activity.title}</h4>
                <p className="text-[10px] text-surface-400 font-medium uppercase tracking-tighter">{activity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="home-cta-section">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--primary-600)_0%,_transparent_70%)] blur-3xl transform -translate-y-1/2" />
        </div>
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to stay relevant?</h2>
          <div className="space-y-8 text-xl text-surface-600 mb-16 leading-relaxed">
            <p className="font-medium">Healthcare is becoming more demanding, more complex, and more dynamic. The question is whether we are prepared for it.</p>
            <p className="font-black text-surface-900 italic underline underline-offset-[12px] decoration-primary-500 decoration-4">Join a community that is working to build professionals for the healthcare systems of today and tomorrow.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/join" className="btn-primary px-12 py-6 text-xl">Join CHAMP 21</Link>
            <Link to="/contributor" className="btn-outline-dark px-12 py-6 text-xl">Become a Contributor</Link>
          </div>
          <p className="mt-12 text-sm text-surface-500 font-bold uppercase tracking-[0.2em] animate-pulse">
            Beyond Outdated Thinking
          </p>
        </div>
      </section>
    </div>
  );
}
