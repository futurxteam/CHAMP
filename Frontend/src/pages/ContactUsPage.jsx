import "./impact.css";

export default function ContactUsPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Contact Us</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Connect with the CHAMP 21 Team</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-black text-surface-900 mb-8 uppercase tracking-tighter">Get in Touch</h2>
              <p className="text-lg text-surface-500 mb-12 font-medium">Whether you have questions about membership, certification, or partnerships, our team is here to provide clarity.</p>

              <div className="space-y-8">
                {[
                  { t: "Email", v: "support@champ21.com", i: "✉️" },
                  { t: "Institutional", v: "partners@champ21.com", i: "🏢" },
                  { t: "Location", v: "Mumbai, Maharashtra, India", i: "📍" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-center">
                    <div className="w-12 h-12 bg-surface-900 text-white flex items-center justify-center rounded-2xl text-xl shadow-lg">{item.i}</div>
                    <div>
                      <h5 className="font-black text-surface-900 text-xs uppercase tracking-widest">{item.t}</h5>
                      <p className="font-bold text-surface-500">{item.v}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-50 p-12 rounded-[4rem] border border-surface-100">
              <h3 className="text-2xl font-black text-surface-900 mb-8 uppercase">Send a Message</h3>
              <form className="space-y-4">
                <input type="text" placeholder="FULL NAME" className="w-full p-4 bg-white border border-surface-200 rounded-2xl font-bold uppercase text-[10px] tracking-widest focus:ring-2 focus:ring-primary-600 outline-none" />
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full p-4 bg-white border border-surface-200 rounded-2xl font-bold uppercase text-[10px] tracking-widest focus:ring-2 focus:ring-primary-600 outline-none" />
                <select className="w-full p-4 bg-white border border-surface-200 rounded-2xl font-bold uppercase text-[10px] tracking-widest focus:ring-2 focus:ring-primary-600 outline-none appearance-none">
                  <option>GENERAL ENQUIRY</option>
                  <option>MEMBERSHIP</option>
                  <option>PARTNERSHIP</option>
                </select>
                <textarea placeholder="HOW CAN WE HELP?" rows={4} className="w-full p-4 bg-white border border-surface-200 rounded-2xl font-bold uppercase text-[10px] tracking-widest focus:ring-2 focus:ring-primary-600 outline-none" />
                <button className="btn-primary w-full py-4 text-xs font-black uppercase tracking-[0.2em]">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
