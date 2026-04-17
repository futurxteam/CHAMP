import "./impact.css";

export default function HelpCenterPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Help Center</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Support for your Professional Journey</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {[
              {
                q: "How do I access my certification and results?",
                a: "Certification results and credentials can be viewed under your Profile dashboard once the assessment is complete. Verified digital certificates are issued automatically for passing scores."
              },
              {
                q: "What is the process for joining the Talent Pool?",
                a: "Eligibility for the Talent Pool is based on active community participation and your performance in the CHAMP 21 Certification. Once you meet the criteria, an option to 'Apply for Talent Pool' will appear on your dashboard."
              },
              {
                q: "Can I upgrade my membership plan later?",
                a: "Yes. You can transition between membership plans anytime from your account settings. Upgrades take effect immediately upon payment confirmation."
              },
              {
                q: "How are community events like bootcamps conducted?",
                a: "Events are a mix of online interactive sessions and offline immersion visits. You can see the format and joining instructions in the [Events] section and in your registration confirmation email."
              }
            ].map((faq, i) => (
              <div key={i} className="p-10 bg-surface-50 rounded-[3rem] border border-surface-100">
                <h4 className="text-xl font-black text-surface-900 mb-4">{faq.q}</h4>
                <p className="text-surface-500 font-medium leading-relaxed italic">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-surface-900 text-white rounded-[4rem] text-center shadow-2xl">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-widest">Still have questions?</h3>
            <p className="text-surface-400 font-medium mb-10">Our community team is available 9 AM - 6 PM IST to help you.</p>
            <button className="btn-primary px-10 py-4 uppercase font-black text-[10px] tracking-widest">Connect with Support</button>
          </div>
        </div>
      </section>
    </div>
  );
}
