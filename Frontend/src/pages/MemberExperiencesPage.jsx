import { motion } from "framer-motion";
import "./impact.css";

export default function MemberExperiencesPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Member Experiences</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Voices from the Ecosystem</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                text: "CHAMP 21 changed how I view hospital operations. I'm no longer just following protocols; I'm understanding the 'why' behind them.",
                author: "Ananya R.",
                role: "Patient Coordinator"
              },
              {
                text: "The community discussions on patient dissatisfaction were eye-opening. I applied a shared strategy the next day and saw immediate results.",
                author: "Vikram S.",
                role: "Department Manager"
              },
              {
                text: "Being part of a 'Lead a Session' was a growth milestone for me. It gave me the confidence to share my real-world challenges.",
                author: "Siddharth M.",
                role: "Operations Executive"
              },
              {
                text: "Verification through certification gave me the leverage I needed during my recent career move. Employers value the practical proof.",
                author: "Priya K.",
                role: "Quality Assurance Lead"
              }
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 bg-surface-50 rounded-[3rem] border border-surface-100 italic relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 opacity-5 rounded-bl-full" />
                <p className="text-xl text-surface-700 font-medium mb-8">"{exp.text}"</p>
                <div className="flex items-center gap-4 not-italic">
                  <div className="w-12 h-12 rounded-full bg-surface-900 border-2 border-primary-500" />
                  <div>
                    <h5 className="font-black text-surface-900 text-sm uppercase">{exp.author}</h5>
                    <p className="text-[10px] text-primary-600 font-black tracking-widest uppercase">{exp.role}</p>
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
