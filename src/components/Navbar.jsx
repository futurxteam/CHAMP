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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShowNotif(false);
    setShowProfile(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/events", label: "Events", icon: "📅" },
    { to: "/blogs", label: "Community", icon: "📝" },
    { to: "/news", label: "News", icon: "📰" },
    { to: "/pricing", label: "Membership", icon: "💎" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-surface-100"
            : "bg-white/70 backdrop-blur-md border-b border-white/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                CHAMP
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? "text-primary-700 bg-primary-50"
                      : "text-surface-600 hover:text-primary-600 hover:bg-surface-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <button
                    onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                    className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 relative"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                    )}
                  </button>

                  {/* Profile */}
                  <button
                    onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                    className="p-1 rounded-full hover:ring-2 hover:ring-primary-100 transition-all"
                  >
                    <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full object-cover shadow-sm" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link to="/login" className="px-3 py-1.5 text-xs sm:text-sm font-medium text-surface-600 hover:text-primary-600">Sign In</Link>
                  <Link to="/signup" className="px-3 py-1.5 text-xs sm:text-sm font-bold text-white bg-primary-600 rounded-lg shadow-md hover:shadow-primary-500/30 transition-all">Join</Link>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dropdowns */}
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-4 top-16 w-80 bg-white rounded-2xl shadow-2xl border border-surface-100 overflow-hidden"
            >
              <div className="p-4 border-b border-surface-50 font-bold text-surface-800">Notifications</div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-4 border-b border-surface-50 last:border-0 hover:bg-surface-50 transition-colors">
                    <p className="text-sm text-surface-700">{n.text}</p>
                    <p className="text-[10px] text-surface-400 mt-1 uppercase font-bold">{n.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-4 top-16 w-56 bg-white rounded-2xl shadow-2xl border border-surface-100 overflow-hidden"
            >
              <div className="p-4 border-b border-surface-50">
                <p className="font-bold text-surface-900 leading-tight">{user?.name}</p>
                <p className="text-xs text-surface-500 mt-0.5">{user?.email}</p>
              </div>
              <div className="p-2">
                <Link to="/profile" className="block w-full text-left px-3 py-2 text-sm font-semibold text-surface-600 hover:bg-surface-50 rounded-lg">👤 My Profile</Link>
                <Link to="/pricing" className="block w-full text-left px-3 py-2 text-sm font-semibold text-surface-600 hover:bg-surface-50 rounded-lg">💎 Membership</Link>
                <button
                  onClick={() => { logout(); navigate("/login"); }}
                  className="block w-full text-left px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                >
                  🚪 Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-[150] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-[160] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 h-16 flex items-center justify-between border-b border-surface-50">
                <span className="font-black text-surface-400 uppercase tracking-widest text-[10px]">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-surface-50 rounded-lg">
                  <svg className="w-6 h-6 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {isAuthenticated ? (
                  <div className="p-4 bg-primary-50 rounded-2xl flex items-center gap-4">
                    <img src={user?.avatar} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white" alt="" />
                    <div>
                      <p className="font-bold text-surface-900 leading-tight">{user?.name}</p>
                      <p className="text-[10px] text-primary-600 font-bold uppercase tracking-wider">{user?.role}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-surface-50 rounded-2xl">
                    <p className="font-bold text-surface-900">Guest Visitor</p>
                    <Link to="/login" className="text-xs text-primary-600 font-bold hover:underline">Sign in to save progress</Link>
                  </div>
                )}

                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                        isActive(link.to)
                          ? "text-primary-700 bg-primary-50"
                          : "text-surface-600 hover:bg-surface-50"
                      }`}
                    >
                      <span className="xl">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>

                {isAuthenticated && (
                  <div className="pt-6 border-t border-surface-50 space-y-1">
                    <Link to="/profile" className="flex items-center gap-4 px-4 py-3 text-sm font-bold text-surface-600 hover:bg-surface-50 rounded-xl">
                      <span>👤</span>
                      My Profile
                    </Link>
                    <button onClick={() => { logout(); navigate("/login"); }} className="flex items-center gap-4 w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl">
                      <span>🚪</span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t border-surface-50">
                <Link to="/pricing" className="block w-full py-4 text-center text-sm font-black text-white bg-primary-600 rounded-2xl shadow-lg shadow-primary-500/20">
                  {user?.isPremium ? "Manage Membership" : "Join Membership"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
