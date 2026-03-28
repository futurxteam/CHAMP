import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [email, setEmail] = useState("sarah.mitchell@champ.io");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-white/5" />
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
              Connect. Learn.<br />
              <span className="text-accent-300">Transform Healthcare.</span>
            </h1>
            <p className="text-primary-200 text-lg max-w-md leading-relaxed">
              Join the premier community of healthcare professionals. Access exclusive events, share knowledge, and advance your career.
            </p>

            <div className="mt-12 space-y-4">
              {[
                { icon: "🏥", text: "10,000+ Healthcare Professionals" },
                { icon: "📅", text: "200+ Expert-Led Events Annually" },
                { icon: "📝", text: "Curated Research & Insights" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex items-center gap-3 text-primary-100"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
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

          <h2 className="text-2xl font-bold text-surface-900 mb-1">Welcome back</h2>
          <p className="text-surface-500 mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-800 placeholder-surface-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-surface-200 bg-white text-surface-800 placeholder-surface-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-surface-600">Remember me</span>
              </label>
              <button type="button" className="text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-surface-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
              Create account
            </Link>
          </div>

          {/* Demo hint */}
          <div className="mt-6 p-3 rounded-xl bg-primary-50 border border-primary-100">
            <p className="text-xs text-primary-700 text-center">
              💡 <strong>Demo:</strong> Click "Sign In" with the prefilled credentials to explore.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
