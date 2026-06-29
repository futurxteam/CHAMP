import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../store/useStore";

export default function Navbar() {
  const { isAuthenticated, user, logout, notifications } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShowNotif(false);
    setShowProfile(false);
  }, [location]);

  const navLinks = [
    { to: "/engagement", label: "Learning" },
    { to: "/certification", label: "Certifications" },
    { to: "/community", label: "Community" },
    { to: "/events", label: "Events" },
    { to: "/insights", label: "Insights" },
    { to: "/partnerships", label: "Partnerships" },
    { to: "/membership", label: "Membership" },
    { to: "/about", label: "About" },
    { to: "/contributor", label: "Contributor" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 font-sans ${scrolled
          ? "h-14 bg-white/70 backdrop-blur-xl border-b border-surface-200/40 shadow-sm"
          : "h-16 bg-white/40 backdrop-blur-md border-b border-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between gap-4">
          
          {/* LEFT: Logo Section */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0 relative z-[110]">
            <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:scale-[1.04] transition-all duration-300">
              <span className="text-white font-extrabold text-sm tracking-tighter">C</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-surface-900 group-hover:text-primary-600 transition-colors">
              CHAMP
            </span>
          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="hidden xl:flex items-center gap-1.5 relative">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 rounded-lg hover:text-surface-900 ${active ? "text-primary-600 font-bold" : "text-surface-500"
                    }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-primary-50/60 border border-primary-100/30 rounded-lg z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Auth Area / User Profile (Desktop) */}
          <div className="hidden xl:flex items-center gap-4 flex-shrink-0 relative z-[110]">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Notifications Button */}
                <button
                  onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                  className="p-1.5 rounded-lg text-surface-400 hover:text-surface-900 hover:bg-surface-100/50 transition-colors relative"
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary-600 rounded-full border border-white" />
                  )}
                </button>

                {/* Profile Button */}
                <button
                  onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                  className="p-0.5 rounded-full hover:ring-2 hover:ring-primary-100 transition-all overflow-hidden"
                >
                  <img src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"} alt="" className="w-7 h-7 rounded-full object-cover ring-1 ring-surface-200" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-3.5 py-1.5 text-xs font-semibold text-surface-600 hover:text-surface-900 transition-colors">
                  Login
                </Link>
                <Link to="/join" className="px-4 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-sm shadow-primary-500/10 hover:scale-[1.02] transition-all">
                  Join CHAMP
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu (Mobile & Tablet) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100/50 transition-colors relative z-[110]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Desktop Overlays (Notifications & Profile) */}
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="absolute right-6 top-14 w-80 bg-white rounded-2xl shadow-xl border border-surface-200/50 overflow-hidden z-[110]"
            >
              <div className="p-4 border-b border-surface-100 font-bold text-xs uppercase tracking-wider text-surface-900 bg-surface-50/50">Notifications</div>
              <div className="max-h-80 overflow-y-auto p-1.5">
                {notifications.map(n => (
                  <div key={n.id} className="p-3 hover:bg-surface-50 rounded-xl transition-colors">
                    <p className="text-xs text-surface-600 font-medium">{n.text}</p>
                    <p className="text-[9px] text-surface-400 mt-1 font-bold">{n.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="absolute right-6 top-14 w-60 bg-white rounded-2xl shadow-xl border border-surface-200/50 overflow-hidden z-[110]"
            >
              <div className="p-4 bg-surface-50/50 border-b border-surface-100">
                <p className="font-bold text-surface-900 text-xs leading-none">{user?.name}</p>
                <p className="text-[10px] text-surface-400 mt-1 font-medium italic">{user?.email}</p>
              </div>
              <div className="p-2 space-y-0.5">
                <Link
                  to={
                    user?.role === "admin" ? "/dashboard/admin" :
                      (user?.role === "L2" || user?.role === "L3") ? "/dashboard/contributor" :
                        user?.role === "L1" ? "/dashboard/user" : "/profile"
                  }
                  className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                >
                  Dashboard
                </Link>
                <Link to="/pricing" className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-surface-600 hover:bg-surface-50 rounded-xl transition-all">Membership</Link>
                <div className="h-px bg-surface-100 my-1 mx-1" />
                <button
                  onClick={() => { logout(); navigate("/"); }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Drawer (Tablet & Mobile viewports) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-surface-950/20 backdrop-blur-sm z-[150]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-[160] shadow-2xl flex flex-col pt-16 border-l border-surface-200/50"
            >
              <div className="flex-1 overflow-y-auto p-6 space-y-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center px-4 py-3 rounded-xl text-xs font-semibold transition-all ${isActive(link.to) ? "text-primary-600 bg-primary-50/50" : "text-surface-600 hover:bg-surface-50"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-surface-100">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to={
                        user?.role === "admin" ? "/dashboard/admin" :
                          (user?.role === "L2" || user?.role === "L3") ? "/dashboard/contributor" :
                            user?.role === "L1" ? "/dashboard/user" : "/profile"
                      }
                      className="block w-full text-center bg-primary-50 text-primary-600 py-3 rounded-xl font-bold text-xs"
                    >
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); navigate("/"); }} className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold text-xs">Sign Out</button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block w-full text-center py-3 text-xs font-semibold text-surface-600 hover:bg-surface-50 rounded-xl transition-all">Login</Link>
                    <Link to="/join" className="block w-full text-center bg-primary-600 text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-primary-500/10">Join CHAMP</Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
