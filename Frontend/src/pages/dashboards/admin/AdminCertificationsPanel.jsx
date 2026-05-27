import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store/useStore";
import { adminCertApi, testApi, domainApi } from "../../../api/api";

// Domains are fetched from the centralized backend endpoint — no local array.

export default function AdminCertificationsPanel() {
  const { token } = useStore();
  const navigate = useNavigate();

  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [domains, setDomains] = useState([]);
  const [domainsLoading, setDomainsLoading] = useState(true);

  // ── Certification form ──────────────────────────────────────────────────────
  const [certForm, setCertForm] = useState({ title: "", domain: "", description: "", price: "", passingScore: "70" });
  const [certLoading, setCertLoading] = useState(false);
  const [certMsg, setCertMsg] = useState(null);

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

  const fetchDomains = async () => {
    try {
      const data = await domainApi.getDomains();
      setDomains(data);
    } catch (err) {
      console.error("Failed to load domains:", err.message);
    } finally {
      setDomainsLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
    fetchDomains();
  }, [token]);

  const handleCertSubmit = async (e) => {
    e.preventDefault();
    setCertLoading(true);
    setCertMsg(null);
    try {
      await adminCertApi.createCertification(
        { ...certForm, price: Number(certForm.price), passingScore: Number(certForm.passingScore) },
        token
      );
      setCertMsg({ type: "success", text: `Certification "${certForm.title}" created!` });
      setCertForm({ title: "", domain: "", description: "", price: "", passingScore: "70" });
      fetchCerts();
    } catch (err) {
      setCertMsg({ type: "error", text: err.message });
    } finally {
      setCertLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2.5 rounded-xl border border-surface-200 text-sm text-surface-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all";
  const labelClass = "block text-xs font-semibold text-surface-600 mb-1.5";
  const Alert = ({ msg }) => msg ? (
    <div className={`mt-3 p-3 rounded-xl text-sm font-medium ${msg.type === "success" ? "bg-accent-50 text-accent-700 border border-accent-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
      {msg.type === "success" ? "✓ " : "⚠️ "}{msg.text}
    </div>
  ) : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-extrabold text-surface-900 mb-1">Certification Management</h2>
          <p className="text-sm text-surface-500">Manage your certifications and their assessment questions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Certification */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1 bg-white rounded-2xl border border-surface-100 shadow-sm p-6 h-fit">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 text-sm">🎓</div>
            <h3 className="text-base font-bold text-surface-800">Create New</h3>
          </div>
          <form onSubmit={handleCertSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Title *</label>
              <input required className={inputClass} placeholder="e.g. Digital Health Fundamentals" value={certForm.title} onChange={(e) => setCertForm({ ...certForm, title: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Domain *</label>
              <select required className={inputClass} value={certForm.domain} onChange={(e) => setCertForm({ ...certForm, domain: e.target.value })}>
                <option value="">{domainsLoading ? "Loading domains…" : "Select domain…"}</option>
                {domains.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea rows={2} className={inputClass} placeholder="Brief description…" value={certForm.description} onChange={(e) => setCertForm({ ...certForm, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Price (₹)</label>
                <input type="number" min="0" className={inputClass} placeholder="0 = Free" value={certForm.price} onChange={(e) => setCertForm({ ...certForm, price: e.target.value })} />
              </div>
              <div>
                <label className={labelClass}>Passing Score %</label>
                <input required type="number" min="1" max="100" className={inputClass} value={certForm.passingScore} onChange={(e) => setCertForm({ ...certForm, passingScore: e.target.value })} />
              </div>
            </div>
            <button type="submit" disabled={certLoading} className="w-full py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 disabled:opacity-60 transition-all shadow-md shadow-primary-500/25">
              {certLoading ? "Creating…" : "Create Certification"}
            </button>
          </form>
          <Alert msg={certMsg} />
        </motion.div>

        {/* List of Certifications */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black text-surface-300 uppercase tracking-widest mb-4">Existing Certifications</h3>
          {loading ? (
            <div className="p-12 text-center animate-pulse text-surface-400 font-bold uppercase tracking-widest italic text-xs">Loading certifications...</div>
          ) : certs.length === 0 ? (
            <div className="p-12 bg-surface-50 rounded-2xl border-2 border-dashed border-surface-200 text-center text-surface-400 font-bold uppercase tracking-widest italic text-xs">No certifications yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {certs.map((cert) => (
                <motion.div
                  key={cert._id}
                  layout
                  className="bg-white p-5 rounded-2xl border border-surface-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-primary-200 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 text-xl">🎓</div>
                    <div>
                      <h4 className="font-bold text-surface-900 group-hover:text-primary-600 transition-colors">{cert.title}</h4>
                      <div className="flex gap-3 mt-0.5">
                        <span className="text-[10px] font-black text-surface-300 uppercase tracking-widest">{cert.domain}</span>
                        <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">₹{cert.price || 0}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/dashboard/admin/certifications/${cert._id}/questions`)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-surface-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-600 transition-all shadow-lg shadow-surface-900/10"
                  >
                    Add Questions
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
