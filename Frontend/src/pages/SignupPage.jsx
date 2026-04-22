import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import { authApi } from "../api/api";
import "./contribute_signup.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const { setAuth } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expertise: "",
    expertiseLevel: "Intermediate",
  });
  const [proofFile, setProofFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authApi.signup(
        formData.name,
        formData.email,
        formData.password,
        formData.expertise,
        formData.expertiseLevel,
        proofFile
      );

      if (data.user.status === "pending") {
        setPendingApproval(true);
        setSuccess(true);
      } else {
        setAuth(data.user, data.token);
        navigate("/dashboard/user");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please check your data.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-900 px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 bg-white rounded-[4rem] max-w-xl shadow-2xl">
          <div className="text-6xl mb-8">{pendingApproval ? "⏳" : "🚀"}</div>
          <h2 className="text-3xl font-black text-surface-900 mb-6 uppercase tracking-tighter">
            {pendingApproval ? "Application Submitted" : "Welcome to CHAMP!"}
          </h2>
          <p className="text-lg text-surface-500 font-medium mb-8">
            {pendingApproval
              ? "Your contributor application is being reviewed by the CHAMP administration. We will notify you via email once approved."
              : "Your account is ready. Redirecting..."}
          </p>
          <Link to="/login" className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline">
            Go to Login →
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-surface-900 uppercase tracking-tighter">Lead the Change</h1>
          <p className="text-xl text-primary-600 font-bold uppercase tracking-widest mt-4">CHAMP 21 Registration — Contributor Access</p>
          <p className="text-surface-500 mt-3 max-w-xl mx-auto">Join the ranks of healthcare leaders. Contributors can publish technical content, case studies, and lead industry sessions.</p>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white p-12 rounded-[4rem] shadow-2xl border border-surface-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Full Name</label>
                <input required name="name" onChange={handleChange} value={formData.name} type="text" className="contribute-input" placeholder="Dr. Sarah Mitchell" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Professional Email</label>
                <input required name="email" onChange={handleChange} value={formData.email} type="email" className="contribute-input" placeholder="sarah@hospital.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Password</label>
              <input required name="password" onChange={handleChange} value={formData.password} type="password" className="contribute-input" placeholder="••••••••" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Topics of Expertise (Comma Separated) <span className="text-primary-600">*</span></label>
              <input required name="expertise" onChange={handleChange} value={formData.expertise} type="text" className="contribute-input" placeholder="Operational Efficiency, Patient Flow, Accreditation" />
              <p className="text-[10px] text-surface-400">Adding expertise registers you as an L2 Contributor — pending admin review.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Expertise Level</label>
              <select name="expertiseLevel" onChange={handleChange} value={formData.expertiseLevel} className="contribute-input appearance-none">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate (5–10 yrs)</option>
                <option value="Expert">Expert (10+ yrs)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Professional Verification Document(PDF) <span className="text-primary-600">*</span></label>
              <div className="relative">
                <input
                  required
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`contribute-input flex items-center gap-3 ${proofFile ? 'border-primary-500 bg-primary-50' : ''}`}>
                  <span className="text-xl">{proofFile ? '📄' : '📤'}</span>
                  <span className="truncate text-sm font-bold">
                    {proofFile ? proofFile.name : "Upload valid proof of experience"}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-surface-400">Please upload a PDF document (License, Certificate, or ID) for verification.</p>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold uppercase text-center">{error}</div>}

            <button disabled={loading} className="btn-primary w-full py-6 text-sm font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-primary-500/20">
              {loading ? "Submitting Application..." : "Submit Application for Review"}
            </button>
            <p className="text-center text-[10px] text-surface-400 font-bold uppercase tracking-widest">By submitting, you agree to our Code of Ethics and Professional Guidelines.</p>

            <div className="text-center pt-2">
              <span className="text-[10px] text-surface-400">Already have an account? </span>
              <Link to="/login" className="text-[10px] text-primary-600 font-black uppercase tracking-widest hover:underline">Sign In Here →</Link>
            </div>

            <div className="text-center text-[8px] text-surface-300 font-bold uppercase tracking-[0.2em] mt-8 pt-8 border-t border-surface-50">
              CHAMP Institutional Governance & Compliance Framework
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

