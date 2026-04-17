import { Link } from "react-router-dom";
import "./impact.css";

export default function SupportPage() {
  const hubs = [
    { to: "/support/contact", t: "Contact Us", d: "Direct support channels." },
    { to: "/support/help-center", t: "Help Center", d: "Troubleshooting & FAQs." },
    { to: "/support/enquiries", t: "General Enquiries", d: "Strategic & Media." }
  ];

  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Support & Enquiries</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">We are here to help you grow</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hubs.map((h, i) => (
              <Link key={i} to={h.to} className="p-10 bg-surface-50 rounded-[3rem] border border-surface-100 hover:border-primary-600 transition-all group">
                <h4 className="text-xl font-black text-surface-900 mb-2 uppercase group-hover:text-primary-600 leading-tight">{h.t}</h4>
                <p className="text-sm text-surface-400 font-medium italic">{h.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
