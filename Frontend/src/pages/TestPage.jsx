import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../store/useStore";
import { testApi } from "../api/api";

// ─── Helper: normalize any question/option value ─────────────────────────────
const getOptionValue = (opt) => {
  if (opt && typeof opt === "object") {
    return opt.text?.trim() || opt.image?.trim() || "";
  }
  return String(opt || "");
};

const getOptionText = (opt) => {
  if (opt && typeof opt === "object") return opt.text || "";
  return String(opt || "");
};

const getOptionImage = (opt) => {
  if (opt && typeof opt === "object") return opt.image || "";
  return "";
};

const getQuestionText = (q) => {
  if (q && typeof q === "object") return q.text || "";
  return String(q || "");
};

const getQuestionImage = (q) => {
  if (q && typeof q === "object") return q.image || "";
  return "";
};

// ─── Image Zoom/Pan Viewer ────────────────────────────────────────────────────
function ImageViewer({ src, onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const zoomIn = () => setScale((s) => Math.min(s + 0.3, 5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.3, 0.5));
  const reset = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  const onMouseDown = (e) => {
    e.preventDefault();
    setPanning(true);
    setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };
  const onMouseMove = (e) => {
    if (!panning) return;
    setPos({ x: e.clientX - start.x, y: e.clientY - start.y });
  };
  const onMouseUp = () => setPanning(false);

  const onWheel = (e) => {
    e.preventDefault();
    setScale((s) => Math.min(Math.max(s - e.deltaY * 0.001, 0.5), 5));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md"
        onMouseUp={onMouseUp}
      >
        {/* Top toolbar */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 bg-black/60 border-b border-white/10">
          <span className="text-white/70 text-[11px] font-black uppercase tracking-widest">
            Medical Image Viewer
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={zoomIn}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
              title="Zoom In"
            >+</button>
            <button
              onClick={zoomOut}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
              title="Zoom Out"
            >−</button>
            <button
              onClick={reset}
              className="px-3 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-black uppercase tracking-wide"
              title="Reset"
            >Reset</button>
            <button
              onClick={() => { reset(); onClose(); }}
              className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center"
              title="Close"
            >✕</button>
          </div>
        </div>

        {/* Zoomable / pannable image */}
        <div
          className="flex-1 flex items-center justify-center overflow-hidden"
          style={{ cursor: panning ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseUp}
          onWheel={onWheel}
        >
          <img
            src={src}
            alt="Medical Image — Enlarged View"
            draggable={false}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
              transition: panning ? "none" : "transform 0.15s ease-out",
              maxWidth: "90vw",
              maxHeight: "80vh",
              objectFit: "contain",
              userSelect: "none",
            }}
          />
        </div>

        <p className="flex-shrink-0 text-center text-white/30 text-[10px] uppercase font-bold tracking-widest py-3">
          Drag to pan · Scroll or use buttons to zoom
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main TestPage ────────────────────────────────────────────────────────────
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
  const [zoomSrc, setZoomSrc] = useState(null);

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

  const handleSelect = (questionId, optionValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionValue }));
  };

  const handleSubmit = async () => {
    const questions = testData?.questions || [];

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
      const result = await testApi.submitTest({ certId, answers: formattedAnswers }, token);
      setSubmitted(true);
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

  const qText = getQuestionText(currentQ?.question);
  const qImage = getQuestionImage(currentQ?.question);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-surface-50 to-primary-50/20">
      {/* Zoom Modal */}
      {zoomSrc && <ImageViewer src={zoomSrc} onClose={() => setZoomSrc(null)} />}

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
            {/* Question text */}
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-50 text-primary-700 text-sm font-bold flex items-center justify-center">
                {currentIdx + 1}
              </span>
              <p className="text-base font-semibold text-surface-800 leading-relaxed pt-1">
                {qText}
              </p>
            </div>

            {/* Question image */}
            {qImage && (
              <div className="mb-6 ml-11">
                <div
                  className="relative group inline-block cursor-zoom-in"
                  onClick={() => setZoomSrc(qImage)}
                >
                  <img
                    src={qImage}
                    alt="Question Image"
                    loading="lazy"
                    className="max-h-64 w-auto object-contain rounded-2xl border border-surface-200 shadow-sm group-hover:opacity-90 transition-opacity"
                  />
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 px-3 py-1.5 rounded-xl text-xs font-bold text-surface-800">
                      🔍 Click to enlarge
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentQ?.options.map((opt, oi) => {
                const optVal = getOptionValue(opt);
                const optText = getOptionText(opt);
                const optImg = getOptionImage(opt);
                const isSelected = answers[currentQ._id] === optVal;

                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(currentQ._id, optVal)}
                    className={`w-full text-left p-4 rounded-xl border-2 text-sm font-medium transition-all duration-150 ${
                      isSelected
                        ? "border-primary-500 bg-primary-50 text-primary-700 shadow-md shadow-primary-500/10"
                        : "border-surface-200 text-surface-700 hover:border-primary-300 hover:bg-primary-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex-shrink-0 inline-flex w-6 h-6 rounded-md text-xs font-bold items-center justify-center ${
                          isSelected ? "bg-primary-500 text-white" : "bg-surface-100 text-surface-500"
                        }`}
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>

                      {optImg && (
                        <div
                          className="relative group/img flex-shrink-0 cursor-zoom-in"
                          onClick={(e) => { e.stopPropagation(); setZoomSrc(optImg); }}
                        >
                          <img
                            src={optImg}
                            alt={`Option ${String.fromCharCode(65 + oi)} Image`}
                            loading="lazy"
                            className="h-20 w-auto object-contain rounded-xl border border-surface-200 group-hover/img:opacity-80 transition-opacity"
                          />
                          <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-[10px] font-bold">🔍</span>
                          </div>
                        </div>
                      )}

                      {optText && <span>{optText}</span>}
                      {!optText && !optImg && <span className="text-surface-400 italic text-xs">(no content)</span>}
                    </div>
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
            <strong className="text-surface-700">{answeredCount}</strong> of{" "}
            <strong className="text-surface-700">{totalQ}</strong> questions answered
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
