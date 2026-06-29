import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./dashboards/dashboard.css";
import useStore from "../store/useStore";
import { courseApi, progressApi } from "../api/api";

// ─── courseType Architecture (extensible for future types) ────────────────────
// To add a new type: add an entry here with label, badge styles, accent, icon.
// Future: premium, institutional, bundle, sponsored
const COURSE_TYPES = {
  remediation: {
    key: "remediation",
    label: "FREE REMEDIATION",
    badgeBg: "rgba(6,78,59,0.9)",
    badgeColor: "#6ee7b7",
    badgeBorder: "rgba(16,185,129,0.4)",
    accentColor: "#10b981",
    accentLight: "#d1fae5",
    accentDark: "#065f46",
    icon: "🎓",
    borderColor: "#10b981",
    progressGradient: "linear-gradient(90deg,#059669,#10b981)",
    btnBg: "linear-gradient(135deg,#059669,#10b981)",
    btnHoverBg: "#047857",
    description: "Free remediation course",
  },
  paid: {
    key: "paid",
    label: "PAID COURSE",
    badgeBg: "rgba(30,58,138,0.9)",
    badgeColor: "#93c5fd",
    badgeBorder: "rgba(59,130,246,0.4)",
    accentColor: "#3b82f6",
    accentLight: "#dbeafe",
    accentDark: "#1e3a8a",
    icon: "⭐",
    borderColor: "#3b82f6",
    progressGradient: "linear-gradient(90deg,#6366f1,#8b5cf6)",
    btnBg: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
    btnHoverBg: "#1d4ed8",
    description: "Purchased course",
  },
};

