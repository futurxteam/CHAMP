import "./impact.css";

export default function TermsConditionsPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Terms & Conditions</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Governing our Community Ecosystem</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-surface-600 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-surface-900 mb-6 uppercase tracking-tighter">1. Acceptance of Terms</h2>
              <p>By accessing the CHAMP 21 platform, you agree to become part of a professional ecosystem built on mutual respect, integrity, and active participation. These terms govern all interactions, learning activities, and certifications.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-surface-900 mb-6 uppercase tracking-tighter">2. Professional Conduct</h2>
              <p>Members are expected to maintain the highest standards of professional etiquette in discussions and community activities. Scenario-based learning involves discussing real hospital realities, and confidentiality of shared experiences should be maintained.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-surface-900 mb-6 uppercase tracking-tighter">3. Certification Validity</h2>
              <p>CHAMP 21 certifications are evaluated assessments of practical capability. Any attempt to compromise the integrity of the assessment process will result in immediate termination of membership and revocation of credentials.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-surface-900 mb-6 uppercase tracking-tighter">4. Intellectual Property</h2>
              <p>All learning materials, case studies, and practical frameworks provided on the platform are the property of CHAMP 21 and are for individual professional development only.</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
