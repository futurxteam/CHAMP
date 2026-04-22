import { useState, useEffect, useRef } from "react";
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
  const scrollRef = useRef(null);

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
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/engagement", label: "Learning" },
    { to: "/community-ecosystem", label: "Community" },
    { to: "/events-overview", label: "Events" },
    { to: "/certification-assessment", label: "Certification" },
    { to: "/insights", label: "Insights" },
    { to: "/careers", label: "Careers" },
    { to: "/partnerships", label: "Partnerships" },
    { to: "/membership", label: "Membership" },
    { to: "/contributor", label: "Contributor" },
    { to: "/impact", label: "Impact" },
    { to: "/support", label: "Support" },
    { to: "/legal", label: "Legal" },
  ];

  const handleScrollNav = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-surface-100"
            : "bg-white/80 backdrop-blur-lg border-b border-white/20"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-surface-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xs uppercase">C</span>
            </div>
            <span className="text-lg font-black tracking-tighter text-surface-900 hidden lg:block">CHAMP</span>
          </Link>

          {/* Nav Container with Scroll */}
          <div className="hidden md:flex flex-1 items-center gap-2 overflow-hidden relative group/nav">
             {/* Left Arrow */}
             <button 
                onClick={() => handleScrollNav("left")}
                className="absolute left-0 z-10 p-1 bg-white/90 backdrop-blur rounded-full shadow-md border border-surface-100 opacity-0 group-hover/nav:opacity-100 transition-opacity"
             >
                <svg className="w-4 h-4 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
             </button>

             {/* Links */}
             <div 
                ref={scrollRef}
                className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth flex-1 px-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
             >
               {navLinks.map((link, idx) => (
                 <Link
                   key={idx}
                   to={link.to}
                   className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                     isActive(link.to)
                       ? "text-primary-600 bg-primary-50"
                       : "text-surface-500 hover:text-surface-900 hover:bg-surface-50"
                   }`}
                 >
                   {link.label}
                 </Link>
               ))}
             </div>

             {/* Right Arrow */}
             <button 
                onClick={() => handleScrollNav("right")}
                className="absolute right-0 z-10 p-1 bg-white/90 backdrop-blur rounded-full shadow-md border border-surface-100 opacity-0 group-hover/nav:opacity-100 transition-opacity"
             >
                <svg className="w-4 h-4 text-surface-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                  className="p-2 rounded-lg text-surface-400 hover:bg-surface-50 relative"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full border-2 border-white" />
                  )}
                </button>

                <button
                  onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                  className="p-1 rounded-full hover:ring-2 hover:ring-primary-100 transition-all overflow-hidden"
                >
                  <img src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-surface-200" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-3 py-2 text-[10px] font-black text-surface-500 hover:text-primary-600 uppercase tracking-widest transition-colors">Login</Link>
                <Link to="/join" className="px-6 py-2 text-[10px] font-black text-white bg-primary-600 rounded-xl shadow-lg shadow-primary-500/20 hover:scale-105 transition-all uppercase tracking-widest">Join</Link>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl text-surface-900 bg-surface-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Global Overlays */}
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="absolute right-4 top-16 w-80 bg-white rounded-3xl shadow-2xl border border-surface-100 overflow-hidden z-[110]"
            >
              <div className="p-5 border-b border-surface-50 font-black text-xs uppercase tracking-widest text-surface-900 bg-surface-50/30">Notifications</div>
              <div className="max-h-96 overflow-y-auto p-2">
                {notifications.map(n => (
                  <div key={n.id} className="p-4 hover:bg-surface-50 rounded-2xl transition-colors">
                    <p className="text-sm text-surface-600 font-medium">{n.text}</p>
                    <p className="text-[10px] text-surface-300 mt-2 font-black uppercase">{n.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="absolute right-4 top-16 w-64 bg-white rounded-[2rem] shadow-2xl border border-surface-100 overflow-hidden z-[110]"
            >
              <div className="p-6 bg-surface-50/50 border-b border-surface-50">
                <p className="font-black text-surface-900 leading-tight uppercase tracking-widest text-[10px]">{user?.name}</p>
                <p className="text-[10px] text-surface-400 mt-1 font-bold italic">{user?.email}</p>
              </div>
              <div className="p-3 space-y-1">
                <Link 
                  to={
                    user?.role === "admin" ? "/dashboard/admin" :
                    (user?.role === "L2" || user?.role === "L3") ? "/dashboard/contributor" :
                    user?.role === "L1" ? "/dashboard/user" : "/profile"
                  } 
                  className="flex items-center gap-3 px-4 py-3 text-[10px] font-black text-primary-600 bg-primary-50/50 hover:bg-primary-50 rounded-2xl transition-all uppercase tracking-widest"
                >
                  Dashboard
                </Link>
                <Link to="/pricing" className="flex items-center gap-3 px-4 py-3 text-[10px] font-black text-surface-600 hover:bg-surface-50 rounded-2xl transition-all uppercase tracking-widest">Membership</Link>
                <div className="h-px bg-surface-50 mx-2 my-1" />
                <button
                  onClick={() => { logout(); navigate("/login"); }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 text-[10px] font-black text-red-600 hover:bg-red-50 rounded-2xl transition-all uppercase tracking-widest"
                >
                  Sign Out
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-surface-900/40 backdrop-blur-sm z-[150] md:hidden" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white z-[160] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 h-16 flex items-center justify-between border-b border-surface-100 bg-surface-50/50">
                <span className="font-black text-surface-400 uppercase tracking-widest text-[10px]">Portal</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-surface-100 rounded-xl"><svg className="w-6 h-6 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link, idx) => (
                  <Link 
                    key={idx} 
                    to={link.to} 
                    className={`flex items-center px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                      isActive(link.to) ? "text-primary-600 bg-primary-50" : "text-surface-600 hover:bg-surface-50"
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
                      className="block w-full text-center bg-primary-50 text-primary-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                    >
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); navigate("/login"); }} className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">Sign Out</button>
                  </div>
                ) : (
                  <Link to="/join" className="block w-full text-center bg-primary-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-500/20">Join Ecosystem</Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