// Map from API enrollmentType → our courseType key
function resolveCourseType(enrollmentType) {
  if (enrollmentType === "free") return "remediation";
  if (enrollmentType === "paid") return "paid";
  return "paid"; // default fallback
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(dateStr) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins > 0) return `${mins}m ago`;
  return "Just now";
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(seconds) {
  if (!seconds || seconds <= 0) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

// Estimate remaining time: assumes total content is proportional to watched
function estimateRemaining(prog) {
  const totalWatched = Object.values(prog?.progressMap || {}).reduce(
    (s, l) => s + (l.watchedSeconds || 0),
    0
  );
  const pct = prog?.courseProgress || 0;
  if (pct <= 0 || totalWatched <= 0) return null;
  const estimatedTotal = (totalWatched / pct) * 100;
  const remaining = estimatedTotal - totalWatched;
  return formatTime(Math.max(0, remaining));
}

const SORT_OPTIONS = [
  { value: "recent_accessed", label: "Recently Accessed" },
  { value: "recent_enrolled", label: "Recently Enrolled" },
  { value: "highest_progress", label: "Highest Progress" },
  { value: "alphabetical", label: "Alphabetical" },
];

const FILTER_TABS = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "remediation", label: "Free Remediation" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const menuItems = [
  { id: "discover", label: "Discover Content", icon: "🌐", link: "/dashboard/user?tab=discover" },
  { id: "my-courses", label: "My Courses", icon: "📚", link: "/my-courses" },
  { id: "saved", label: "Saved Resources", icon: "🔖", link: "/dashboard/user?tab=saved" },
  { id: "profile", label: "My Profile", icon: "👤", link: "/dashboard/user?tab=profile" },
  { id: "certs", label: "My Certifications", icon: "🏆", link: "/dashboard/user?tab=certs" },
  { id: "learning", label: "My Learning & Programs", icon: "📖", link: "/dashboard/user?tab=learning" },
  { id: "test", label: "Test Dashboard", icon: "🧪", link: "/dashboard/user?tab=test" },
  { id: "discussions", label: "Community Discussions", icon: "💬", link: "/dashboard/user?tab=discussions" },
  { id: "events", label: "Events & Registrations", icon: "📅", link: "/dashboard/user?tab=events" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function CourseTypeBadge({ typeKey }) {
  const type = COURSE_TYPES[typeKey] || COURSE_TYPES.paid;
  return (
    <span
      style={{
        background: type.badgeBg,
        color: type.badgeColor,
        border: `1px solid ${type.badgeBorder}`,
        fontSize: "8px",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        padding: "4px 10px",
        borderRadius: "999px",
        backdropFilter: "blur(8px)",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        whiteSpace: "nowrap",
      }}
    >
      {type.icon} {type.label}
    </span>
  );
}

function CertRelationshipBlock({ course, pct }) {
  const certName =
    course.certificationId?.title ||
    course.certTitle ||
    course.certificationTitle ||
    null;

  const retakeAvailable = pct >= 100;

  return (
    <div className="mc-cert-block">
      {certName && (
        <div className="mc-cert-reason">
          <span className="mc-cert-icon">🎓</span>
          <div>
            <p className="mc-cert-label">Recommended because you failed:</p>
            <p className="mc-cert-name">{certName}</p>
          </div>
        </div>
      )}
      <div className={`mc-retake-status ${retakeAvailable ? "mc-retake-available" : "mc-retake-locked"}`}>
        {retakeAvailable ? (
          <>✓ Certification Retake Available</>
        ) : (
          <>🔒 Complete this course to unlock certification retake</>
        )}
      </div>
    </div>
  );
}

function PaidCourseInfo({ course }) {
  const purchasedOn = formatDate(course.enrolledAt || course.purchasedAt || course.createdAt);
  const price = course.price;
  return (
    <div className="mc-paid-info">
      <span className="mc-paid-icon">💳</span>
      <div>
        {purchasedOn && (
          <p className="mc-paid-label">Purchased on <strong>{purchasedOn}</strong></p>
        )}
        {price > 0 && (
          <p className="mc-paid-amount">₹{price.toLocaleString()} · Lifetime Access</p>
        )}
      </div>
    </div>
  );
}

function CourseCard({ course, prog, index, navigate }) {
  const pct = prog?.courseProgress ?? 0;
  const completed = pct >= 100;
  const typeKey = resolveCourseType(course.enrollmentType);
  const type = COURSE_TYPES[typeKey];
  const lastAccessed = timeAgo(course.lastAccessedAt || prog?.lastAccessedAt);
  const lessonsCompleted = Object.values(prog?.progressMap || {}).filter((l) => l.completed).length;
  const totalLessons = Object.keys(prog?.progressMap || {}).length;
  const timeRemaining = estimateRemaining(prog);
  const progressGradient = completed
    ? "linear-gradient(90deg,#059669,#10b981)"
    : type.progressGradient;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="mc-course-card"
      style={{ borderLeft: `4px solid ${type.borderColor}` }}
    >
      {/* Thumbnail */}
      <div className="mc-thumb-wrap">
        <img
          src={course.thumbnail || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800"}
          className="mc-thumb"
          alt={course.title}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800";
          }}
        />
        {/* Type badge overlay */}
        <div className="mc-badge-overlay">
          <CourseTypeBadge typeKey={typeKey} />
        </div>
        {/* Completed overlay */}
        {completed && (
          <div className="mc-completed-overlay">
            <span>✓</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="mc-card-body">
        {/* Domain + Title */}
        <div>
          <span className="mc-domain">{course.domain}</span>
          <h3 className="mc-title">{course.title}</h3>
        </div>

        {/* Instructor */}
        <div className="mc-meta-row">
          <div className="mc-avatar" style={{ background: type.accentDark }}>
            {(course.instructor || course.createdBy?.name || "I").charAt(0)}
          </div>
          <span className="mc-meta-text">
            By <strong>{course.instructor || course.createdBy?.name || "CHAMP Faculty"}</strong>
          </span>
        </div>

        {/* Stats Grid */}
        <div className="mc-stats-grid">
          {totalLessons > 0 && (
            <div className="mc-stat">
              <span className="mc-stat-val">{lessonsCompleted}/{totalLessons}</span>
              <span className="mc-stat-label">Lessons</span>
            </div>
          )}
          {timeRemaining && !completed && (
            <div className="mc-stat">
              <span className="mc-stat-val">{timeRemaining}</span>
              <span className="mc-stat-label">Est. Remaining</span>
            </div>
          )}
          {lastAccessed && (
            <div className="mc-stat">
              <span className="mc-stat-val">{lastAccessed}</span>
              <span className="mc-stat-label">Last Accessed</span>
            </div>
          )}
          {completed && (
            <div className="mc-stat" style={{ color: "#10b981" }}>
              <span className="mc-stat-val">✓</span>
              <span className="mc-stat-label">Completed</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mc-progress-section">
          <div className="mc-progress-header">
            <span>Progress</span>
            <span style={{ color: completed ? "#10b981" : type.accentColor, fontWeight: 900 }}>
              {pct}%
            </span>
          </div>
          <div className="mc-progress-bar-bg">
            <div
              className="mc-progress-bar-fill"
              style={{
                width: `${pct}%`,
                background: progressGradient,
                transition: "width 1s ease",
              }}
            />
          </div>
        </div>

        {/* Certification block for remediation */}
        {typeKey === "remediation" && (
          <CertRelationshipBlock course={course} pct={pct} />
        )}

        {/* Paid course info */}
        {typeKey === "paid" && (
          <PaidCourseInfo course={course} />
        )}

        {/* Action Button */}
        <button
          onClick={() => navigate(`/courses/${course._id}/learn`)}
          className="mc-action-btn"
          style={{
            background: completed
              ? "linear-gradient(135deg,#059669,#10b981)"
              : type.btnBg,
          }}
        >
          {completed ? "📖 Review Course" : pct > 0 ? "▶ Continue Learning" : "▶ Start Learning"}
          <span className="mc-btn-arrow">→</span>
        </button>
      </div>
    </motion.div>
  );
}

function ContinueLearningWidget({ course, prog, navigate }) {
  if (!course || !prog) return null;
  const pct = prog?.courseProgress ?? 0;
  if (pct >= 100) return null;

  const typeKey = resolveCourseType(course.enrollmentType);
  const type = COURSE_TYPES[typeKey];

  // Find the last accessed lesson title
  const lastLessonId = prog?.lastLessonId;
  const lastLesson = lastLessonId
    ? Object.entries(prog?.progressMap || {}).find(([k]) => k === lastLessonId)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mc-continue-widget"
    >
      <div className="mc-continue-left">
        <div className="mc-continue-thumb">
          <img
            src={course.thumbnail || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400"}
            alt={course.title}
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400"; }}
          />
          <div className="mc-continue-play">▶</div>
        </div>
        <div className="mc-continue-info">
          <div className="mc-continue-eyebrow">
            <span>⚡</span> Continue Learning
          </div>
          <h3 className="mc-continue-title">{course.title}</h3>
          {lastLesson && (
            <p className="mc-continue-lesson">
              Lesson: <strong>{lastLesson[1]?.lessonTitle || "Pick up where you left off"}</strong>
            </p>
          )}
          <div className="mc-continue-progress-row">
            <div className="mc-continue-bar-bg">
              <div
                className="mc-continue-bar-fill"
                style={{ width: `${pct}%`, background: type.progressGradient }}
              />
            </div>
            <span className="mc-continue-pct" style={{ color: type.accentColor }}>{pct}%</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(`/courses/${course._id}/learn`)}
        className="mc-continue-resume-btn"
        style={{ background: type.btnBg }}
      >
        Resume →
      </button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MyCoursesPage() {
  const { user, logout, token } = useStore();
  const navigate = useNavigate();

  const [enrolled, setEnrolled] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [loading, setLoading] = useState(true);

  // Controls
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent_accessed");
  const [sortOpen, setSortOpen] = useState(false);

  // ── Data fetch ────────────────────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    try {
      const courses = await courseApi.getEnrolledCourses(token);
      setEnrolled(courses);
      const progMap = {};
      await Promise.allSettled(
        courses.map(async (c) => {
          try {
            const prog = await progressApi.getForCourse(c._id, token);
            progMap[c._id] = prog;
          } catch {
            progMap[c._id] = { courseProgress: 0, progressMap: {} };
          }
        })
      );
      setProgressData(progMap);
    } catch (err) {
      console.error("Failed to load enrolled courses:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // ── Analytics ─────────────────────────────────────────────────────────────
  const analytics = useMemo(() => {
    const inProgress = enrolled.filter((c) => {
      const p = progressData[c._id]?.courseProgress ?? 0;
      return p > 0 && p < 100;
    }).length;
    const completedCount = enrolled.filter(
      (c) => (progressData[c._id]?.courseProgress ?? 0) >= 100
    ).length;
    const totalWatchedSecs = Object.values(progressData).reduce(
      (sum, p) =>
        sum + Object.values(p?.progressMap || {}).reduce((s, l) => s + (l.watchedSeconds || 0), 0),
      0
    );
    const hoursWatched = (totalWatchedSecs / 3600).toFixed(1);

    // Estimate remaining across all in-progress
    const totalRemainingSecs = enrolled.reduce((sum, c) => {
      const prog = progressData[c._id];
      const pct = prog?.courseProgress ?? 0;
      if (pct <= 0 || pct >= 100) return sum;
      const watched = Object.values(prog?.progressMap || {}).reduce((s, l) => s + (l.watchedSeconds || 0), 0);
      if (watched <= 0) return sum;
      const est = (watched / pct) * 100;
      return sum + Math.max(0, est - watched);
    }, 0);
    const estRemaining = formatTime(totalRemainingSecs);

    return { inProgress, completedCount, hoursWatched, estRemaining };
  }, [enrolled, progressData]);

  // ── Continue Learning subject ─────────────────────────────────────────────
  const continueCourse = useMemo(() => {
    const inProgressCourses = enrolled.filter((c) => {
      const p = progressData[c._id]?.courseProgress ?? 0;
      return p > 0 && p < 100;
    });
    if (inProgressCourses.length === 0) return null;
    // Sort by last accessed
    return inProgressCourses.sort((a, b) => {
      const ta = new Date(a.lastAccessedAt || progressData[a._id]?.lastAccessedAt || 0).getTime();
      const tb = new Date(b.lastAccessedAt || progressData[b._id]?.lastAccessedAt || 0).getTime();
      return tb - ta;
    })[0];
  }, [enrolled, progressData]);

  // ── Filter + Sort ─────────────────────────────────────────────────────────
  const filteredSorted = useMemo(() => {
    let list = [...enrolled];
    const q = searchQuery.toLowerCase().trim();

    // Search
    if (q) {
      list = list.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          (c.instructor || c.createdBy?.name || "").toLowerCase().includes(q) ||
          c.domain?.toLowerCase().includes(q)
      );
    }

    // Filter tab
    list = list.filter((c) => {
      const pct = progressData[c._id]?.courseProgress ?? 0;
      const typeKey = resolveCourseType(c.enrollmentType);
      if (activeFilter === "paid") return typeKey === "paid";
      if (activeFilter === "remediation") return typeKey === "remediation";
      if (activeFilter === "completed") return pct >= 100;
      if (activeFilter === "in_progress") return pct > 0 && pct < 100;
      return true;
    });

    // Sort
    list.sort((a, b) => {
      if (sortBy === "recent_accessed") {
        const ta = new Date(a.lastAccessedAt || progressData[a._id]?.lastAccessedAt || 0).getTime();
        const tb = new Date(b.lastAccessedAt || progressData[b._id]?.lastAccessedAt || 0).getTime();
        return tb - ta;
      }
      if (sortBy === "recent_enrolled") {
        return new Date(b.enrolledAt || b.createdAt || 0) - new Date(a.enrolledAt || a.createdAt || 0);
      }
      if (sortBy === "highest_progress") {
        return (progressData[b._id]?.courseProgress ?? 0) - (progressData[a._id]?.courseProgress ?? 0);
      }
      if (sortBy === "alphabetical") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });

    return list;
  }, [enrolled, progressData, searchQuery, activeFilter, sortBy]);

  const activeCourses = filteredSorted.filter(
    (c) => (progressData[c._id]?.courseProgress ?? 0) < 100
  );
  const completedCourses = filteredSorted.filter(
    (c) => (progressData[c._id]?.courseProgress ?? 0) >= 100
  );

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Sort";

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ── */}
      <aside className="dashboard-sidebar">
        <div className="px-4 mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-surface-900 flex items-center justify-center text-white font-black">C</div>
            <span className="text-xl font-black tracking-tighter text-surface-900">CHAMP</span>
          </Link>
        </div>
        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className={`sidebar-nav-item w-full text-left ${item.id === "my-courses" ? "active" : ""}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t border-surface-100 px-2">
          <button
            onClick={logout}
            className="sidebar-nav-item w-full text-left text-red-500 hover:bg-red-50"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="dashboard-content" onClick={() => sortOpen && setSortOpen(false)}>
        {/* Header */}
        <header className="dashboard-header flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">
              My Courses
            </h1>
            <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mt-1">
              Your unified learning dashboard
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-surface-900 flex items-center justify-center text-white font-black text-xl shadow-xl">
            {user?.name?.charAt(0)}
          </div>
        </header>

        <div className="dashboard-body">
          {loading ? (
            <div className="p-20 text-center">
              <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mx-auto mb-6" />
              <p className="text-surface-400 uppercase font-black text-xs tracking-widest">
                Retrieving your learning library...
              </p>
            </div>
          ) : enrolled.length === 0 ? (
            /* ── Empty State ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mc-empty-state"
            >
              <span className="mc-empty-icon">📖</span>
              <h3 className="mc-empty-title">No courses yet</h3>
              <p className="mc-empty-sub">
                You haven't enrolled in any courses yet. Browse paid courses or explore certifications to get started.
              </p>
              <div className="mc-empty-actions">
                <button
                  onClick={() => navigate("/dashboard/user?tab=learning")}
                  className="mc-empty-btn mc-empty-btn-primary"
                >
                  ⭐ Browse Paid Courses
                </button>
                <button
                  onClick={() => navigate("/dashboard/user?tab=test")}
                  className="mc-empty-btn mc-empty-btn-secondary"
                >
                  🎓 Explore Certifications
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* ── Analytics Strip ── */}
              <div className="mc-analytics-strip">
                {[
                  { icon: "🔥", val: analytics.inProgress, label: "In Progress" },
                  { icon: "✅", val: analytics.completedCount, label: "Completed" },
                  { icon: "⏱️", val: `${analytics.hoursWatched}h`, label: "Hours Watched" },
                  { icon: "🎯", val: analytics.estRemaining || "—", label: "Est. Remaining" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="mc-analytics-card"
                  >
                    <span className="mc-analytics-icon">{stat.icon}</span>
                    <div>
                      <p className="mc-analytics-val">{stat.val}</p>
                      <p className="mc-analytics-label">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ── Continue Learning Widget ── */}
              <AnimatePresence>
                {continueCourse && (
                  <ContinueLearningWidget
                    course={continueCourse}
                    prog={progressData[continueCourse._id]}
                    navigate={navigate}
                  />
                )}
              </AnimatePresence>

              {/* ── Search + Filter + Sort ── */}
              <div className="mc-controls">
                {/* Search */}
                <div className="mc-search-wrap">
                  <span className="mc-search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search by title, instructor or domain..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mc-search-input"
                    id="mc-search-input"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mc-search-clear"
                    >×</button>
                  )}
                </div>

                {/* Sort */}
                <div className="mc-sort-wrap" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="mc-sort-btn"
                    onClick={() => setSortOpen((o) => !o)}
                    id="mc-sort-btn"
                  >
                    ↕ {currentSortLabel}
                    <span style={{ marginLeft: "6px", opacity: 0.5 }}>{sortOpen ? "▲" : "▼"}</span>
                  </button>
                  {sortOpen && (
                    <div className="mc-sort-dropdown">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          className={`mc-sort-option ${sortBy === opt.value ? "mc-sort-option-active" : ""}`}
                          onClick={() => {
                            setSortBy(opt.value);
                            setSortOpen(false);
                          }}
                        >
                          {opt.label}
                          {sortBy === opt.value && <span style={{ marginLeft: "auto" }}>✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Filter Tabs ── */}
              <div className="mc-filter-tabs">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveFilter(tab.value)}
                    className={`mc-filter-tab ${activeFilter === tab.value ? "mc-filter-tab-active" : ""}`}
                    id={`mc-filter-${tab.value}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── No results state ── */}
              {filteredSorted.length === 0 && (
                <div className="mc-no-results">
                  <span>🔍</span>
                  <p>No courses match your current filters.</p>
                  <button
                    onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
                    className="mc-clear-filters-btn"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* ── Continue Learning Section (In Progress) ── */}
              {activeCourses.length > 0 && (
                <section className="mc-section">
                  <div className="mc-section-header">
                    <div className="mc-section-dot mc-dot-active" />
                    <h2 className="mc-section-title">Continue Learning</h2>
                    <span className="mc-section-count">{activeCourses.length}</span>
                  </div>
                  <div className="mc-grid">
                    {activeCourses.map((course, i) => (
                      <CourseCard
                        key={course._id}
                        course={course}
                        prog={progressData[course._id]}
                        index={i}
                        navigate={navigate}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* ── Completed Section ── */}
              {completedCourses.length > 0 && (
                <section className="mc-section">
                  <div className="mc-section-header">
                    <div className="mc-section-dot mc-dot-done" />
                    <h2 className="mc-section-title">Completed</h2>
                    <span className="mc-section-count mc-count-done">{completedCourses.length}</span>
                  </div>
                  <div className="mc-grid">
                    {completedCourses.map((course, i) => (
                      <CourseCard
                        key={course._id}
                        course={course}
                        prog={progressData[course._id]}
                        index={i}
                        navigate={navigate}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <style>{myCoursesStyles}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const myCoursesStyles = `
  /* Analytics Strip */
  .mc-analytics-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }
  @media (max-width: 900px) {
    .mc-analytics-strip { grid-template-columns: repeat(2, 1fr); }
  }
  .mc-analytics-card {
    background: #fff;
    border: 1px solid #f1f5f9;
    border-radius: 20px;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .mc-analytics-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }
  .mc-analytics-icon { font-size: 26px; flex-shrink: 0; }
  .mc-analytics-val {
    font-size: 22px;
    font-weight: 900;
    color: #0f172a;
    line-height: 1;
    margin: 0 0 3px;
  }
  .mc-analytics-label {
    font-size: 10px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
  }

  /* ── Continue Learning Widget ── */
  .mc-continue-widget {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-radius: 28px;
    padding: 20px 28px;
    margin-bottom: 28px;
    box-shadow: 0 8px 32px rgba(15,23,42,0.2);
    position: relative;
    overflow: hidden;
  }
  .mc-continue-widget::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 140px; height: 140px;
    background: rgba(99,102,241,0.15);
    border-radius: 50%;
    filter: blur(30px);
  }
  .mc-continue-left {
    display: flex;
    align-items: center;
    gap: 18px;
    flex: 1;
    min-width: 0;
    position: relative;
  }
  .mc-continue-thumb {
    width: 72px;
    height: 72px;
    border-radius: 16px;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    border: 2px solid rgba(255,255,255,0.1);
  }
  .mc-continue-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .mc-continue-play {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.4);
    color: white;
    font-size: 18px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .mc-continue-widget:hover .mc-continue-play { opacity: 1; }
  .mc-continue-info { flex: 1; min-width: 0; }
  .mc-continue-eyebrow {
    font-size: 9px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #fbbf24;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .mc-continue-title {
    font-size: 14px;
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin: 0 0 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mc-continue-lesson {
    font-size: 10px;
    color: rgba(255,255,255,0.5);
    margin: 0 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mc-continue-progress-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .mc-continue-bar-bg {
    flex: 1;
    height: 5px;
    background: rgba(255,255,255,0.1);
    border-radius: 999px;
    overflow: hidden;
  }
  .mc-continue-bar-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.8s ease;
  }
  .mc-continue-pct {
    font-size: 11px;
    font-weight: 900;
    flex-shrink: 0;
  }
  .mc-continue-resume-btn {
    padding: 12px 28px;
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    flex-shrink: 0;
  }
  .mc-continue-resume-btn:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  }

  /* ── Controls Row ── */
  .mc-controls {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .mc-search-wrap {
    position: relative;
    flex: 1;
    min-width: 220px;
  }
  .mc-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    pointer-events: none;
  }
  .mc-search-input {
    width: 100%;
    padding: 11px 36px 11px 40px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    font-size: 12px;
    font-weight: 600;
    color: #0f172a;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .mc-search-input::placeholder { color: #94a3b8; }
  .mc-search-input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }
  .mc-search-clear {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 18px;
    color: #94a3b8;
    cursor: pointer;
    line-height: 1;
    padding: 0;
  }
  .mc-sort-wrap { position: relative; }
  .mc-sort-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 11px 18px;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    font-size: 11px;
    font-weight: 800;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }
  .mc-sort-btn:hover { border-color: #6366f1; color: #6366f1; }
  .mc-sort-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.12);
    z-index: 50;
    min-width: 200px;
    overflow: hidden;
  }
  .mc-sort-option {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 18px;
    background: none;
    border: none;
    font-size: 11px;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s;
  }
  .mc-sort-option:hover { background: #f8fafc; }
  .mc-sort-option-active { color: #6366f1; background: #f5f3ff; }

  /* ── Filter Tabs ── */
  .mc-filter-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }
  .mc-filter-tab {
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
  }
  .mc-filter-tab:hover { border-color: #6366f1; color: #6366f1; }
  .mc-filter-tab-active {
    background: #0f172a;
    color: #fff;
    border-color: #0f172a;
    box-shadow: 0 4px 12px rgba(15,23,42,0.2);
  }

  /* ── Sections ── */
  .mc-section { margin-bottom: 40px; }
  .mc-section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  .mc-section-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .mc-dot-active { background: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
  .mc-dot-done { background: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.2); }
  .mc-section-title {
    font-size: 14px;
    font-weight: 900;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0;
  }
  .mc-section-count {
    padding: 3px 10px;
    background: #f1f5f9;
    color: #64748b;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .mc-count-done { background: #d1fae5; color: #047857; }

  /* ── Course Grid ── */
  .mc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  /* ── Course Card ── */
  .mc-course-card {
    background: #fff;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    display: flex;
    flex-direction: column;
    transition: transform 0.25s, box-shadow 0.25s;
    border: 1px solid #f1f5f9;
    /* border-left set inline per type */
  }
  .mc-course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 56px rgba(0,0,0,0.12);
  }

  /* Thumbnail */
  .mc-thumb-wrap {
    position: relative;
    aspect-ratio: 16/9;
    overflow: hidden;
    background: #f8fafc;
  }
  .mc-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  .mc-course-card:hover .mc-thumb { transform: scale(1.07); }
  .mc-badge-overlay {
    position: absolute;
    top: 12px;
    left: 12px;
  }
  .mc-completed-overlay {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    background: rgba(4,120,87,0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6ee7b7;
    font-size: 14px;
    font-weight: 900;
    border: 1px solid rgba(16,185,129,0.5);
    backdrop-filter: blur(8px);
  }

  /* Card body */
  .mc-card-body {
    padding: 20px 22px 22px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
  }
  .mc-domain {
    font-size: 9px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #6366f1;
    display: block;
    margin-bottom: 3px;
  }
  .mc-title {
    font-size: 14px;
    font-weight: 900;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    line-height: 1.3;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .mc-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .mc-avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    color: #fff;
    font-size: 9px;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .mc-meta-text {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
  }

  /* Stats grid */
  .mc-stats-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .mc-stat {
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    background: #f8fafc;
    border-radius: 10px;
    min-width: 70px;
    border: 1px solid #f1f5f9;
  }
  .mc-stat-val {
    font-size: 12px;
    font-weight: 900;
    color: #0f172a;
    line-height: 1.2;
  }
  .mc-stat-label {
    font-size: 9px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 2px;
  }

  /* Progress */
  .mc-progress-section { display: flex; flex-direction: column; gap: 6px; }
  .mc-progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .mc-progress-bar-bg {
    height: 6px;
    background: #f1f5f9;
    border-radius: 999px;
    overflow: hidden;
  }
  .mc-progress-bar-fill {
    height: 100%;
    border-radius: 999px;
  }

  /* Certification Relationship Block */
  .mc-cert-block {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 1px solid #bbf7d0;
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .mc-cert-reason {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .mc-cert-icon { font-size: 16px; flex-shrink: 0; }
  .mc-cert-label {
    font-size: 9px;
    font-weight: 700;
    color: #166534;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 2px;
  }
  .mc-cert-name {
    font-size: 11px;
    font-weight: 900;
    color: #14532d;
    margin: 0;
  }
  .mc-retake-status {
    font-size: 9px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 6px 10px;
    border-radius: 8px;
    text-align: center;
  }
  .mc-retake-locked {
    background: #fef9c3;
    color: #713f12;
    border: 1px solid #fde68a;
  }
  .mc-retake-available {
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #6ee7b7;
  }

  /* Paid course info */
  .mc-paid-info {
    display: flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #eff6ff, #dbeafe);
    border: 1px solid #bfdbfe;
    border-radius: 14px;
    padding: 10px 14px;
  }
  .mc-paid-icon { font-size: 16px; flex-shrink: 0; }
  .mc-paid-label {
    font-size: 10px;
    font-weight: 700;
    color: #1e40af;
    margin: 0 0 2px;
  }
  .mc-paid-amount {
    font-size: 9px;
    font-weight: 600;
    color: #3b82f6;
    margin: 0;
  }

  /* Action button */
  .mc-action-btn {
    margin-top: auto;
    width: 100%;
    padding: 13px;
    border: none;
    border-radius: 14px;
    color: #fff;
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .mc-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.22);
    filter: brightness(1.08);
  }
  .mc-btn-arrow { opacity: 0.7; transition: transform 0.2s; }
  .mc-action-btn:hover .mc-btn-arrow { transform: translateX(3px); opacity: 1; }

  /* No results */
  .mc-no-results {
    text-align: center;
    padding: 48px;
    color: #94a3b8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 600;
  }
  .mc-no-results span { font-size: 36px; }
  .mc-clear-filters-btn {
    margin-top: 8px;
    padding: 10px 20px;
    background: #0f172a;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.2s;
  }
  .mc-clear-filters-btn:hover {
    background: #6366f1;
    transform: scale(1.03);
  }

  /* Empty state */
  .mc-empty-state {
    padding: 72px 40px;
    background: #fff;
    border-radius: 40px;
    border: 2px dashed #e2e8f0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .mc-empty-icon { font-size: 64px; }
  .mc-empty-title {
    font-size: 20px;
    font-weight: 900;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }
  .mc-empty-sub {
    font-size: 13px;
    color: #64748b;
    max-width: 380px;
    margin: 0;
    line-height: 1.6;
  }
  .mc-empty-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 8px;
  }
  .mc-empty-btn {
    padding: 12px 24px;
    border-radius: 14px;
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  .mc-empty-btn-primary {
    background: #0f172a;
    color: #fff;
    box-shadow: 0 4px 14px rgba(15,23,42,0.2);
  }
  .mc-empty-btn-primary:hover { background: #6366f1; transform: translateY(-2px); }
  .mc-empty-btn-secondary {
    background: #f8fafc;
    color: #475569;
    border: 1.5px solid #e2e8f0;
  }
  .mc-empty-btn-secondary:hover { border-color: #6366f1; color: #6366f1; }
`;
