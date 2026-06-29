import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../../store/useStore";
import { adminCertApi, testApi } from "../../../api/api";

const DIFFICULTIES = ["easy", "medium", "hard"];

export default function AdminQuestionsPage() {
  const { certId } = useParams();
  const navigate = useNavigate();
  const { token } = useStore();
  const fileInputRef = useRef(null);

  const [cert, setCert] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qLoading, setQLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Import state
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null); // null = modal closed
  const [templateLoading, setTemplateLoading] = useState(false);

  const [qForm, setQForm] = useState({
    question: { text: "", image: "" },
    options: [
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" },
      { text: "", image: "" },
    ],
    correctAnswer: "",
    difficulty: "medium",
  });
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  // Image Viewer State
  const [activeZoomImage, setActiveZoomImage] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsPanning(true);
    setPanStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPanPosition({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const fetchData = async () => {
    try {
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

  const handleOptionTextChange = (idx, val) => {
    const opts = [...qForm.options];
    opts[idx] = { ...opts[idx], text: val };
    setQForm({ ...qForm, options: opts });
  };

  const handleImageUpload = async (file, type, optionIdx = null) => {
    if (!file) return;
    
    // File validation
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setMsg({ type: "error", text: "Unsupported format. Allowed formats: JPG, JPEG, PNG, WEBP" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMsg({ type: "error", text: "File is too large. Maximum size is 5 MB." });
      return;
    }
    
    setMsg(null);
    setQLoading(true);
    try {
      const res = await adminCertApi.uploadQuestionImage(file, token);
      if (type === "question") {
        setQForm(prev => ({
          ...prev,
          question: { ...prev.question, image: res.url }
        }));
      } else if (type === "option" && optionIdx !== null) {
        const newOpts = [...qForm.options];
        newOpts[optionIdx] = { ...newOpts[optionIdx], image: res.url };
        setQForm(prev => ({ ...prev, options: newOpts }));
      }
      setMsg({ type: "success", text: "Image uploaded successfully!" });
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Failed to upload image." });
    } finally {
      setQLoading(false);
    }
  };

  const handleRemoveQuestionImage = () => {
    setQForm(prev => ({
      ...prev,
      question: { ...prev.question, image: "" }
    }));
  };

  const handleRemoveOptionImage = (idx) => {
    const newOpts = [...qForm.options];
    newOpts[idx] = { ...newOpts[idx], image: "" };
    setQForm(prev => ({ ...prev, options: newOpts }));
  };

  const handleQSubmit = async (e) => {
    e.preventDefault();
    const qText = qForm.question.text || "";
    const qImage = qForm.question.image || "";
    
    if (!qText.trim() && !qImage.trim()) {
      return setMsg({ type: "error", text: "Question must contain either a text statement or an image." });
    }
    
    for (let i = 0; i < qForm.options.length; i++) {
      const opt = qForm.options[i];
      if (!opt.text.trim() && !opt.image.trim()) {
        return setMsg({ type: "error", text: `Option ${String.fromCharCode(65 + i)} cannot be empty. Enter text or upload an image.` });
      }
    }
    
    if (!qForm.correctAnswer.trim()) {
      return setMsg({ type: "error", text: "Correct answer is required." });
    }
    
    const correctMatch = qForm.options.find(
      opt => (opt.text && opt.text === qForm.correctAnswer) || (opt.image && opt.image === qForm.correctAnswer)
    );
    if (!correctMatch) {
      return setMsg({ type: "error", text: "Correct answer must match one of the options (either text or image URL)." });
    }

    setQLoading(true);
    setMsg(null);
    try {
      if (editingQuestionId) {
        await adminCertApi.updateQuestion(editingQuestionId, qForm, token);
        setMsg({ type: "success", text: "Question updated successfully!" });
      } else {
        await adminCertApi.addQuestion(certId, qForm, token);
        setMsg({ type: "success", text: "Question added successfully!" });
      }
      setQForm({
        question: { text: "", image: "" },
        options: [
          { text: "", image: "" },
          { text: "", image: "" },
          { text: "", image: "" },
          { text: "", image: "" },
        ],
        correctAnswer: "",
        difficulty: "medium"
      });
      setEditingQuestionId(null);
      fetchData();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setQLoading(false);
    }
  };

  const handleStartEdit = (q) => {
    setEditingQuestionId(q._id);
    
    let normalizedQ = { text: "", image: "" };
    if (q.question && typeof q.question === "object") {
      normalizedQ = {
        text: q.question.text || "",
        image: q.question.image || ""
      };
    } else if (typeof q.question === "string") {
      normalizedQ = {
        text: q.question,
        image: ""
      };
    }
    
    const normalizedOpts = (q.options || []).map(opt => {
      if (opt && typeof opt === "object") {
        return {
          text: opt.text || "",
          image: opt.image || ""
        };
      } else if (typeof opt === "string") {
        return {
          text: opt,
          image: ""
        };
      }
      return { text: "", image: "" };
    });
    
    while (normalizedOpts.length < 4) {
      normalizedOpts.push({ text: "", image: "" });
    }

    setQForm({
      question: normalizedQ,
      options: normalizedOpts,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty,
    });
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingQuestionId(null);
    setQForm({
      question: { text: "", image: "" },
      options: [
        { text: "", image: "" },
        { text: "", image: "" },
        { text: "", image: "" },
        { text: "", image: "" },
      ],
      correctAnswer: "",
      difficulty: "medium"
    });
    setMsg(null);
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

  // ── Download Template ────────────────────────────────────────────────────────
  const handleDownloadTemplate = async () => {
    setTemplateLoading(true);
    try {
      const response = await adminCertApi.downloadTemplate(token);
      if (!response.ok) throw new Error("Failed to download template");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "questions-template.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setMsg({ type: "error", text: `Download failed: ${err.message}` });
    } finally {
      setTemplateLoading(false);
    }
  };

  // ── Import Excel ─────────────────────────────────────────────────────────────
  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportResult(null);
    try {
      const result = await adminCertApi.importQuestions(certId, file, token);
      setImportResult(result);
      if (result.imported > 0) fetchData(); // refresh question bank
    } catch (err) {
      setImportResult({ error: err.message });
    } finally {
      setImporting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl border border-surface-200 text-sm text-surface-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all";
  const labelClass =
    "block text-[10px] font-black uppercase text-surface-300 tracking-widest mb-1.5";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-surface-50 p-6 lg:p-12">
      {/* Hidden file input for Excel upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFileSelected}
      />

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
            <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-full">
              {cert?.domain}
            </span>
            <span className="text-[10px] font-black text-surface-300 uppercase tracking-widest">
              Certification Assessment
            </span>
          </div>

          {/* Title row with action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-black text-surface-900 uppercase tracking-tighter">
              {cert?.title}
            </h1>

            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Download Template */}
              <button
                onClick={handleDownloadTemplate}
                disabled={templateLoading}
                title="Download Excel template pre-filled with column headers and a sample row"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-surface-700 text-[11px] font-black uppercase tracking-widest hover:border-primary-400 hover:text-primary-600 hover:shadow-md transition-all disabled:opacity-60"
              >
                <span className="text-base leading-none">
                  {templateLoading ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    "↓"
                  )}
                </span>
                Download Template
              </button>

              {/* Import Excel */}
              <button
                onClick={handleImportClick}
                disabled={importing}
                title="Upload a completed Excel file to bulk-import questions"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-60"
              >
                <span className="text-base leading-none">
                  {importing ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    "↑"
                  )}
                </span>
                {importing ? "Importing…" : "Import Excel"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Add Question Form */}
          <div className="xl:col-span-5">
            <div className="bg-white rounded-[2rem] border border-surface-100 shadow-sm p-8 sticky top-8">
              <h3 className="text-lg font-black text-surface-900 uppercase tracking-tighter mb-6">
                {editingQuestionId ? "Edit Question" : "Add New Question"}
              </h3>
              <form onSubmit={handleQSubmit} className="space-y-5">
                <div>
                  <label className={labelClass}>Question Statement *</label>
                  <textarea
                    rows={3}
                    className={inputClass}
                    placeholder="e.g. What is the primary benefit of Digital Health?"
                    value={qForm.question?.text || ""}
                    onChange={(e) => setQForm({ ...qForm, question: { ...qForm.question, text: e.target.value } })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Question Image (Optional)</label>
                  {qForm.question?.image ? (
                    <div className="mb-2">
                      <div className="relative inline-block group">
                        <img
                          src={qForm.question.image}
                          alt="Question Preview"
                          className="h-32 w-auto object-contain rounded-xl border border-surface-200 cursor-pointer"
                          onClick={() => setActiveZoomImage(qForm.question.image)}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 rounded-xl transition-opacity">
                          <button
                            type="button"
                            onClick={() => setActiveZoomImage(qForm.question.image)}
                            className="bg-white/80 p-1.5 rounded-lg text-xs font-bold text-surface-800 hover:bg-white"
                          >
                            🔍 Zoom
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = (e) => handleImageUpload(e.target.files[0], "question");
                            input.click();
                          }}
                          className="px-3 py-1.5 bg-surface-100 text-surface-700 text-xs font-bold rounded-lg hover:bg-surface-200"
                        >
                          Replace Image
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveQuestionImage}
                          className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100"
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.onchange = (e) => handleImageUpload(e.target.files[0], "question");
                        input.click();
                      }}
                      className="px-4 py-2.5 border-2 border-dashed border-surface-200 text-surface-500 rounded-xl text-xs font-bold hover:border-primary-500 hover:text-primary-600 w-full transition-colors flex items-center justify-center gap-2"
                    >
                      <span>📷</span> Add Question Image
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <label className={labelClass}>Options (4 required) *</label>
                  {qForm.options.map((opt, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex gap-2 items-center">
                        <span className="w-6 h-6 rounded-lg bg-surface-50 flex items-center justify-center text-[10px] font-black text-surface-300 flex-shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <div className="relative flex-1">
                          <input
                            className={inputClass}
                            placeholder={`Option ${String.fromCharCode(65 + i)}`}
                            value={opt.text || ""}
                            onChange={(e) => handleOptionTextChange(i, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.accept = "image/*";
                              input.onchange = (e) => handleImageUpload(e.target.files[0], "option", i);
                              input.click();
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-primary-600 transition-colors p-1"
                            title="Upload option image"
                          >
                            📷
                          </button>
                        </div>
                      </div>
                      {opt.image && (
                        <div className="ml-8 flex items-center gap-3 bg-surface-50 p-2 rounded-xl border border-surface-150">
                          <img
                            src={opt.image}
                            alt={`Option ${String.fromCharCode(65 + i)} Image`}
                            className="w-12 h-12 object-contain rounded-lg border border-surface-200 cursor-pointer"
                            onClick={() => setActiveZoomImage(opt.image)}
                          />
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] text-surface-400 font-bold uppercase">Image attached</span>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const input = document.createElement("input");
                                  input.type = "file";
                                  input.accept = "image/*";
                                  input.onchange = (e) => handleImageUpload(e.target.files[0], "option", i);
                                  input.click();
                                }}
                                className="text-[10px] font-black text-primary-600 hover:underline uppercase"
                              >
                                Replace
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveOptionImage(i)}
                                className="text-[10px] font-black text-red-600 hover:underline uppercase"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <label className={labelClass}>Correct Answer *</label>
                  <select
                    required
                    className={inputClass}
                    value={qForm.correctAnswer}
                    onChange={(e) => setQForm({ ...qForm, correctAnswer: e.target.value })}
                  >
                    <option value="">Select the correct option…</option>
                    {qForm.options
                      .filter((o) => o.text?.trim() || o.image?.trim())
                      .map((o, i) => {
                        const optVal = o.text?.trim() || o.image?.trim();
                        const optLabel = o.text?.trim() 
                          ? `${String.fromCharCode(65 + i)}: ${o.text}` 
                          : `${String.fromCharCode(65 + i)}: [Image Only]`;
                        return (
                          <option key={i} value={optVal}>
                            {optLabel}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Difficulty</label>
                  <select
                    className={inputClass}
                    value={qForm.difficulty}
                    onChange={(e) => setQForm({ ...qForm, difficulty: e.target.value })}
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3">
                  {editingQuestionId && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 py-4 rounded-2xl border border-surface-200 text-surface-700 text-xs font-black uppercase tracking-widest hover:bg-surface-50 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={qLoading}
                    className="flex-1 py-4 rounded-2xl bg-surface-900 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-600 disabled:opacity-60 transition-all shadow-xl shadow-surface-900/10"
                  >
                    {qLoading ? "Saving…" : editingQuestionId ? "Update Question" : "Save Question"}
                  </button>
                </div>
              </form>

              <AnimatePresence>
                {msg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-4 rounded-2xl text-xs font-bold ${
                      msg.type === "success"
                        ? "bg-accent-50 text-accent-700 border border-accent-100"
                        : "bg-red-50 text-red-700 border border-red-100"
                    }`}
                  >
                    {msg.type === "success" ? "✓ " : "⚠️ "}
                    {msg.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Questions List */}
          <div className="xl:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-surface-300 uppercase tracking-widest">
                Question Bank ({questions.length})
              </h3>
            </div>

            <div className="space-y-4">
              {questions.length === 0 ? (
                <div className="p-12 bg-white rounded-[2rem] border border-dashed border-surface-200 text-center">
                  <p className="text-surface-300 font-bold uppercase tracking-widest text-[10px]">
                    No questions added yet. Use the form or import an Excel file.
                  </p>
                </div>
              ) : (
                questions.map((q, i) => {
                  const qText = q.question && typeof q.question === "object" ? q.question.text : q.question;
                  const qImage = q.question && typeof q.question === "object" ? q.question.image : null;

                  return (
                    <motion.div
                      key={q._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-white p-6 rounded-[2rem] border border-surface-100 shadow-sm group"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                                q.difficulty === "easy"
                                  ? "bg-green-50 text-green-600"
                                  : q.difficulty === "medium"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-red-50 text-red-600"
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </div>
                          <p className="font-bold text-surface-800 leading-relaxed mb-3">
                            {qText}
                          </p>
                          {qImage && (
                            <div className="mb-4">
                              <img
                                src={qImage}
                                alt="Question Visual"
                                className="h-40 w-auto object-contain rounded-2xl border border-surface-200 cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setActiveZoomImage(qImage)}
                              />
                            </div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt, idx) => {
                              const optText = opt && typeof opt === "object" ? opt.text : opt;
                              const optImage = opt && typeof opt === "object" ? opt.image : null;
                              const isCorrect = (optText && optText === q.correctAnswer) || (optImage && optImage === q.correctAnswer);

                              return (
                                <div
                                  key={idx}
                                  className={`flex items-center gap-3 p-3 rounded-xl text-[10px] font-bold border ${
                                    isCorrect
                                      ? "bg-accent-50 border-accent-200 text-accent-700"
                                      : "bg-surface-50 border-transparent text-surface-400"
                                  }`}
                                >
                                  <span className="flex-shrink-0 w-5 h-5 rounded bg-black/5 flex items-center justify-center text-[9px] text-surface-500">
                                    {String.fromCharCode(65 + idx)}
                                  </span>
                                  {optImage && (
                                    <img
                                      src={optImage}
                                      alt={`Option ${String.fromCharCode(65 + idx)} Thumbnail`}
                                      className="w-8 h-8 object-contain rounded border border-surface-200 cursor-pointer flex-shrink-0"
                                      onClick={() => setActiveZoomImage(optImage)}
                                    />
                                  )}
                                  <span className="truncate">
                                    {optText || (optImage ? "[Image Option]" : "")}
                                  </span>
                                  {isCorrect && <span className="ml-auto flex-shrink-0">✓</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                          <button
                            onClick={() => handleStartEdit(q)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                            title="Edit Question"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => handleDelete(q._id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Question"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Import Result Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {importResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setImportResult(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-8"
            >
              {importResult.error ? (
                // Network / server error
                <>
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mb-5">
                    ⚠️
                  </div>
                  <h2 className="text-xl font-black text-surface-900 uppercase tracking-tighter mb-2">
                    Import Failed
                  </h2>
                  <p className="text-sm text-red-600 font-medium mb-6">{importResult.error}</p>
                </>
              ) : (
                // Success summary
                <>
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-2xl mb-5">
                    📊
                  </div>
                  <h2 className="text-xl font-black text-surface-900 uppercase tracking-tighter mb-6">
                    Import Summary
                  </h2>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-accent-50 border border-accent-100 rounded-2xl p-4 text-center">
                      <p className="text-3xl font-black text-accent-700">{importResult.imported}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-accent-500 mt-1">
                        Imported
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-center">
                      <p className="text-3xl font-black text-amber-600">{importResult.duplicates}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-amber-500 mt-1">
                        Duplicates
                      </p>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-center">
                      <p className="text-3xl font-black text-red-600">{importResult.failed}</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-red-500 mt-1">
                        Failed
                      </p>
                    </div>
                  </div>

                  {/* Per-row errors */}
                  {importResult.errors?.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-surface-400 mb-3">
                        Validation Errors
                      </p>
                      <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                        {importResult.errors.map((e, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5"
                          >
                            <span className="text-[9px] font-black text-red-400 uppercase tracking-widest bg-red-100 px-1.5 py-0.5 rounded-md whitespace-nowrap">
                              Row {e.row}
                            </span>
                            <span className="text-xs text-red-700 font-medium leading-snug">
                              {e.reason}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {importResult.duplicates > 0 && importResult.errors?.length === 0 && (
                    <p className="text-xs text-surface-500 mb-6">
                      {importResult.duplicates} row{importResult.duplicates !== 1 ? "s were" : " was"} skipped because the same question already exists in this certification.
                    </p>
                  )}
                </>
              )}

              <button
                onClick={() => setImportResult(null)}
                className="w-full py-3 rounded-2xl bg-surface-900 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-600 transition-all"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom / Pan Image Modal */}
      <AnimatePresence>
        {activeZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in"
            onMouseUp={handleMouseUp}
          >
            {/* Header controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="text-white text-xs font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full">
                Medical Image Viewer
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomIn}
                  className="w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold"
                  title="Zoom In"
                >
                  ＋
                </button>
                <button
                  onClick={handleZoomOut}
                  className="w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center font-bold"
                  title="Zoom Out"
                >
                  －
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-3 h-10 rounded-xl bg-white/10 text-white hover:bg-white/20 flex items-center justify-center text-xs font-black uppercase tracking-wider"
                  title="Reset Zoom"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    setActiveZoomImage(null);
                    handleResetZoom();
                  }}
                  className="w-10 h-10 rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center justify-center font-bold"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Interactive Image Frame */}
            <div
              className="w-full h-full flex items-center justify-center overflow-hidden cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            >
              <img
                src={activeZoomImage}
                alt="Enlarged Medical View"
                draggable={false}
                style={{
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
                  transition: isPanning ? "none" : "transform 0.15s ease-out",
                  maxHeight: "85vh",
                  maxWidth: "90vw",
                  objectFit: "contain"
                }}
              />
            </div>
            
            <div className="absolute bottom-6 text-center text-white/50 text-[10px] uppercase font-bold tracking-widest pointer-events-none">
              Drag to pan · Click controls or use mouse wheel to zoom
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
