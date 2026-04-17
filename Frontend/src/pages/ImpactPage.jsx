import { Link } from "react-router-dom";
import "./impact.css";

export default function ImpactPage() {
  const hubs = [
    { to: "/impact/member-experiences", t: "Member Experiences", d: "Voices from the ground." },
    { to: "/impact/career-stories", t: "Career Growth", d: "Promotion & shifts." },
    { to: "/impact/organizational", t: "Org Impact", d: "Hospital-level gains." },
    { to: "/impact/metrics", t: "Community Metrics", d: "The scale of impact." }
  ];

  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Impact & Success</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Real results from a professional ecosystem</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
