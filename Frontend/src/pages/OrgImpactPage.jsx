import { motion } from "framer-motion";
import "./impact.css";

export default function OrgImpactPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Organizational Impact</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Strengthening Hospital Systems</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Efficiency Gains",
                desc: "Hospitals partnering with CHAMP 21 report a marked normalization in day-one performance for new hires from our Talent Pool.",
                metric: "30% faster onboarding"
              },
              {
                title: "Quality Culture",
                desc: "Active participation of staff in scenario-based learning leads to better coordination and fewer operational gaps in critical care areas.",
                metric: "15% reduction in discharge delays"
              },
              {
                title: "Workforce Retention",
                desc: "Investment in verified growth pathways through community engagement improves staff morale and professional longevity.",
                metric: "Higher technical engagement scores"
              }
            ].map((card, i) => (
              <div key={i} className="p-12 bg-surface-900 text-white rounded-[4rem] flex flex-col justify-between shadow-2xl">
                <div>
                  <h4 className="text-2xl font-black mb-6 uppercase tracking-widest text-accent-400">{card.title}</h4>
                  <p className="text-surface-400 font-medium leading-relaxed mb-12">{card.desc}</p>
                </div>
                <div className="text-3xl font-black italic underline decoration-primary-500 decoration-8 underline-offset-8">
                  {card.metric}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-surface-50 p-16 rounded-[4rem] text-center border border-surface-100">
            <h2 className="text-3xl font-black text-surface-900 mb-8 uppercase">A Structural Connecting Layer</h2>
            <p className="text-xl text-surface-500 font-medium italic max-w-3xl mx-auto">"Our goal is not just to train individuals, but to provide hospitals with a reliable ecosystem of evaluated, ready-to-perform management talent."</p>
          </div>
        </div>
      </section>
    </div>
  );
}
