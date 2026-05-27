import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../../store/useStore";
import { adminCertApi, testApi } from "../../../api/api";

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function AdminQuestionsPage() {
  const { certId } = useParams();
  const navigate = useNavigate();
  const { token } = useStore();

  const [cert, setCert] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qLoading, setQLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const [qForm, setQForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    difficulty: "medium",
  });

  const fetchData = async () => {
    try {
      // Find the specific cert from all certs (since we don't have a getOneCert admin API yet, or just use testApi)
      const allCerts = await testApi.getCertifications(token);
      const found = allCerts.find((c) => c._id === certId);
      if (!found) throw new Error("Certification not found");
      setCert(found);

      const qs = await adminCertApi.getQuestionsByCert(certId, token);
      setQuestions(qs);
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [certId, token]);

  const handleOptionChange = (idx, val) => {
    const opts = [...qForm.options];
    opts[idx] = val;
    setQForm({ ...qForm, options: opts });
  };

  const handleQSubmit = async (e) => {
    e.preventDefault();
    if (!qForm.options.every((o) => o.trim())) return setMsg({ type: "error", text: "All 4 options are required." });
    if (!qForm.correctAnswer.trim()) return setMsg({ type: "error", text: "Correct answer text is required." });
    if (!qForm.options.includes(qForm.correctAnswer)) return setMsg({ type: "error", text: "Correct answer must match one of the options exactly." });

    setQLoading(true);
    setMsg(null);
    try {
      await adminCertApi.addQuestion(certId, qForm, token);
      setMsg({ type: "success", text: "Question added successfully!" });
      setQForm({ question: "", options: ["", "", "", ""], correctAnswer: "", difficulty: "medium" });
      fetchData(); // Refresh list
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setQLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await adminCertApi.deleteQuestion(id, token);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-surface-200 text-sm text-surface-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all";
  const labelClass = "block text-[10px] font-black uppercase text-surface-300 tracking-widest mb-1.5";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-50 p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard/admin?tab=certifications")}
          className="mb-8 flex items-center gap-2 text-surface-400 hover:text-surface-900 transition-colors text-xs font-black uppercase tracking-widest"
        >
          <span>←</span> Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-full">{cert?.domain}</span>
            <span className="text-[10px] font-black text-surface-300 uppercase tracking-widest">Certification Assessment</span>
          </div>
          <h1 className="text-3xl font-black text-surface-900 uppercase tracking-tighter">{cert?.title}</h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Add Question Form */}
          <div className="xl:col-span-5">
            <div className="bg-white rounded-[2rem] border border-surface-100 shadow-sm p-8 sticky top-8">
              <h3 className="text-lg font-black text-surface-900 uppercase tracking-tighter mb-6">Add New Question</h3>
              <form onSubmit={handleQSubmit} className="space-y-5">
                <div>
                  <label className={labelClass}>Question Statement *</label>
                  <textarea required rows={3} className={inputClass} placeholder="e.g. What is the primary benefit of Digital Health?" value={qForm.question} onChange={(e) => setQForm({ ...qForm, question: e.target.value })} />
                </div>
                <div className="space-y-3">
                  <label className={labelClass}>Options (4 required) *</label>
                  {qForm.options.map((opt, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="w-6 h-6 rounded-lg bg-surface-50 flex items-center justify-center text-[10px] font-black text-surface-300">{String.fromCharCode(65 + i)}</span>
                      <input required className={inputClass} placeholder={`Option ${String.fromCharCode(65 + i)}`} value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} />
                    </div>
                  ))}
                </div>
                <div>
                  <label className={labelClass}>Correct Answer *</label>
                  <select required className={inputClass} value={qForm.correctAnswer} onChange={(e) => setQForm({ ...qForm, correctAnswer: e.target.value })}>
                    <option value="">Select the correct option…</option>
                    {qForm.options.filter(o => o.trim()).map((o, i) => (
                      <option key={i} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Difficulty</label>
                  <select className={inputClass} value={qForm.difficulty} onChange={(e) => setQForm({ ...qForm, difficulty: e.target.value })}>
                    {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={qLoading} className="w-full py-4 rounded-2xl bg-surface-900 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-600 disabled:opacity-60 transition-all shadow-xl shadow-surface-900/10">
                  {qLoading ? "Saving…" : "Save Question"}
                </button>
              </form>

              <AnimatePresence>
                {msg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-4 rounded-2xl text-xs font-bold ${msg.type === "success" ? "bg-accent-50 text-accent-700 border border-accent-100" : "bg-red-50 text-red-700 border border-red-100"}`}
                  >
                    {msg.type === "success" ? "✓ " : "⚠️ "}{msg.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Questions List */}
          <div className="xl:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-surface-300 uppercase tracking-widest">Question Bank ({questions.length})</h3>
            </div>

            <div className="space-y-4">
              {questions.length === 0 ? (
                <div className="p-12 bg-white rounded-[2rem] border border-dashed border-surface-200 text-center">
                  <p className="text-surface-300 font-bold uppercase tracking-widest text-[10px]">No questions added yet for this certification.</p>
                </div>
              ) : (
                questions.map((q, i) => (
                  <motion.div
                    key={q._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-6 rounded-[2rem] border border-surface-100 shadow-sm group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                            q.difficulty === "easy" ? "bg-green-50 text-green-600" :
                            q.difficulty === "medium" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <p className="font-bold text-surface-800 leading-relaxed mb-4">{q.question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, idx) => (
                            <div key={idx} className={`px-3 py-2 rounded-xl text-[10px] font-bold border ${opt === q.correctAnswer ? "bg-accent-50 border-accent-200 text-accent-700" : "bg-surface-50 border-transparent text-surface-400"}`}>
                              {opt} {opt === q.correctAnswer && "✓"}
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(q._id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Question"
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
