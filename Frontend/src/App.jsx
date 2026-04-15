import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import useStore from "./store/useStore";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import NewsPage from "./pages/NewsPage";
import ProfilePage from "./pages/ProfilePage";
import PricingPage from "./pages/PricingPage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AuthRoute({ children }) {
  const { isAuthenticated } = useStore();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">C</span>
              </div>
              <span className="text-lg font-bold text-white">CHAMP</span>
            </div>
            <p className="text-sm leading-relaxed">
              The premier community platform for healthcare professionals. Connect, learn, and transform healthcare together.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2026 CHAMP. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <a key={social} href="#" className="text-xs hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth pages - no navbar/footer */}
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><SignupPage /></AuthRoute>} />

        {/* Public pages - with navbar/footer */}
        <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
        <Route path="/events" element={<AppLayout><EventsPage /></AppLayout>} />
        <Route path="/events/:id" element={<AppLayout><EventDetailPage /></AppLayout>} />
        <Route path="/blogs" element={<AppLayout><BlogsPage /></AppLayout>} />
        <Route path="/blogs/:id" element={<AppLayout><BlogDetailPage /></AppLayout>} />
        <Route path="/news" element={<AppLayout><NewsPage /></AppLayout>} />
        <Route path="/pricing" element={<AppLayout><PricingPage /></AppLayout>} />

        {/* Protected pages */}
        <Route path="/profile" element={<ProtectedRoute><AppLayout><ProfilePage /></AppLayout></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
