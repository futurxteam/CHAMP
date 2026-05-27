import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../store/useStore";
import { testApi } from "../api/api";

export default function TestPage() {
  const { certId } = useParams();
  const navigate = useNavigate();
  const { token } = useStore();

  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadTest = async () => {
      try {
        const data = await testApi.startTest(certId, token);
        setTestData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTest();
  }, [certId, token]);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    const questions = testData?.questions || [];

    // Prevent submission with unanswered questions
    const unanswered = questions.filter((q) => !answers[q._id]);
    if (unanswered.length > 0) {
      setSubmitError(`Please answer all ${unanswered.length} remaining question(s) before submitting.`);
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    const formattedAnswers = Object.entries(answers).map(([questionId, selected]) => ({
      questionId,
      selected,
    }));

    try {
      const result = await testApi.submitTest(
        { certId, answers: formattedAnswers },
        token
      );
      setSubmitted(true);
      // Navigate to result page, passing result as state
      navigate("/test-result", { state: result });
    } catch (err) {
      setSubmitError(err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-surface-500 text-sm">Loading test…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <h2 className="text-lg font-bold text-red-700 mb-2">Could not load test</h2>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/certifications")}
            className="px-6 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            Back to Certifications
          </button>
        </div>
      </div>
    );
  }

  const questions = testData?.questions || [];
  const currentQ = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / totalQ) * 100);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-surface-50 to-primary-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="pt-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-xl font-bold text-surface-800">{testData?.title}</h1>
              <p className="text-sm text-surface-500">{testData?.domain} · Passing score: {testData?.passingScore}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-surface-700">{answeredCount}/{totalQ}</p>
              <p className="text-xs text-surface-400">answered</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-surface-200 rounded-full h-2 mt-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Navigator dots */}
        <div className="flex flex-wrap gap-2 mb-6">
          {questions.map((q, i) => (
            <button
              key={q._id}
              onClick={() => setCurrentIdx(i)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                i === currentIdx
                  ? "bg-primary-600 text-white shadow-md shadow-primary-500/30"
                  : answers[q._id]
                  ? "bg-accent-500 text-white"
                  : "bg-surface-100 text-surface-500 hover:bg-surface-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-surface-100 shadow-sm p-6 md:p-8 mb-6"
          >
            <div className="flex items-start gap-3 mb-6">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-50 text-primary-700 text-sm font-bold flex items-center justify-center">
                {currentIdx + 1}
              </span>
              <p className="text-base font-semibold text-surface-800 leading-relaxed pt-1">
                {currentQ?.question}
              </p>
            </div>

            <div className="space-y-3">
              {currentQ?.options.map((opt, oi) => {
                const isSelected = answers[currentQ._id] === opt;
                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(currentQ._id, opt)}
                    className={`w-full text-left p-4 rounded-xl border-2 text-sm font-medium transition-all duration-150 ${
                      isSelected
                        ? "border-primary-500 bg-primary-50 text-primary-700 shadow-md shadow-primary-500/10"
                        : "border-surface-200 text-surface-700 hover:border-primary-300 hover:bg-primary-50/50"
                    }`}
                  >
                    <span className={`inline-flex w-6 h-6 rounded-md mr-3 text-xs font-bold items-center justify-center ${
                      isSelected ? "bg-primary-500 text-white" : "bg-surface-100 text-surface-500"
                    }`}>
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className="px-5 py-2.5 rounded-xl border border-surface-200 text-sm font-semibold text-surface-600 hover:bg-surface-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>

          {currentIdx < totalQ - 1 ? (
            <button
              onClick={() => setCurrentIdx((i) => i + 1)}
              className="px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-all shadow-md shadow-primary-500/25"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting || submitted}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white text-sm font-bold hover:from-accent-600 hover:to-accent-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md shadow-accent-500/30 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Test ✓"
              )}
            </button>
          )}
        </div>

        {/* Submission error */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
          >
            ⚠️ {submitError}
          </motion.div>
        )}

        {/* Summary bar */}
        <div className="mt-6 p-4 bg-white rounded-xl border border-surface-100 text-sm text-surface-500 flex items-center justify-between">
          <span>
            <strong className="text-surface-700">{answeredCount}</strong> of <strong className="text-surface-700">{totalQ}</strong> questions answered
          </span>
          {answeredCount < totalQ && (
            <span className="text-amber-600 font-medium">
              {totalQ - answeredCount} unanswered
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
