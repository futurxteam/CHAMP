import "./impact.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="impact-container">
      <section className="impact-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Privacy Policy</h1>
          <p className="text-xl text-accent-400 font-bold uppercase tracking-widest mt-4">Your Data, Your Ecosystem</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-surface-600 font-medium leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-surface-900 mb-6 uppercase">1. Commitment to Privacy</h2>
              <p>CHAMP 21 is committed to protecting your personal and professional information. We collect data primarily to enhance your learning experience, verify credentials, and connect you with industry opportunities.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-surface-900 mb-6 uppercase">2. Collection of Information</h2>
              <p>We collect information provided during registration (name, professional details, etc.), as well as engagement data from discussions, assessments, and community activities.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-surface-900 mb-6 uppercase">3. Use of Data</h2>
              <p>Your information is used to personalize learning paths, issue verified certifications, and—with your explicit consent—showcase your capability to potential employers within our Talent Pool.</p>
            </section>
            <section>
              <h2 className="text-2xl font-black text-surface-900 mb-6 uppercase">4. Data Protection</h2>
              <p>We implement industry-standard security measures to ensure your professional credentials and personal data are protected from unauthorized access.</p>
            </section>
          </div>
          <p className="mt-20 text-sm font-black text-surface-400 uppercase tracking-widest text-center italic">"Last Updated: April 2026"</p>
        </div>
      </section>
    </div>
  );
}
