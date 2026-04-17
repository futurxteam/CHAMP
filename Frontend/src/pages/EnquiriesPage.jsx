import "./impact.css";

export default function EnquiriesPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">General Enquiries</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">For Media, Institutional, and Strategic Inquiries</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                t: "Media & Press",
                d: "For interview requests, press releases, and media coordination regarding healthcare administration trends.",
                e: "press@champ21.com"
              },
              {
                t: "Strategic Partnerships",
                d: "For organizations looking to lead system-level changes or integrate technology with our learning model.",
                e: "strategic@champ21.com"
              },
              {
                t: "Career Opportunities",
                d: "For professionals looking to join the CHAMP 21 team as community managers, content leads, or technical experts.",
                e: "careers@champ21.com"
              }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-surface-50 rounded-[3rem] border border-surface-100 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-black text-surface-900 mb-6 uppercase tracking-widest">{item.t}</h4>
                  <p className="text-sm text-surface-500 font-medium leading-relaxed mb-10">{item.d}</p>
                </div>
                <div className="pt-6 border-t border-surface-200 font-bold text-primary-600 text-sm">
                  {item.e}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
