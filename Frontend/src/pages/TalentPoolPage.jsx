import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./talent_pool.css";

export default function TalentPoolPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="talent-container">
      {/* Hero */}
      <section className="talent-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white uppercase tracking-tighter">Join the CHAMP 21 Talent Pool</h1>
            <p className="text-xl md:text-2xl text-accent-400 font-bold uppercase tracking-widest">
              Be Recognized for What You Can Do
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Talent Pool Exists */}
      <section className="talent-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-black text-surface-900 mb-8 pb-3 border-b-4 border-primary-500 inline-block">Why the Talent Pool Exists</h2>
            <div className="space-y-6 text-lg text-surface-600 leading-relaxed text-left mt-10">
              <p className="font-bold text-surface-900 text-xl text-center mb-10">In healthcare hiring, resumes show qualifications and interviews test communication, but very few systems reflect actual performance.</p>
              
              <div className="bg-surface-50 p-12 rounded-[4rem] border border-surface-100 text-center">
                 <p className="text-xl font-medium mb-6 italic">"The CHAMP 21 Talent Pool bridges this gap. It is a curated group recognized for practical understanding and readiness."</p>
                 <div className="flex justify-center gap-10 text-xs font-black text-primary-600 uppercase tracking-widest">
                   <span>Practical</span> • <span>Decision-Making</span> • <span>Readiness</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="talent-section bg-surface-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1">
                 <h2 className="text-3xl font-black text-surface-900 mb-10 uppercase tracking-tighter">Who Can Join</h2>
                 <p className="text-lg text-surface-500 mb-10 font-medium">Be part of the pool if you show clarity in handling real-world scenarios through the community.</p>
                 <div className="space-y-4">
                    {[
                      "CHAMP 21 Community Member",
                      "Active in learning & discussions",
                      "Attempted/Completed Certification",
                      "Clarified real-world scenarios"
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-surface-200 font-bold text-surface-800 text-sm italic">
                         <span className="text-primary-600">✓</span> {item}
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 bg-surface-900 p-12 rounded-[4rem] text-white shadow-2xl">
                 <h4 className="text-2xl font-black mb-6">Selection is not based on designation alone.</h4>
                 <p className="text-surface-400 leading-relaxed font-medium mb-8 text-lg">It is based on how you think and respond. Every member has the potential to be recognized.</p>
                 <div className="h-1 w-16 bg-accent-500 rounded-full" />
              </div>
           </div>
        </div>
      </section>

      {/* How You Get Selected */}
      <section className="talent-section bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-4 uppercase tracking-tighter">How You Get Selected</h2>
           <p className="text-surface-500 font-medium italic mb-16">Selected through a combination of performance and participation.</p>
           
           <div className="selection-grid">
              {[
                { t: "Certification Performance", d: "Your ability to handle scenario-based assessments." },
                { t: "Community Engagement", d: "Participation in discussions, case analysis, and activities." },
                { t: "Practical Understanding", d: "How clearly you approach real healthcare situations." }
              ].map((item, i) => (
                <div key={i} className="selection-card">
                   <h5 className="font-black text-surface-900 mb-4 uppercase tracking-tighter">{item.t}</h5>
                   <p className="text-sm text-surface-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* What You Gain */}
      <section className="talent-section bg-surface-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">What You Gain</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { t: "Increased Visibility", d: "Your profile is accessible to hospitals and healthcare organizations." },
                { t: "Credibility", d: "Recognized as someone assessed beyond theory." },
                { t: "Better Opportunities", d: "Access to roles matching your readiness." },
                { t: "Career Direction", d: "Clarity on where you stand and how you can grow further." }
              ].map((item, i) => (
                <div key={i} className="gain-bubble">
                   <h5 className="font-black text-surface-900 mb-2">{item.t}</h5>
                   <p className="text-sm text-surface-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="talent-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-black text-surface-900 mb-16 text-center">What Is Expected from You</h2>
           <div className="expectation-list">
              {[
                "Maintain active engagement in the community",
                "Continue learning and improving",
                "Represent professional standards in your work",
                "Stay aligned with current healthcare practices"
              ].map((item, i) => (
                <div key={i} className="expectation-item">
                   <div className="w-8 h-8 rounded-full bg-surface-900 text-white flex items-center justify-center font-black">!</div>
                   <p className="font-bold text-surface-700 text-sm">{item}</p>
                </div>
              ))}
           </div>
           <p className="text-center mt-12 text-surface-400 text-xs font-black uppercase tracking-widest italic">"Consistency ensures the credibility of the pool."</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="talent-section bg-surface-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-surface-200 shadow-2xl">
              <h2 className="text-3xl font-black text-surface-900 mb-12">Position Yourself for Real Progress</h2>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button className="btn-primary px-10 py-5">Apply for Talent Pool</button>
                <Link to="/certification-assessment" className="btn-outline-dark px-10 py-5">Complete Your Certification</Link>
                <Link to="/join" className="btn-outline-dark px-10 py-5">Join CHAMP</Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
