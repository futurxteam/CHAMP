import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./membership.css";

export default function MembershipPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="membership-container">
      {/* Hero */}
      <section className="membership-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">MEMBERSHIP</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Clear, Transparent, and Built for Real Value
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="membership-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block uppercase tracking-tighter">Membership Overview</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">CHAMP 21 membership is not about access alone. It is about active participation in a system designed for continuous growth.</p>
              
              <p>Healthcare administration today requires professionals to stay updated, build decision-making ability, and learn from real situations—not just theory. Membership gives you structured access to this reality.</p>
              
              <div className="bg-surface-50 p-12 rounded-[4rem] border border-surface-200 mt-12">
                 <h4 className="text-sm font-black uppercase tracking-[0.2em] text-surface-400 mb-6">Simple Expectation</h4>
                 <p className="text-2xl font-black text-surface-900 leading-snug">"You do not just consume. You engage, learn, and contribute."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans & Benefits */}
      <section className="membership-section bg-surface-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 text-center mb-16 uppercase tracking-tighter">Plans & Benefits</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  t: "Core Benefits", 
                  d: "The foundation for every member.",
                  points: ["Community discussions", "Case-based learning", "Real-world scenario exposure", "National networking"]
                },
                { 
                  t: "Enhanced Benefits", 
                  d: "For those intensifying their growth.",
                  points: ["Skill bootcamps & workshops", "Mentorship circles", "Priority access to events", "Certification prep support"]
                },
                { 
                  t: "Advanced Engagement", 
                  d: "For the community's active leaders.",
                  points: ["Lead sessions & workshops", "Certification development", "Community recognition", "Career & Employer connections"]
                }
              ].map((plan, i) => (
                <div key={i} className="plan-tier-card">
                   <h5 className="text-[10px] font-black tracking-[0.3em] text-primary-600 uppercase mb-4">Tier 0{i+1}</h5>
                   <h4 className="text-2xl font-black text-surface-900 mb-4">{plan.t}</h4>
                   <p className="text-xs text-surface-400 font-bold mb-8 italic">{plan.d}</p>
                   <div className="space-y-4">
                      {plan.points.map((p, j) => (
                         <div key={j} className="flex gap-3 text-sm font-bold text-surface-600">
                           <span className="text-accent-500">✓</span> {p}
                         </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
           <p className="text-center mt-12 text-sm font-black text-surface-400 italic">"Focus is not on features alone, but on how effectively members use them."</p>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="membership-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-black text-surface-900 mb-10 uppercase tracking-tighter">Who Should Join</h2>
                 <p className="text-lg text-surface-500 mb-8 font-medium">Open to all connected to healthcare administration willing to grow beyond outdated approaches.</p>
                 <div className="space-y-3">
                    {["Early professional / Student", "Hospital executive / Coordinator", "Department/Ops Manager", "Quality, HR or Admin team", "Senior Leader / Decision-maker", "Moving into healthcare mgmt"].map((role, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-surface-50 rounded-xl font-bold text-surface-800 text-xs italic border border-surface-100">
                        <span className="text-primary-600 font-black">✓</span> {role}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 bg-surface-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-primary-600 opacity-20 rounded-bl-full" />
                 <h2 className="text-3xl font-black mb-10 leading-snug">Selection is based on intent, not designation.</h2>
                 <p className="text-surface-400 font-medium mb-12">Join if you want to stay relevant in a changing system and are open to sharing your real-world experiences.</p>
                 <div className="h-1 w-20 bg-accent-500 rounded-full" />
              </div>
           </div>
        </div>
      </section>

      {/* How To Join */}
      <section className="membership-section bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">How to Join</h2>
           <div className="join-step-row">
              {[
                { s: "1", t: "Registration", d: "Complete basic and professional details." },
                { s: "2", t: "Select Plan", d: "Choose level based on your engagement needs." },
                { s: "3", t: "Access", d: "Get immediate entry to the community structure." },
                { s: "4", t: "Participate", d: "Engage in discussions, learning and activities." },
                { s: "5", t: "Explore", d: "Discover certification and career opportunities." }
              ].map((step, i) => (
                <div key={i} className="join-step-card">
                   <div className="step-number-circle">{step.s}</div>
                   <div>
                     <h4 className="font-black text-surface-900 leading-none mb-1">{step.t}</h4>
                     <p className="text-sm text-surface-500 font-medium">{step.d}</p>
                   </div>
                </div>
              ))}
           </div>
           <p className="text-center mt-12 text-primary-600 font-black italic">"Value begins when you start participating."</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="membership-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-20 uppercase tracking-widest">FAQs</h2>
           <div className="faq-grid">
              {[
                { q: "Only for experienced?", a: "No. Professionals at all levels join. Learning happens through shared experiences." },
                { q: "Need prior knowledge?", a: "No. What matters is your willingness to learn and engage." },
                { q: "Similar to an online course?", a: "No. This is a continuous learning ecosystem, not a one-time course." },
                { q: "Early career contribution?", a: "Yes. Based on relevance and clarity, not seniority." },
                { q: "Certification mandatory?", a: "No. Recommended for those wishing to assess and demonstrate capability." },
                { q: "Time investment?", a: "Depends on your goals. More engagement equals more gained value." }
              ].map((faq, i) => (
                <div key={i} className="faq-item">
                   <h5 className="font-black text-surface-900 mb-4">{faq.q}</h5>
                   <p className="text-sm text-surface-500 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="membership-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <h2 className="text-3xl font-black text-surface-900 mb-6">Ready to Grow with Today's Healthcare Realities?</h2>
              <p className="text-xl text-surface-500 mb-12 font-medium">This is where you begin.</p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link to="/join" className="btn-primary px-12 py-5">Join CHAMP</Link>
                <button className="btn-outline-dark px-12 py-5">Explore Membership Plans</button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
