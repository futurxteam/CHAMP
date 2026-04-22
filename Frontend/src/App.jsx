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
import JoinChampPage from "./pages/JoinChampPage";
import CertificationPage from "./pages/CertificationPage";
import AdminDashboard from "./pages/dashboards/admin/AdminDashboard";
import ContributorDashboard from "./pages/dashboards/contributor/ContributorDashboard";
import UserDashboard from "./pages/dashboards/user/UserDashboard";

import RegisterCertificationPage from "./pages/RegisterCertificationPage";
import CommunityNarrativePage from "./pages/CommunityNarrativePage";
import ContributorPage from "./pages/ContributorPage";
import AboutPage from "./pages/AboutPage";
import CommunityEcosystemPage from "./pages/CommunityEcosystemPage";
import CertificationOverviewPage from "./pages/CertificationOverviewPage";
import EngagementPage from "./pages/EngagementPage";
import LeadSessionPage from "./pages/LeadSessionPage";
import CareersPage from "./pages/CareersPage";
import TalentPoolPage from "./pages/TalentPoolPage";
import HirePage from "./pages/HirePage";
import InsightsPage from "./pages/InsightsPage";
import EventsOverviewPage from "./pages/EventsOverviewPage";
import MembershipPage from "./pages/MembershipPage";
import PartnershipsPage from "./pages/PartnershipsPage";
import ImpactPage from "./pages/ImpactPage";
import MemberExperiencesPage from "./pages/MemberExperiencesPage";
import CareerStoriesPage from "./pages/CareerStoriesPage";
import OrgImpactPage from "./pages/OrgImpactPage";
import MetricsPage from "./pages/MetricsPage";
import SupportPage from "./pages/SupportPage";
import ContactUsPage from "./pages/ContactUsPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import EnquiriesPage from "./pages/EnquiriesPage";
import LegalPage from "./pages/LegalPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import EthicsPage from "./pages/EthicsPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import DashboardRedirect from "./pages/dashboards/DashboardRedirect";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AuthRoute({ children }) {
  const { isAuthenticated } = useStore();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
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
        <Route path="/about" element={<AppLayout><AboutPage /></AppLayout>} />
        <Route path="/events" element={<AppLayout><EventsPage /></AppLayout>} />
        <Route path="/events/:id" element={<AppLayout><EventDetailPage /></AppLayout>} />
        <Route path="/blogs" element={<AppLayout><BlogsPage /></AppLayout>} />
        <Route path="/blogs/:id" element={<AppLayout><BlogDetailPage /></AppLayout>} />
        <Route path="/news" element={<AppLayout><NewsPage /></AppLayout>} />
        <Route path="/pricing" element={<AppLayout><PricingPage /></AppLayout>} />
        <Route path="/certification" element={<AppLayout><CertificationPage /></AppLayout>} />
        <Route path="/certification-assessment" element={<AppLayout><CertificationOverviewPage /></AppLayout>} />
        <Route path="/engagement" element={<AppLayout><EngagementPage /></AppLayout>} />
        <Route path="/lead-session" element={<AppLayout><LeadSessionPage /></AppLayout>} />
        <Route path="/careers" element={<AppLayout><CareersPage /></AppLayout>} />
        <Route path="/talent-pool" element={<AppLayout><TalentPoolPage /></AppLayout>} />
        <Route path="/insights" element={<AppLayout><InsightsPage /></AppLayout>} />
        <Route path="/events-overview" element={<AppLayout><EventsOverviewPage /></AppLayout>} />
        <Route path="/membership" element={<AppLayout><MembershipPage /></AppLayout>} />
        <Route path="/partnerships" element={<AppLayout><PartnershipsPage /></AppLayout>} />
        <Route path="/hire" element={<AppLayout><HirePage /></AppLayout>} />

        {/* Impact Subpages */}
        <Route path="/impact" element={<AppLayout><ImpactPage /></AppLayout>} />
        <Route path="/impact/member-experiences" element={<AppLayout><MemberExperiencesPage /></AppLayout>} />
        <Route path="/impact/career-stories" element={<AppLayout><CareerStoriesPage /></AppLayout>} />
        <Route path="/impact/organizational" element={<AppLayout><OrgImpactPage /></AppLayout>} />
        <Route path="/impact/metrics" element={<AppLayout><MetricsPage /></AppLayout>} />

        {/* Support Subpages */}
        <Route path="/support" element={<AppLayout><SupportPage /></AppLayout>} />
        <Route path="/support/contact" element={<AppLayout><ContactUsPage /></AppLayout>} />
        <Route path="/support/help-center" element={<AppLayout><HelpCenterPage /></AppLayout>} />
        <Route path="/support/enquiries" element={<AppLayout><EnquiriesPage /></AppLayout>} />

        {/* Legal Subpages */}
        <Route path="/legal" element={<AppLayout><LegalPage /></AppLayout>} />
        <Route path="/legal/privacy" element={<AppLayout><PrivacyPolicyPage /></AppLayout>} />
        <Route path="/legal/terms" element={<AppLayout><TermsConditionsPage /></AppLayout>} />
        <Route path="/legal/ethics" element={<AppLayout><EthicsPage /></AppLayout>} />
        <Route path="/legal/refund" element={<AppLayout><RefundPolicyPage /></AppLayout>} />



        {/* Dashboards */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
        <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/contributor" element={<ProtectedRoute><ContributorDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

        <Route path="/register-certification" element={<AppLayout><RegisterCertificationPage /></AppLayout>} />
        <Route path="/join" element={<AppLayout><JoinChampPage /></AppLayout>} />
        <Route path="/community" element={<AppLayout><CommunityEcosystemPage /></AppLayout>} />
        <Route path="/join-community" element={<AppLayout><CommunityNarrativePage /></AppLayout>} />
        <Route path="/contributor" element={<AppLayout><ContributorPage /></AppLayout>} />
        <Route path="/lead-session" element={<AppLayout><LeadSessionPage /></AppLayout>} />
        <Route path="/community-ecosystem" element={<AppLayout><CommunityEcosystemPage /></AppLayout>} />
        {/* Protected pages */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
