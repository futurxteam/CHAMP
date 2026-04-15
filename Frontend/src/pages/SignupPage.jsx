import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, error: authError } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    setError("");

    const success = await signup(name, email, password);
    setLoading(false);
    
    if (success) {
      navigate("/");
    } else {
      setError(authError || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 left-16 w-72 h-72 rounded-full bg-accent-500/15 blur-3xl" />
          <div className="absolute bottom-32 right-16 w-80 h-80 rounded-full bg-primary-300/15 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-3xl font-bold text-white">CHAMP</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Start Your Journey<br />
              <span className="text-accent-300">In Healthcare Innovation.</span>
            </h1>
            <p className="text-primary-200 text-lg max-w-md leading-relaxed">
              Create your free account and join thousands of healthcare leaders who are shaping the future of medicine.
            </p>

            {/* Testimonial */}
            <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <p className="text-primary-100 text-sm italic leading-relaxed mb-4">
                "CHAMP has been instrumental in connecting me with researchers worldwide. The events and community discussions have directly influenced my clinical practice."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=40&h=40&fit=crop&crop=face"
                  alt="Testimonial"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                />
                <div>
                  <p className="text-white text-sm font-semibold">Dr. Michael Chen</p>
                  <p className="text-primary-300 text-xs">Oncologist, MD Anderson</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-primary-700">CHAMP</span>
          </div>

          <h2 className="text-2xl font-bold text-surface-900 mb-1">Create your account</h2>
          <p className="text-surface-500 mb-8">Join the healthcare community today</p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-800 placeholder-surface-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                placeholder="Dr. John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-800 placeholder-surface-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                placeholder="john.smith@hospital.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-800 placeholder-surface-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                placeholder="Create a strong password"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-xs text-surface-500 leading-relaxed">
                I agree to the <span className="text-primary-600 font-medium">Terms of Service</span> and <span className="text-primary-600 font-medium">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-surface-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
