import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./community.css";

export default function CommunityNarrativePage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="community-container">
      {/* Hero Section */}
      <section className="community-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white">Join the Community</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              CHAMP 21 Professional Network
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Start with the Community */}
      <section className="community-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Why Start with the Community</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">Before any certification, before any assessment, there is one thing that matters more: Understanding the reality you are working in.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <p>Many professionals move from one role to another, attend programs, collect certifications, but still feel uncertain when facing real situations.</p>
                  <p className="font-bold text-surface-900">The gap is not always knowledge. The gap is exposure, perspective, and practical understanding.</p>
                </div>
                <div className="bg-surface-50 p-8 rounded-[2.5rem] border border-surface-100 italic font-medium">
                  "CHAMP 21 Community is where that begins. It is a space where healthcare professionals come together to build clarity before formal evaluation."
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Understand current challenges",
                  "Discuss real situations",
                  "Learn from each other’s experiences",
                  "Build clarity before evaluation"
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-surface-900 text-white rounded-2xl text-center font-black text-xs">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Experience Inside */}
      <section className="community-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-surface-900 mb-6">What You Experience Inside the Community</h2>
            <p className="text-lg text-surface-600 font-medium italic">"Once you join, you step into an active, working environment. You will not just receive information. You will engage with real conversations."</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Real Scenario Discussions", desc: "Members bring situations from their workplace and explore how to approach them." },
              { title: "Peer Learning Across Levels", desc: "Entry-level professionals understand ground realities faster. Managers refine decision-making. Leaders share perspective." },
              { title: "Guided Learning Sessions", desc: "Focused sessions on operations, quality, patient handling, and management challenges." },
              { title: "Continuous Exposure", desc: "Discussions are aligned with what is happening now, not what was relevant years ago." },
            ].map((item, i) => (
              <motion.div key={i} className="narrative-card">
                <h4 className="text-xl font-black text-primary-700 mb-4">{item.title}</h4>
                <p className="text-surface-600 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Creative Learning in Action */}
      <section className="community-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-surface-900 mb-8">Co-Creative Learning in Action</h2>
          <p className="text-lg text-surface-600 mb-12 font-medium">This community does not separate “learners” and “teachers.” Everyone has a role.</p>
          
          <div className="space-y-6">
            {[
              { lvl: "Early Career", role: "You bring fresh observations and questions" },
              { lvl: "Experienced", role: "You bring practical insights and approaches" },
              { lvl: "Leader", role: "You bring clarity in decision-making and direction" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row shadow-sm">
                <div className="bg-surface-900 text-white p-6 md:w-48 font-black uppercase tracking-widest text-xs flex items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                  {item.lvl}
                </div>
                <div className="bg-surface-50 p-6 flex-1 text-left font-bold text-surface-700 border border-surface-200 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
                  {item.role}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6 text-sm font-black text-primary-600">
             <span>LEARNERS BECOME CONTRIBUTORS</span>
             <div className="w-8 h-px bg-surface-200" />
             <span>CONTRIBUTORS BECOME MENTORS</span>
          </div>
          <p className="mt-6 text-surface-400 font-bold uppercase tracking-widest text-xs italic">A system where knowledge is continuously built and refined</p>
        </div>
      </section>

      {/* How This Helps Before Certification */}
      <section className="community-section bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-16 rounded-[4rem] border border-surface-200 shadow-xl">
              <h2 className="text-3xl font-black text-surface-900 mb-8">How This Helps You Before Certification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6 text-surface-600">
                   <p>Many professionals attempt assessments without fully understanding real-world expectations.</p>
                   <p className="font-bold text-surface-900 text-xl">By joining the community first, you gain exposure to real hospital scenarios and improve your thinking structure.</p>
                </div>
                <ul className="space-y-4">
                  {[
                    "Gain exposure to real hospital scenarios",
                    "Understand how professionals approach problems",
                    "Improve your thinking and response structure",
                    "Identify gaps in your own approach"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-4 bg-surface-50 p-4 rounded-xl border border-surface-100">
                      <div className="w-2 h-2 bg-primary-600 rounded-full" />
                      <span className="font-black text-sm text-surface-800">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-center mt-12 font-black text-primary-600 italic">"This makes the certification more meaningful and more reflective of your true capability."</p>
           </div>
        </div>
      </section>

      {/* Who Should Join First */}
      <section className="community-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-surface-900 mb-16 underline decoration-accent-500 decoration-8 underline-offset-8">Who Should Join First</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Want to build confidence before attempting certification",
              "Feel unsure about handling real situations",
              "Want to learn from professionals across India",
              "Looking for practical understanding, not just theory"
            ].map((text, i) => (
              <div key={i} className="p-8 bg-surface-900 text-white rounded-[2.5rem] font-bold text-sm h-full flex items-center justify-center leading-relaxed">
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is Expected from You */}
      <section className="community-section bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-surface-900 mb-8">What Is Expected from You</h2>
          <p className="text-lg text-surface-600 mb-12 font-medium">This is a professional space built on mutual respect and active participation.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {[
              "Engage in discussions thoughtfully",
              "Respect confidentiality boundaries",
              "Contribute where possible",
              "Stay open to learning and adapting"
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-surface-200 flex items-center gap-4">
                <div className="w-6 h-6 bg-primary-600 text-white rounded-lg flex items-center justify-center font-black text-xs">✓</div>
                <span className="font-bold text-surface-800">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-12 text-surface-400 font-black italic underline underline-offset-4 decoration-primary-300">"The value of the community depends on how its members participate."</p>
        </div>
      </section>

      {/* A Different Way to Learn */}
      <section className="community-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-surface-900">
           <h2 className="text-3xl font-black mb-16 uppercase tracking-tighter">A Different Way to Learn</h2>
           <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="bg-surface-50 p-12 rounded-[50%] w-64 h-64 flex flex-col items-center justify-center border border-surface-200">
                <span className="text-xs uppercase font-black text-surface-400 mb-2">Most Systems</span>
                <p className="font-black text-xl">Tell you WHAT to do</p>
              </div>
              <div className="w-12 h-px bg-surface-200 hidden md:block" />
              <div className="bg-surface-900 text-white p-12 rounded-[50%] w-80 h-80 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="text-xs uppercase font-black text-primary-400 mb-4 relative z-10">CHAMP 21 Helps you Understand</span>
                <div className="space-y-1 relative z-10">
                  <p className="font-black text-2xl">WHY it works</p>
                  <p className="font-black text-2xl">WHEN it works</p>
                  <p className="font-black text-2xl text-accent-400">HOW to adapt it</p>
                </div>
              </div>
           </div>
           <p className="mt-20 max-w-2xl mx-auto font-black italic text-surface-600">
             That difference is what prepares you for the realities of today’s healthcare system.
           </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="community-cta-section text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl md:text-5xl font-black text-surface-900 mb-8 leading-tight">Take the First Step</h2>
           <p className="text-xl text-surface-600 mb-16 leading-relaxed font-medium">If you want to grow in healthcare administration, start by understanding the system you are part of.</p>
           
           <div className="bg-white p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <p className="text-2xl font-black text-surface-900 mb-12">Join the CHAMP 21 Community and begin your journey with real learning, real discussions, and real perspectives.</p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link to="/signup" className="btn-primary px-10 py-5">Join CHAMP</Link>
                <Link to="/certification" className="btn-outline-dark px-10 py-5">Explore Certification</Link>
                <Link to="/contributor" className="btn-outline-dark px-10 py-5">Become a Contributor</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
