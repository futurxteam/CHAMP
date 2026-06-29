import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MembershipPage() {
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
            CHAMP Membership tiers
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-tight"
          >
            Flexible Plans for Healthcare Leaders
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-600 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Choose a plan that matches your current hospital operations scope and certification ambitions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link to="/pricing" className="btn-primary font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all">
              Compare Membership Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Student Associate",
                price: "Free",
                desc: "For postgraduate administration students seeking to bridge their academic training with ER workflows.",
                features: [
                  "Access to L1 foundational course catalog",
                  "Standard peer discussion boards",
                  "Limited event calendar previews",
                  "Digital verification lookup registered"
                ]
              },
              {
                title: "Professional Operator",
                price: "₹1,999 / mo",
                desc: "For department managers, nurse coordinators, and active operations leads directing daily patient safety QA.",
                features: [
                  "Full L1 & L2 proctored assessment registry",
                  "Priority registration for live city meetups",
                  "Custom operations audit worksheets",
                  "Access to proctored talent database lookup",
                  "Specialized Revenue Cycle management modules"
                ],
                popular: true
              },
              {
                title: "Executive Fellow",
                price: "₹4,999 / mo",
                desc: "For CMOs, administrators, and quality directors shaping strategic compliance checks and long-term planning.",
                features: [
                  "Priority access to proctored certification registries",
                  "Exclusive leadership roundtable slots",
                  "Direct messaging pathways with verified candidates",
                  "Unlimited case study authoring privileges",
                  "Annual Summit VIP guest entry passes"
                ]
              }
            ].map((plan, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-surface-50 border border-surface-200 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden">
                {plan.popular && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary-600 text-white text-[9px] font-black uppercase tracking-wider">
                    Recommended
                  </span>
                )}
                <div>
                  <h3 className="text-xl font-black text-surface-900 mb-2 leading-snug">{plan.title}</h3>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-3xl font-extrabold text-surface-900">{plan.price}</span>
                  </div>
                  <p className="text-xs text-surface-500 font-medium leading-relaxed mb-8">{plan.desc}</p>
                  
                  <div className="space-y-3 mb-8 border-t border-surface-200/50 pt-6">
                    {plan.features.map((feat, j) => (
                      <div key={j} className="flex gap-2.5 items-start text-xs font-semibold text-surface-700">
                        <span className="text-emerald-500 text-sm">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/pricing" className="w-full block py-4 bg-surface-900 text-white hover:bg-surface-800 text-xs font-black uppercase tracking-widest text-center rounded-2xl transition-all">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison Table (Summary Checklist) */}
      <section className="py-20 bg-surface-50 border-t border-surface-200/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-black text-surface-900 tracking-tight">Compare Membership Access</h2>
          </div>

          <div className="bg-white rounded-[2rem] border border-surface-200 overflow-hidden shadow-md">
            <div className="p-6 border-b border-surface-200/50 grid grid-cols-4 text-xs font-black uppercase tracking-wider text-surface-400 bg-surface-50/50">
              <div className="col-span-2">Feature</div>
              <div className="text-center">Free</div>
              <div className="text-center">Pro</div>
            </div>
            {[
              { name: "Clinical Case Discussions", free: "✓", pro: "✓" },
              { name: "Scenario Simulation Exams", free: "Limited", pro: "✓" },
              { name: "CPE Credits Verifications", free: "—", pro: "✓" },
              { name: "Mentorship Roundtables", free: "—", pro: "✓" }
            ].map((row, i) => (
              <div key={i} className="p-6 border-b border-surface-200/50 grid grid-cols-4 text-xs font-bold text-surface-700">
                <div className="col-span-2">{row.name}</div>
                <div className="text-center text-surface-500">{row.free}</div>
                <div className="text-center text-primary-600 font-extrabold">{row.pro}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-surface-200/50 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Ready to access proctor dashboards?</h2>
          <p className="text-sm text-surface-500 font-medium max-w-lg mx-auto leading-relaxed">
            Upgrade your membership plan to unlock custom audit sheets and verify L2 candidate profiles.
          </p>
          <div className="pt-4">
            <Link to="/pricing" className="btn-primary font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20">
              View Detailed Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
