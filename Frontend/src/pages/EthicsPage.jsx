import "./impact.css";

export default function EthicsPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Code of Ethics</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Integrity in Healthcare Management</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-16 bg-surface-900 text-white rounded-[4rem] mb-12 shadow-2xl">
            <h2 className="text-3xl font-black mb-8 uppercase tracking-[0.2em] underline decoration-accent-500 decoration-8 underline-offset-4">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] font-black uppercase tracking-widest">
              <div className="p-4 border border-surface-700 rounded-2xl">Integrity of Assessment</div>
              <div className="p-4 border border-surface-700 rounded-2xl">Transparency of Intent</div>
              <div className="p-4 border border-surface-700 rounded-2xl">Responsibility to System</div>
            </div>
          </div>

          <div className="text-left space-y-12 max-w-3xl mx-auto">
            {[
              {
                t: "Fair Representation",
                d: "Members must provide accurate information regarding their professional background and experience. Verified credentials are a trust-based bridge to the industry."
              },
              {
                t: "Respectful Collaboration",
                d: "The co-creation of knowledge is a shared responsibility. Diverse perspectives on hospital operations should be handled with professional maturity."
              },
              {
                t: "Commitment to Stewardship",
                d: "As professionals in healthcare, we recognize our role in the stewardship of the system. Our actions and learnings aim to improve patient outcomes and system stability."
              }
            ].map((item, i) => (
              <div key={i} className="pb-8 border-b border-surface-100 last:border-0">
                <h4 className="text-xl font-black text-surface-900 mb-2 uppercase tracking-tighter">{item.t}</h4>
                <p className="text-surface-500 font-medium leading-relaxed italic">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
