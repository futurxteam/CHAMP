import { motion } from "framer-motion";
import "./impact.css";

export default function MetricsPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Community Metrics</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">The Scale of our Ecosystem</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Verified Members", val: "5,000+" },
              { label: "Hospital Partners", val: "25+" },
              { label: "Active Countries", val: "1 (India)" },
              { label: "Avg Engagement", val: "18h/mo" },
              { label: "Bootcamps Led", val: "150+" },
              { label: "Employer Inquiries", val: "300+" },
              { label: "Certification Attempts", val: "1,200+" },
              { label: "Resource Downloads", val: "10k+" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 bg-surface-50 rounded-3xl border border-surface-100"
              >
                <div className="text-3xl font-black text-primary-600 mb-2">{stat.val}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-surface-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 max-w-4xl mx-auto">
            <div className="p-12 border-4 border-surface-900 rounded-[4rem]">
              <h4 className="text-2xl font-black text-surface-900 mb-6 uppercase italic underline decoration-primary-500 underline-offset-8">Engagement Intensity</h4>
              <p className="text-lg text-surface-500 font-medium">Metrics at CHAMP 21 focus on **contribution** rather than just numbers. We track how many professionals are actively sharing insights, leading sessions, and improving their decision-making clarity.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
