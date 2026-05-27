import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import { testApi } from "../api/api";

export default function CertificationListPage() {
  const { token } = useStore();
  const navigate = useNavigate();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await testApi.getCertifications(token);
        setCerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, [token]);

  const handleStart = (certId) => {
    navigate(`/test/${certId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-surface-500 text-sm">Loading certifications…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <h2 className="text-lg font-bold text-red-700 mb-2">Failed to load certifications</h2>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-surface-50 to-primary-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 pt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4">
            🎓 CHAMP Certifications
          </div>
          <h1 className="text-4xl font-extrabold text-surface-900 mb-3">
            Prove Your Expertise
          </h1>
          <p className="text-surface-500 text-lg max-w-xl mx-auto">
            Earn recognized certifications in healthcare domains. Take a proctored assessment and get your certificate instantly.
          </p>
        </motion.div>

        {/* Certification Cards */}
        {certs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-surface-700 mb-2">No certifications available yet</h3>
            <p className="text-surface-500">Check back soon — new certifications are being added.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert, i) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl border border-surface-100 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Card top accent */}
                <div className="h-2 bg-gradient-to-r from-primary-500 to-accent-500" />

                <div className="p-6 flex flex-col flex-1">
                  {/* Domain badge */}
                  <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-primary-50 text-primary-700 rounded-full mb-4 self-start">
                    {cert.domain}
                  </span>

                  <h2 className="text-lg font-bold text-surface-800 group-hover:text-primary-600 transition-colors mb-2 leading-snug">
                    {cert.title}
                  </h2>

                  {cert.description && (
                    <p className="text-sm text-surface-500 leading-relaxed mb-4 line-clamp-3">
                      {cert.description}
                    </p>
                  )}

                  <div className="mt-auto space-y-3">
                    {/* Stats row */}
                    <div className="flex items-center justify-between text-xs text-surface-400">
                      <span className="flex items-center gap-1">
                        📊 Passing score: <strong className="text-surface-600 ml-1">{cert.passingScore}%</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        ❓ {cert.questionPool?.length || 0} questions
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-surface-800">
                        {cert.price === 0 || !cert.price ? (
                          <span className="text-accent-600">Free</span>
                        ) : (
                          <span>₹{cert.price}</span>
                        )}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleStart(cert._id)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/30 active:scale-[0.98]"
                    >
                      Start Test →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
