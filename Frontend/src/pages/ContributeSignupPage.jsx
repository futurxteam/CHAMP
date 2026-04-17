import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authApi } from "../api/api";
import "./contribute_signup.css";

export default function ContributeSignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    topics: "",
    expertiseLevel: "intermediate",
    pricing: "Free",
    linkedIn: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare data for backend
      const speakerData = {
        ...formData,
        topics: formData.topics.split(",").map(t => t.trim()), // convert to array
        socialLinks: { linkedin: formData.linkedIn }
      };

      const response = await authApi.signupSpeaker(speakerData);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
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
           <div className="text-6xl mb-8">🚀</div>
           <h2 className="text-3xl font-black text-surface-900 mb-6 uppercase tracking-tighter">Application Submitted</h2>
           <p className="text-lg text-surface-500 font-medium mb-8">Your contribution request is being reviewed by the CHAMP 21 administration. We will notify you via email once approved.</p>
           <p className="text-xs font-black text-primary-600 uppercase tracking-widest">Redirecting to Login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-surface-900 uppercase tracking-tighter">Lead the Change</h1>
          <p className="text-xl text-primary-600 font-bold uppercase tracking-widest mt-4">CHAMP 21 Co-Creative Contributor Registration</p>
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
                <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Topics of Expertise (Comma Separated)</label>
                <input required name="topics" onChange={handleChange} value={formData.topics} type="text" className="contribute-input" placeholder="Operational Efficiency, Patient Flow, Accreditation" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Expertise Level</label>
                <select name="expertiseLevel" onChange={handleChange} value={formData.expertiseLevel} className="contribute-input appearance-none">
                  <option value="intermediate">Intermediate (5-10 yrs)</option>
                  <option value="expert">Expert (10-20 yrs)</option>
                  <option value="leader">Industry Leader (20+ yrs)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-surface-400 uppercase tracking-widest">LinkedIn Profile (Full URL)</label>
                <input name="linkedIn" onChange={handleChange} value={formData.linkedIn} type="url" className="contribute-input" placeholder="https://linkedin.com/in/..." />
              </div>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold uppercase text-center">{error}</div>}

            <button disabled={loading} className="btn-primary w-full py-6 text-sm font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-2xl shadow-primary-500/20">
               {loading ? "Submitting Application..." : "Submit Application for Review"}
            </button>
            <p className="text-center text-[10px] text-surface-400 font-bold uppercase tracking-widest">By submitting, you agree to our Code of Ethics and Professional Guidelines.</p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
