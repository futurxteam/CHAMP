import { motion } from "framer-motion";
import "./impact.css";

export default function CareerStoriesPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Career Growth Stories</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">From Capability to Recognition</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {[
              {
                title: "Accelerating Leadership Readiness",
                story: "After 2 years in hospital admin, Rajesh felt his growth had plateaued. Through CHAMP 21's skill bootcamps and certification, he demonstrated the decision-making clarity needed for a senior role. He was recently promoted to Assistant General Manager (Operations).",
                impact: "40% increase in responsibility within 6 months."
              },
              {
                title: "Bridging the Entry Gap",
                story: "A dental graduate transitioning to management, Sneha lacked 'industry proof'. Participation in the CHAMP 21 Talent Pool and verified certification helped her land a Department Manager role in a leading multispecialty hospital.",
                impact: "Landed role within 4 weeks of certification."
              },
              {
                title: "From Coordinator to Quality Champion",
                story: "Karthik used the 'Insights' section to stay ahead of accreditation changes. His contributions to community discussions on patient flow led to his selection for a hospital-wide quality transformation project.",
                impact: "Selected to lead system-level improvement initiative."
              }
            ].map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-surface-50 p-12 rounded-[4rem] border border-surface-100 flex flex-col md:flex-row gap-12 items-center"
              >
                <div className="flex-shrink-0 w-24 h-24 bg-surface-900 rounded-3xl flex items-center justify-center font-black text-white text-3xl">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-surface-900 mb-4 uppercase tracking-tighter">{story.title}</h3>
                  <p className="text-lg text-surface-500 font-medium leading-relaxed mb-6">{story.story}</p>
                  <div className="inline-block px-6 py-2 bg-primary-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full">
                    Impact: {story.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
