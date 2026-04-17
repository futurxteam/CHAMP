import "./impact.css";

export default function RefundPolicyPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Refund Policy</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Fairness and Accountability</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-50 p-12 rounded-[4rem] border border-surface-100">
            <h2 className="text-2xl font-black text-surface-900 mb-8 uppercase tracking-widest text-center italic">Subscription & Membership</h2>
            <ul className="space-y-6 text-surface-600 font-medium leading-relaxed">
              <li className="flex gap-4"><span className="text-primary-600 font-black">●</span> Fees for membership and certification assessments are non-refundable once the service has been accessed or the assessment has been attempted.</li>
              <li className="flex gap-4"><span className="text-primary-600 font-black">●</span> Refund requests for technical errors or duplicate charges will be processed within 7-10 working days of verification.</li>
              <li className="flex gap-4"><span className="text-primary-600 font-black">●</span> For event registrations (Bootcamps/Visits), cancellations made 48 hours prior to the session may be eligible for a credit toward a future event.</li>
            </ul>
          </div>

          <div className="mt-20 text-center">
            <p className="text-surface-400 font-black text-xs uppercase tracking-[0.3em] mb-4">Questions regarding payments?</p>
            <p className="text-primary-600 font-black">payments@champ21.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
