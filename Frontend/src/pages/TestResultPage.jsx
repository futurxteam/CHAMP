import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TestResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;
  console.log('--- TEST RESULT DEBUG ---');
  console.log('Result State:', result);
  console.log('-------------------------');

  if (!result) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-surface-700 mb-2">No result data found</h2>
          <p className="text-surface-500 mb-6">Please complete a test to see your results.</p>
          <button onClick={() => navigate("/certifications")} className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
            Go to Certifications
          </button>
        </div>
      </div>
    );
  }

  const { score, passed, correct, total, certTitle, passingScore, certificate, recommendations } = result;
  const verificationId = certificate?.verificationId;
  const certificateUrl = certificate?.certificateUrl;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-surface-50 to-primary-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        {/* Result Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`rounded-3xl p-8 text-center mb-8 border ${passed ? "bg-gradient-to-br from-accent-50 to-primary-50 border-accent-200" : "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"}`}
        >
          <div className="text-7xl mb-4">{passed ? "🏆" : "📚"}</div>
          <h1 className={`text-3xl font-extrabold mb-2 ${passed ? "text-accent-700" : "text-red-700"}`}>
            {passed ? "Congratulations!" : "Keep Practicing!"}
          </h1>
          <p className="text-surface-600 text-lg mb-6">{certTitle}</p>

          <div className="inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 mb-4"
            style={{ borderColor: passed ? "#10b981" : "#ef4444", color: passed ? "#10b981" : "#ef4444" }}>
            <span className="text-3xl font-extrabold">{score}%</span>
            <span className="text-xs font-medium opacity-70">Score</span>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-surface-600 mb-6">
            <div className="text-center"><p className="text-xl font-bold text-surface-800">{correct}</p><p>Correct</p></div>
            <div className="w-px h-8 bg-surface-300" />
            <div className="text-center"><p className="text-xl font-bold text-surface-800">{total - correct}</p><p>Incorrect</p></div>
            <div className="w-px h-8 bg-surface-300" />
            <div className="text-center"><p className="text-xl font-bold text-surface-800">{passingScore}%</p><p>Passing</p></div>
          </div>

          {passed ? (
            <div className="bg-white/80 rounded-2xl p-5 border border-accent-200">
              <p className="text-sm font-semibold text-accent-700 mb-4">🎓 Certificate Issued!</p>
              <div className="flex flex-col items-center gap-3">
                {verificationId && (
                  <p className="text-[10px] font-mono bg-accent-50 border border-accent-100 rounded-lg px-3 py-1.5 text-accent-800 uppercase tracking-widest">
                    Verification ID: <strong>{verificationId}</strong>
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                  {certificateUrl ? (
                    <a
                      href={certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-surface-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg text-center inline-block min-w-[140px]"
                    >
                      ⬇ Download PDF
                    </a>
                  ) : (
                    <p className="text-[9px] text-surface-400 italic">Generating PDF link...</p>
                  )}
                  {verificationId && (
                    <Link
                      to={`/verify/${verificationId}`}
                      target="_blank"
                      className="px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg text-center min-w-[140px]"
                    >
                      🔍 Verify Online
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 rounded-2xl p-5 border border-red-200">
              <p className="text-sm font-semibold text-red-700 mb-1">You did not pass this time.</p>
              <p className="text-xs text-surface-500">
                You scored <strong>{score}%</strong> but needed <strong>{passingScore}%</strong>. Review the recommended content below and try again.
              </p>
            </div>
          )}
        </motion.div>

        {/* Recommended Content */}
        {!passed && recommendations?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
            <h2 className="text-xl font-bold text-surface-800 mb-4">📖 Recommended Study Material</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((item, i) => (
                <motion.div key={item._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.07 }}
                  className="bg-white rounded-xl border border-surface-100 shadow-sm flex gap-4 p-4 hover:shadow-md transition-all group">
                  {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">{item.domain || item.type}</span>
                    <p className="text-sm font-semibold text-surface-800 group-hover:text-primary-600 transition-colors mt-1 line-clamp-2">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate("/certifications")} className="px-6 py-3 rounded-xl border-2 border-surface-200 text-sm font-semibold text-surface-700 hover:bg-surface-50 transition-all">
            ← All Certifications
          </button>
          {!passed && (
            <button onClick={() => navigate(-2)} className="px-6 py-3 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-all shadow-md">
              Retry Test
            </button>
          )}
          {passed && verificationId && (
            <Link
              to={`/verify/${verificationId}`}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-bold hover:from-accent-600 hover:to-accent-700 transition-all shadow-md text-center"
            >
              View My Certificate Page →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
