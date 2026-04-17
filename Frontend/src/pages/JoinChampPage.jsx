import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./join.css";

export default function JoinChampPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="join-container">
      {/* Hero Section */}
      <section className="join-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">Join CHAMP 21</h1>
            <p className="hero-subtitle max-w-3xl mx-auto text-xl opacity-90">
              Choose to stay relevant in a healthcare system that is constantly evolving.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
              <Link to="/signup" className="btn-primary px-10 py-5">Complete Registration</Link>
              <Link to="/contributor" className="btn-secondary px-10 py-5">Become a Contributor</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Message */}
      <section className="join-section bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-surface-700 leading-relaxed mb-10 font-medium">
              Becoming part of CHAMP 21 is not just about signing up. It is about choosing to stay relevant in a system that is constantly evolving.
            </p>
            <div className="bg-primary-50 p-10 rounded-[2.5rem] border border-primary-100 text-left shadow-sm">
              <p className="text-surface-800 font-bold mb-4">If you are working in healthcare administration or management, you already know this:</p>
              <p className="text-primary-700 font-black text-2xl mb-4 italic">"What you learned earlier may not always help you handle what you face today."</p>
              <p className="text-surface-600 leading-relaxed">CHAMP 21 is built for professionals who are willing to upgrade, adapt, and grow with the realities of the 21st century healthcare environment.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="join-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-surface-900 mb-8 pb-2 border-b-4 border-primary-500 inline-block">Who Should Join</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Starting your career in hospital administration",
                  "Managing departments or operations in a hospital",
                  "Leading teams or making strategic decisions",
                  "Looking to shift into healthcare management",
                  "Interested in understanding how modern healthcare systems function"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-surface-100 transition-all"
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(79,70,229,0.4)]" />
                    <span className="text-surface-700 font-bold">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="join-accent-box shadow-2xl">
                <p className="text-2xl font-black leading-tight mb-6 italic">
                  Whether you are early in your journey or leading an organization, the need to stay updated remains the same.
                </p>
                <div className="w-16 h-1.5 bg-accent-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens After You Join */}
      <section className="join-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-surface-900 mb-16">What Happens After You Join</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: "🗨️", title: "Scenario Discussions", desc: "Participate in real-life case discussions and peer-to-peer logic cycles." },
              { icon: "🛠️", title: "Functional Workshops", desc: "Attend structured sessions focused on operations, quality, and patient safety." },
              { icon: "🏥", title: "On-Site Immersion", desc: "Engage in hospital visits to witness 21st-century systems in action." },
              { icon: "🤝", title: "Elite Networking", desc: "Connect with dedicated professionals across different roles and regions." },
              { icon: "📋", title: "Assessment Prep", desc: "Prepare for and attempt the multi-level CHAMP 21 Certification." },
              { icon: "✨", title: "Co-Creation", desc: "Contribute by sharing your own experiences and strengthen the ecosystem." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="join-card"
              >
                <div className="join-step-icon">{feature.icon}</div>
                <h4 className="font-black text-xl mb-3 text-surface-900">{feature.title}</h4>
                <p className="text-sm text-surface-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 p-8 bg-surface-900 rounded-3xl inline-block">
            <p className="text-2xl font-black text-accent-400 uppercase tracking-wider">This is not a one-time experience.</p>
            <p className="text-white font-bold text-lg mt-2">It is an ongoing, high-stakes professional engagement.</p>
          </div>
        </div>
      </section>

      {/* Your Role in the Community */}
      <section className="join-section bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-surface-900 mb-8">Your Role in the Community</h2>
          <p className="text-surface-600 mb-12 italic text-xl leading-relaxed font-medium">
            CHAMP 21 works on a co-creative model. You are not expected to just attend and listen—you are encouraged to think, question, and participate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-10 rounded-[2.5rem] border border-surface-200 shadow-sm">
              <h4 className="font-black mb-4 text-primary-600 uppercase tracking-widest text-sm">Contribute & Guide</h4>
              <p className="text-surface-700 leading-relaxed font-medium">If you have experience, you can share and guide others. Over time, every member has the opportunity to become a pillar of the community.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-surface-200 shadow-sm">
              <h4 className="font-black mb-4 text-primary-600 uppercase tracking-widest text-sm">Engage & Grow</h4>
              <p className="text-surface-700 leading-relaxed font-medium">If you are starting out, you can actively engage, shadow practitioners, and grow within a system that values real learning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Approach */}
      <section className="join-section bg-white text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 mb-6">Membership Approach</h2>
          <p className="text-xl text-surface-500 mb-16 max-w-2xl mx-auto font-medium">
            The focus is not on numbers, but on meaningful participation. Members are expected to stay aligned with the community's standards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Stay actively engaged", "Respect professional boundaries", "Contribute constructively", "Be open to learning"].map((item, i) => (
              <div key={i} className="p-6 bg-surface-50 rounded-2xl font-black text-sm text-surface-800 border-b-4 border-primary-500 shadow-sm">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-16 text-surface-400 font-bold text-sm uppercase tracking-[0.2em]">Ensuring Excellence through participation</p>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="join-cta-section join-section">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-surface-900 mb-6 leading-tight">Why Join Now?</h2>
          <p className="text-xl text-surface-600 mb-16 leading-relaxed max-w-3xl mx-auto">
            Healthcare systems are changing rapidly. Professionals who adapt early gain clarity and confidence. Those who rely on older methods often struggle to survive today's industry demands.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-16 rounded-[4rem] border border-surface-200 shadow-2xl"
          >
            <h3 className="text-4xl font-black text-surface-900 mb-6">Take the Next Step</h3>
            <p className="text-surface-600 mb-12 text-xl font-medium leading-relaxed">Ready to move beyond outdated approaches and become part of a shared growth ecosystem?</p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link to="/signup" className="btn-primary px-10 py-5">Join CHAMP</Link>
              <Link to="/certification" className="btn-outline-dark px-10 py-5">Explore Certification</Link>
              <Link to="/contributor" className="btn-outline-dark px-10 py-5">Become a Contributor</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
