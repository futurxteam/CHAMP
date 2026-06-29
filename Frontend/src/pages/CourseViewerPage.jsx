import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../store/useStore";
import { courseApi, progressApi } from "../api/api";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function timeAgo(dateStr) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (mins > 0) return `${mins} min ago`;
  return "Just now";
}

function LessonStatusIcon({ status }) {
  if (status === "completed")
    return (
      <div className="cv-status-icon cv-status-completed">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  if (status === "in-progress")
    return (
      <div className="cv-status-icon cv-status-progress">
        <div className="cv-status-progress-dot" />
      </div>
    );
  return <div className="cv-status-icon cv-status-none" />;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CourseViewerPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token } = useStore();

  // Content state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [enrollment, setEnrollment] = useState(null);

  // Progress state
  const [progressMap, setProgressMap] = useState({});
  const [courseProgress, setCourseProgress] = useState(0);
  const [courseCompleted, setCourseCompleted] = useState(false);

  // Player state
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Retake
  const [retakeEligible, setRetakeEligible] = useState(false);
  const [retakeCertificationId, setRetakeCertificationId] = useState(null);
  const [showCompletionBanner, setShowCompletionBanner] = useState(false);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Refs
  const videoRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const containerRef = useRef(null);
  const lastSavedTimeRef = useRef(0);
  const maxWatchedRef = useRef(0); // anti-cheat: track max position reached

  // ─── Load Content & Progress ────────────────────────────────────────────────

  useEffect(() => {
    loadCourseContent();
  }, [courseId]);

  async function loadCourseContent() {
    setLoading(true);
    setError(null);
    try {
      const [contentData, progressData] = await Promise.all([
        courseApi.getCourseContent(courseId, token),
        progressApi.getForCourse(courseId, token).catch(() => ({ progressMap: {}, courseProgress: 0 }))
      ]);

      setCourse(contentData.course);
      setModules(contentData.modules);
      setEnrollment(contentData.enrollment);
      setCourseProgress(progressData.courseProgress || contentData.enrollment.courseProgress || 0);
      setCourseCompleted(!!contentData.enrollment.completedAt);
      setProgressMap(progressData.progressMap || {});

      // Auto-open first module
      const firstModule = contentData.modules[0];
      if (firstModule) {
        setExpandedModules({ [firstModule._id]: true });
      }

      // Determine which lesson to start with
      const lastLessonId = contentData.enrollment.lastLessonId?._id || contentData.enrollment.lastLessonId;
      if (lastLessonId) {
        // Find the lesson in modules
        for (const mod of contentData.modules) {
          const found = mod.lessons.find(l => l._id === lastLessonId || l._id.toString() === lastLessonId?.toString());
          if (found) {
            setActiveLesson(found);
            setActiveModule(mod);
            setExpandedModules(prev => ({ ...prev, [mod._id]: true }));
            break;
          }
        }
      } else if (firstModule?.lessons?.length > 0) {
        setActiveLesson(firstModule.lessons[0]);
        setActiveModule(firstModule);
      }
    } catch (err) {
      if (err.message?.includes("not enrolled")) {
        navigate(`/courses/${courseId}`, { replace: true });
      } else {
        setError(err.message || "Failed to load course");
      }
    } finally {
      setLoading(false);
    }
  }

  // ─── Load Retake Eligibility ─────────────────────────────────────────────────

  useEffect(() => {
    if (courseCompleted) {
      progressApi.checkRetakeEligibility(courseId, token)
        .then(data => {
          setRetakeEligible(data.eligible);
          setRetakeCertificationId(data.certificationId);
        })
        .catch(() => {});
    }
  }, [courseCompleted]);

  // ─── When active lesson changes: load video ──────────────────────────────────

  useEffect(() => {
    if (!activeLesson || !videoRef.current) return;
    const prog = progressMap[activeLesson._id];
    const resumeAt = prog?.lastPosition || 0;
    maxWatchedRef.current = prog?.watchedSeconds || 0;

    // Small delay to let src load
    videoRef.current.src = activeLesson.videoUrl || "";
    videoRef.current.load();
    videoRef.current.playbackRate = playbackRate;
    videoRef.current.volume = volume;

    if (resumeAt > 2) {
      videoRef.current.addEventListener("loadedmetadata", () => {
        if (videoRef.current) videoRef.current.currentTime = resumeAt;
      }, { once: true });
    }
    setVideoCurrentTime(0);
    setVideoDuration(0);
    setIsPlaying(false);
  }, [activeLesson?._id]);

  // ─── Progress Interval: save every 15 seconds ───────────────────────────────

  const saveProgress = useCallback(async () => {
    if (!activeLesson || !videoRef.current) return;
    const vid = videoRef.current;
    const dur = vid.duration || 0;
    const current = vid.currentTime || 0;

    // Anti-cheat: only credit seconds actually played forward (maxWatched)
    const creditable = Math.max(maxWatchedRef.current, current);

    if (creditable === lastSavedTimeRef.current && creditable > 0) return; // no change
    lastSavedTimeRef.current = creditable;

    try {
      const result = await progressApi.update({
        courseId,
        moduleId: activeModule?._id,
        lessonId: activeLesson._id,
        watchedSeconds: Math.floor(creditable),
        videoDuration: Math.floor(dur),
        currentPosition: Math.floor(current)
      }, token);

      if (result.lessonProgress) {
        setProgressMap(prev => ({
          ...prev,
          [activeLesson._id]: result.lessonProgress
        }));
      }
      if (typeof result.lessonProgress?.percentageWatched === "number") {
        const prog = result.lessonProgress;
        if (prog.completed && !progressMap[activeLesson._id]?.completed) {
          // Lesson just completed — refresh full progress
          const freshProgress = await progressApi.getForCourse(courseId, token);
          setCourseProgress(freshProgress.courseProgress || 0);
          setProgressMap(freshProgress.progressMap || {});
          if (freshProgress.courseProgress >= 100) {
            setCourseCompleted(true);
            setShowCompletionBanner(true);
            // Check retake eligibility
            progressApi.checkRetakeEligibility(courseId, token)
              .then(d => { setRetakeEligible(d.eligible); setRetakeCertificationId(d.certificationId); })
              .catch(() => {});
          }
        }
      }
    } catch (err) {
      // Silent fail — will retry next interval
    }
  }, [activeLesson, activeModule, courseId, token, progressMap]);

  useEffect(() => {
    clearInterval(progressIntervalRef.current);
    if (activeLesson) {
      progressIntervalRef.current = setInterval(saveProgress, 15000);
    }
    return () => clearInterval(progressIntervalRef.current);
  }, [activeLesson, saveProgress]);

  // ─── Video Event Handlers ────────────────────────────────────────────────────

  function handleTimeUpdate() {
    const vid = videoRef.current;
    if (!vid) return;
    const cur = vid.currentTime;
    setVideoCurrentTime(cur);
    // Track max position reached (anti-cheat: don't credit skipping ahead)
    if (cur > maxWatchedRef.current) {
      maxWatchedRef.current = cur;
    }
  }

  function handleLoadedMetadata() {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration || 0);
    }
  }

  function handlePlay() { setIsPlaying(true); }
  function handlePause() {
    setIsPlaying(false);
    saveProgress(); // save on pause
  }
  function handleEnded() {
    setIsPlaying(false);
    saveProgress();
  }

  function handleSeek(e) {
    const vid = videoRef.current;
    if (!vid || !videoDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    const newTime = ratio * videoDuration;
    vid.currentTime = newTime;
    setVideoCurrentTime(newTime);
    // Don't increase maxWatched on seek-forward (anti-cheat)
  }

  function togglePlay() {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) vid.play();
    else vid.pause();
  }

  function setSpeed(rate) {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setShowSpeedMenu(false);
  }

  function handleVolumeChange(e) {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (videoRef.current) videoRef.current.volume = v;
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!document.fullscreenElement) {
      el?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  // ─── Lesson Selection ────────────────────────────────────────────────────────

  function selectLesson(lesson, mod) {
    if (activeLesson?._id === lesson._id) return;
    saveProgress(); // save before switching
    setActiveLesson(lesson);
    setActiveModule(mod);
    maxWatchedRef.current = progressMap[lesson._id]?.watchedSeconds || 0;
    lastSavedTimeRef.current = 0;
  }

  function toggleModule(modId) {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  }

  // ─── Lesson Status Helpers ───────────────────────────────────────────────────

  function getLessonStatus(lessonId) {
    const p = progressMap[lessonId];
    if (!p) return "not-started";
    if (p.completed) return "completed";
    if (p.watchedSeconds > 0) return "in-progress";
    return "not-started";
  }

  function getModuleStatus(mod) {
    if (!mod.lessons.length) return "not-started";
    const allDone = mod.lessons.every(l => progressMap[l._id]?.completed);
    if (allDone) return "completed";
    const anyStarted = mod.lessons.some(l => progressMap[l._id]?.watchedSeconds > 0);
    if (anyStarted) return "in-progress";
    return "not-started";
  }

  // ─── Next Lesson ─────────────────────────────────────────────────────────────

  function goToNextLesson() {
    if (!activeLesson || !activeModule) return;
    const modIdx = modules.findIndex(m => m._id === activeModule._id);
    const lessonIdx = activeModule.lessons.findIndex(l => l._id === activeLesson._id);
    if (lessonIdx < activeModule.lessons.length - 1) {
      selectLesson(activeModule.lessons[lessonIdx + 1], activeModule);
    } else if (modIdx < modules.length - 1) {
      const nextMod = modules[modIdx + 1];
      if (nextMod.lessons.length > 0) {
        setExpandedModules(prev => ({ ...prev, [nextMod._id]: true }));
        selectLesson(nextMod.lessons[0], nextMod);
      }
    }
  }

  function hasNextLesson() {
    if (!activeLesson || !activeModule) return false;
    const modIdx = modules.findIndex(m => m._id === activeModule._id);
    const lessonIdx = activeModule.lessons.findIndex(l => l._id === activeLesson._id);
    return lessonIdx < activeModule.lessons.length - 1 || modIdx < modules.length - 1;
  }

  // ─── Computed totals ─────────────────────────────────────────────────────────

  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
  const completedLessons = Object.values(progressMap).filter(p => p.completed).length;
  const watchedSeconds = Object.values(progressMap).reduce((a, p) => a + (p.watchedSeconds || 0), 0);
  const hoursWatched = (watchedSeconds / 3600).toFixed(1);

  // ─── Progress bar width ───────────────────────────────────────────────────────
  const progressBarWidth = videoDuration > 0 ? (videoCurrentTime / videoDuration) * 100 : 0;

  // ─── Loading / Error states ───────────────────────────────────────────────────

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f13", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
        <div style={{ width: 56, height: 56, border: "3px solid #2d2d3a", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: "#6b7280", fontFamily: "Inter, sans-serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>Loading Course…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f13", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <span style={{ fontSize: 48 }}>⚠️</span>
        <p style={{ color: "#f87171", fontFamily: "Inter, sans-serif", fontWeight: 700 }}>{error}</p>
        <button onClick={() => navigate("/my-courses")} style={{ padding: "10px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>← My Courses</button>
      </div>
    );
  }

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="cv-root">
      <style>{courseViewerStyles}</style>

      {/* ── Top Bar ── */}
      <header className="cv-topbar">
        <div className="cv-topbar-left">
          <button className="cv-icon-btn" onClick={() => navigate("/my-courses")} title="Back to My Courses">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={18} height={18}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="cv-icon-btn cv-sidebar-toggle" onClick={() => setSidebarOpen(v => !v)} title="Toggle Sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} width={18} height={18}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="cv-topbar-title">
            <span className="cv-domain-badge">{course?.domain}</span>
            <h1 className="cv-course-title">{course?.title}</h1>
          </div>
        </div>

        <div className="cv-topbar-right">
          {/* Overall Progress */}
          <div className="cv-progress-chip">
            <div className="cv-progress-ring-small">
              <svg viewBox="0 0 36 36" width={36} height={36}>
                <circle cx={18} cy={18} r={14} fill="none" stroke="#1e1e2e" strokeWidth={4} />
                <circle
                  cx={18} cy={18} r={14} fill="none"
                  stroke={courseProgress >= 100 ? "#10b981" : "#6366f1"}
                  strokeWidth={4}
                  strokeDasharray={`${(courseProgress / 100) * 88} 88`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                  style={{ transition: "stroke-dasharray 0.5s ease" }}
                />
              </svg>
              <span className="cv-progress-ring-label">{courseProgress}%</span>
            </div>
            <div>
              <p className="cv-progress-chip-title">{courseProgress >= 100 ? "Completed! 🎉" : "Course Progress"}</p>
              <p className="cv-progress-chip-sub">{completedLessons}/{totalLessons} lessons</p>
            </div>
          </div>

          {enrollment?.enrollmentType === "free" ? (
            <span className="cv-tag cv-tag-free">FREE REMEDIATION</span>
          ) : (
            <span className="cv-tag cv-tag-paid">PAID COURSE</span>
          )}

          <span className="cv-instructor">👤 {course?.instructor}</span>
        </div>
      </header>

      {/* ── Completion Banner ── */}
      <AnimatePresence>
        {showCompletionBanner && (
          <motion.div
            className="cv-completion-banner"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
          >
            <span>🎉</span>
            <div>
              <p className="cv-completion-banner-title">Course Completed!</p>
              <p className="cv-completion-banner-sub">You've finished all lessons in this course.</p>
            </div>
            {retakeEligible && retakeCertificationId && (
              <button
                className="cv-retake-btn"
                onClick={() => navigate(`/test/${retakeCertificationId}`)}
              >
                Retake Certification →
              </button>
            )}
            <button className="cv-icon-btn" onClick={() => setShowCompletionBanner(false)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Body: Sidebar + Main ── */}
      <div className="cv-body">

        {/* ── Sidebar ── */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              className="cv-sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="cv-sidebar-inner">
                <div className="cv-sidebar-header">
                  <p className="cv-sidebar-header-label">Course Content</p>
                  <p className="cv-sidebar-header-sub">{modules.length} modules · {totalLessons} lessons</p>
                </div>

                <div className="cv-modules-list">
                  {modules.map((mod, modIdx) => {
                    const modStatus = getModuleStatus(mod);
                    const isExpanded = !!expandedModules[mod._id];

                    return (
                      <div key={mod._id} className="cv-module">
                        <button
                          className={`cv-module-header ${modStatus === "completed" ? "cv-module-completed" : ""}`}
                          onClick={() => toggleModule(mod._id)}
                        >
                          <div className="cv-module-header-left">
                            <div className={`cv-module-number ${modStatus === "completed" ? "cv-module-number-done" : ""}`}>
                              {modStatus === "completed" ? "✓" : modIdx + 1}
                            </div>
                            <div>
                              <p className="cv-module-title">{mod.title}</p>
                              <p className="cv-module-sub">
                                {mod.lessons.filter(l => progressMap[l._id]?.completed).length}/{mod.lessons.length} completed
                              </p>
                            </div>
                          </div>
                          <svg
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                            width={14} height={14}
                            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0, color: "#6b7280" }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="cv-lessons-list">
                                {mod.lessons.map((lesson, lIdx) => {
                                  const status = getLessonStatus(lesson._id);
                                  const isActive = activeLesson?._id === lesson._id;
                                  const prog = progressMap[lesson._id];

                                  return (
                                    <button
                                      key={lesson._id}
                                      className={`cv-lesson-item ${isActive ? "cv-lesson-active" : ""} ${status === "completed" ? "cv-lesson-completed" : ""}`}
                                      onClick={() => selectLesson(lesson, mod)}
                                    >
                                      <div className="cv-lesson-left">
                                        <LessonStatusIcon status={status} />
                                        <div>
                                          <p className="cv-lesson-title">
                                            {lIdx + 1}. {lesson.title}
                                          </p>
                                          {prog && prog.watchedSeconds > 0 && (
                                            <p className="cv-lesson-sub">
                                              {Math.round(prog.percentageWatched)}% watched
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      {isActive && (
                                        <div className="cv-lesson-playing-dot" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Analytics strip in sidebar */}
                <div className="cv-sidebar-analytics">
                  <div className="cv-analytics-item">
                    <span className="cv-analytics-val">{completedLessons}</span>
                    <span className="cv-analytics-label">Lessons Done</span>
                  </div>
                  <div className="cv-analytics-divider" />
                  <div className="cv-analytics-item">
                    <span className="cv-analytics-val">{hoursWatched}h</span>
                    <span className="cv-analytics-label">Watched</span>
                  </div>
                  <div className="cv-analytics-divider" />
                  <div className="cv-analytics-item">
                    <span className="cv-analytics-val">{courseProgress}%</span>
                    <span className="cv-analytics-label">Progress</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* ── Main Content ── */}
        <main className="cv-main">
          {!activeLesson ? (
            <div className="cv-no-lesson">
              <span style={{ fontSize: 64 }}>📖</span>
              <p className="cv-no-lesson-title">Select a lesson to begin</p>
              <p className="cv-no-lesson-sub">Choose from the sidebar on the left</p>
            </div>
          ) : (
            <>
              {/* Video Player */}
              <div className="cv-video-wrapper" ref={containerRef}>
                {activeLesson.videoUrl ? (
                  <div className="cv-video-container" onClick={togglePlay} style={{ maxHeight: isFullscreen ? 'none' : undefined }}>
                    <video
                      ref={videoRef}
                      className="cv-video"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onPlay={handlePlay}
                      onPause={handlePause}
                      onEnded={handleEnded}
                      playsInline
                    />

                    {/* Play/Pause overlay */}
                    <AnimatePresence>
                      {!isPlaying && (
                        <motion.div
                          className="cv-play-overlay"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          onClick={togglePlay}
                        >
                          <div className="cv-play-btn-big">
                            <svg viewBox="0 0 24 24" fill="currentColor" width={32} height={32}>
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Completion overlay when lesson done */}
                    {progressMap[activeLesson._id]?.completed && (
                      <div className="cv-completed-chip">
                        ✓ Lesson Completed
                      </div>
                    )}

                    {/* Video Controls Bar */}
                    <div className="cv-controls" onClick={e => e.stopPropagation()}>
                      {/* Seek bar */}
                      <div className="cv-seekbar-wrap" onClick={handleSeek}>
                        <div className="cv-seekbar-bg">
                          {/* Watched indicator (max reached) */}
                          <div
                            className="cv-seekbar-watched"
                            style={{ width: `${videoDuration > 0 ? (maxWatchedRef.current / videoDuration) * 100 : 0}%` }}
                          />
                          {/* Current position */}
                          <div
                            className="cv-seekbar-current"
                            style={{ width: `${progressBarWidth}%` }}
                          />
                        </div>
                        <div
                          className="cv-seekbar-thumb"
                          style={{ left: `${progressBarWidth}%` }}
                        />
                      </div>

                      {/* Controls row */}
                      <div className="cv-controls-row">
                        <div className="cv-controls-left">
                          <button className="cv-ctrl-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
                            {isPlaying ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>

                          <span className="cv-time-display">
                            {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
                          </span>

                          {/* Volume */}
                          <div className="cv-volume-wrap" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                            <button className="cv-ctrl-btn" title="Volume">
                              {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
                            </button>
                            <AnimatePresence>
                              {showVolumeSlider && (
                                <motion.div
                                  className="cv-volume-slider-wrap"
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 6 }}
                                >
                                  <input
                                    type="range" min={0} max={1} step={0.05}
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="cv-volume-range"
                                    onClick={e => e.stopPropagation()}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="cv-controls-right">
                          {/* Playback Speed */}
                          <div className="cv-speed-wrap">
                            <button className="cv-ctrl-btn cv-speed-btn" onClick={e => { e.stopPropagation(); setShowSpeedMenu(v => !v); }}>
                              {playbackRate}×
                            </button>
                            <AnimatePresence>
                              {showSpeedMenu && (
                                <motion.div
                                  className="cv-speed-menu"
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 8 }}
                                  onClick={e => e.stopPropagation()}
                                >
                                  {[0.5, 1, 1.25, 1.5, 2].map(r => (
                                    <button
                                      key={r}
                                      className={`cv-speed-item ${playbackRate === r ? "cv-speed-active" : ""}`}
                                      onClick={() => setSpeed(r)}
                                    >
                                      {r}×
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Fullscreen */}
                          <button className="cv-ctrl-btn" onClick={toggleFullscreen} title="Fullscreen">
                            {isFullscreen ? (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l-4-4m0 0h4m-4 0v4M15 9l4-4m0 0h-4m4 0v4M9 15l-4 4m0 0h4m-4 0v-4M15 15l4 4m0 0h-4m4 0v-4" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="cv-no-video">
                    <span style={{ fontSize: 48 }}>📄</span>
                    <p style={{ color: "#9ca3af", fontWeight: 700 }}>No video for this lesson</p>
                  </div>
                )}
              </div>

              {/* ── Lesson Info (hidden in fullscreen) ── */}
              {!isFullscreen && (
                <div className="cv-lesson-info">
                  <div className="cv-lesson-info-header">
                    <div>
                      <div className="cv-lesson-breadcrumb">
                        <span>{activeModule?.title}</span>
                        <span>›</span>
                        <span>Lesson {activeModule?.lessons?.findIndex(l => l._id === activeLesson._id) + 1}</span>
                      </div>
                      <h2 className="cv-lesson-info-title">{activeLesson.title}</h2>
                      {activeLesson.description && (
                        <p className="cv-lesson-info-desc">{activeLesson.description}</p>
                      )}
                    </div>

                    <div className="cv-lesson-info-badges">
                      {progressMap[activeLesson._id]?.completed ? (
                        <span className="cv-badge cv-badge-done">✓ Completed</span>
                      ) : progressMap[activeLesson._id]?.watchedSeconds > 0 ? (
                        <span className="cv-badge cv-badge-progress">
                          {Math.round(progressMap[activeLesson._id]?.percentageWatched || 0)}% watched — need 70%
                        </span>
                      ) : (
                        <span className="cv-badge cv-badge-none">Not Started</span>
                      )}
                    </div>
                  </div>

                  {/* Watch Progress Mini Bar */}
                  {progressMap[activeLesson._id] && (
                    <div className="cv-watch-progress">
                      <div className="cv-watch-progress-header">
                        <span>Watch Progress</span>
                        <span className={progressMap[activeLesson._id]?.completed ? "cv-watch-pct-done" : "cv-watch-pct"}>
                          {Math.round(progressMap[activeLesson._id]?.percentageWatched || 0)}% — {progressMap[activeLesson._id]?.completed ? "Complete ✓" : "Need 70% to complete"}
                        </span>
                      </div>
                      <div className="cv-watch-bar-bg">
                        <div
                          className={`cv-watch-bar-fill ${progressMap[activeLesson._id]?.completed ? "cv-watch-bar-done" : ""}`}
                          style={{ width: `${Math.min(progressMap[activeLesson._id]?.percentageWatched || 0, 100)}%` }}
                        />
                        {/* 70% threshold marker */}
                        <div className="cv-watch-bar-marker" style={{ left: "70%" }} title="70% threshold" />
                      </div>
                    </div>
                  )}

                  {/* Notes / Resources */}
                  {activeLesson.notes && (
                    <div className="cv-lesson-notes">
                      <h3 className="cv-notes-title">📋 Lesson Notes</h3>
                      <div className="cv-notes-content">{activeLesson.notes}</div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="cv-lesson-nav">
                    {hasNextLesson() && (
                      <button className="cv-next-btn" onClick={goToNextLesson}>
                        Next Lesson →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ── Course Completion Card (hidden in fullscreen) ── */}
              {!isFullscreen && courseCompleted && (
                <motion.div
                  className="cv-completion-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="cv-completion-card-icon">🎓</div>
                  <div>
                    <h3 className="cv-completion-card-title">Course Completed!</h3>
                    <p className="cv-completion-card-sub">You've successfully completed all lessons. Excellent work!</p>
                  </div>
                  {retakeEligible && retakeCertificationId ? (
                    <button
                      className="cv-retake-btn"
                      onClick={() => navigate(`/test/${retakeCertificationId}`)}
                    >
                      🏆 Retake Certification
                    </button>
                  ) : enrollment?.linkedCertificationAttempt ? (
                    <span className="cv-completion-info">Keep studying to unlock retake</span>
                  ) : null}
                </motion.div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const courseViewerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  .cv-root {
    min-height: 100vh;
    background: #0c0c12;
    color: #e2e8f0;
    font-family: 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ── Top Bar ── */
  .cv-topbar {
    height: 58px;
    background: #12121c;
    border-bottom: 1px solid #1e1e30;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    gap: 16px;
    flex-shrink: 0;
    z-index: 50;
    position: relative;
  }
  .cv-topbar-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }
  .cv-topbar-title {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .cv-domain-badge {
    flex-shrink: 0;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    background: #1e1b4b;
    color: #a5b4fc;
    border: 1px solid #312e81;
    padding: 3px 10px;
    border-radius: 999px;
  }
  .cv-course-title {
    font-size: 13px;
    font-weight: 800;
    color: #f1f5f9;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 340px;
    margin: 0;
  }
  .cv-topbar-right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  /* Progress chip */
  .cv-progress-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #1a1a28;
    border: 1px solid #2d2d44;
    border-radius: 12px;
    padding: 6px 14px 6px 8px;
  }
  .cv-progress-ring-small {
    position: relative;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cv-progress-ring-label {
    position: absolute;
    font-size: 8px;
    font-weight: 800;
    color: #c7d2fe;
    line-height: 1;
  }
  .cv-progress-chip-title {
    font-size: 11px;
    font-weight: 700;
    color: #e2e8f0;
    margin: 0;
    white-space: nowrap;
  }
  .cv-progress-chip-sub {
    font-size: 10px;
    color: #6b7280;
    margin: 0;
    white-space: nowrap;
  }

  .cv-tag {
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 10px;
    border-radius: 999px;
    white-space: nowrap;
  }
  .cv-tag-free {
    background: #064e3b;
    color: #6ee7b7;
    border: 1px solid #065f46;
  }
  .cv-tag-paid {
    background: #1e3a5f;
    color: #93c5fd;
    border: 1px solid #1e40af;
  }
  .cv-instructor {
    font-size: 11px;
    color: #6b7280;
    font-weight: 600;
    white-space: nowrap;
  }

  /* Icon button */
  .cv-icon-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: transparent;
    border: 1px solid #2d2d44;
    color: #9ca3af;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .cv-icon-btn:hover {
    background: #1e1e30;
    color: #e2e8f0;
    border-color: #4b4b6e;
  }

  /* ── Completion Banner ── */
  .cv-completion-banner {
    background: linear-gradient(135deg, #064e3b, #065f46);
    border-bottom: 1px solid #059669;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 13px;
    z-index: 40;
    flex-shrink: 0;
  }
  .cv-completion-banner span:first-child {
    font-size: 24px;
    flex-shrink: 0;
  }
  .cv-completion-banner-title {
    font-weight: 800;
    color: #6ee7b7;
    margin: 0;
    font-size: 13px;
  }
  .cv-completion-banner-sub {
    font-size: 11px;
    color: #a7f3d0;
    margin: 0;
  }

  .cv-retake-btn {
    margin-left: auto;
    padding: 8px 20px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cv-retake-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
  }

  /* ── Body ── */
  .cv-body {
    display: flex;
    flex: 1;
    overflow: hidden;
    height: calc(100vh - 58px);
  }

  /* ── Sidebar ── */
  .cv-sidebar {
    background: #12121c;
    border-right: 1px solid #1e1e30;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }
  .cv-sidebar-inner {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .cv-sidebar-header {
    padding: 16px 16px 12px;
    border-bottom: 1px solid #1e1e30;
    flex-shrink: 0;
  }
  .cv-sidebar-header-label {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #6366f1;
    margin: 0 0 2px;
  }
  .cv-sidebar-header-sub {
    font-size: 11px;
    color: #4b5563;
    margin: 0;
    font-weight: 500;
  }

  .cv-modules-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
    scrollbar-width: thin;
    scrollbar-color: #2d2d44 transparent;
  }
  .cv-modules-list::-webkit-scrollbar { width: 4px; }
  .cv-modules-list::-webkit-scrollbar-thumb { background: #2d2d44; border-radius: 4px; }

  /* Module */
  .cv-module { border-bottom: 1px solid #1a1a28; }
  .cv-module-header {
    width: 100%;
    background: transparent;
    border: none;
    padding: 12px 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    transition: background 0.15s;
    text-align: left;
  }
  .cv-module-header:hover { background: #1a1a28; }
  .cv-module-header.cv-module-completed { background: #0a2e1e; }
  .cv-module-header-left {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    min-width: 0;
  }
  .cv-module-number {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: #1e1e2e;
    border: 1px solid #2d2d44;
    color: #9ca3af;
    font-size: 10px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .cv-module-number-done {
    background: #064e3b;
    border-color: #059669;
    color: #6ee7b7;
  }
  .cv-module-title {
    font-size: 12px;
    font-weight: 700;
    color: #e2e8f0;
    margin: 0 0 2px;
    line-height: 1.3;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .cv-module-sub {
    font-size: 10px;
    color: #4b5563;
    margin: 0;
    font-weight: 500;
  }

  /* Lessons */
  .cv-lessons-list { padding: 4px 0 8px; }
  .cv-lesson-item {
    width: 100%;
    background: transparent;
    border: none;
    padding: 9px 14px 9px 44px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    transition: background 0.12s;
    text-align: left;
  }
  .cv-lesson-item:hover { background: #1a1a28; }
  .cv-lesson-item.cv-lesson-active {
    background: #1e1b4b;
    border-right: 3px solid #6366f1;
  }
  .cv-lesson-item.cv-lesson-completed .cv-lesson-title { color: #6ee7b7; }
  .cv-lesson-left {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    min-width: 0;
  }
  .cv-lesson-title {
    font-size: 11.5px;
    font-weight: 600;
    color: #d1d5db;
    margin: 0 0 2px;
    line-height: 1.4;
  }
  .cv-lesson-sub {
    font-size: 10px;
    color: #6366f1;
    margin: 0;
    font-weight: 600;
  }
  .cv-lesson-playing-dot {
    width: 6px;
    height: 6px;
    background: #6366f1;
    border-radius: 50%;
    flex-shrink: 0;
    animation: pulse-dot 1.5s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.7); }
  }

  /* Status icons */
  .cv-status-icon {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .cv-status-completed {
    background: #064e3b;
    border: 1.5px solid #10b981;
    color: #10b981;
  }
  .cv-status-completed svg { width: 9px; height: 9px; }
  .cv-status-progress {
    background: #1e1b4b;
    border: 1.5px solid #6366f1;
  }
  .cv-status-progress-dot {
    width: 6px;
    height: 6px;
    background: #6366f1;
    border-radius: 50%;
  }
  .cv-status-none {
    background: transparent;
    border: 1.5px solid #374151;
  }

  /* Analytics strip */
  .cv-sidebar-analytics {
    padding: 12px 16px;
    border-top: 1px solid #1e1e30;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0f0f1a;
    flex-shrink: 0;
  }
  .cv-analytics-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .cv-analytics-val {
    font-size: 14px;
    font-weight: 800;
    color: #c7d2fe;
  }
  .cv-analytics-label {
    font-size: 9px;
    color: #4b5563;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .cv-analytics-divider {
    width: 1px;
    height: 28px;
    background: #1e1e30;
  }

  /* ── Main ── */
  .cv-main {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
    scrollbar-color: #2d2d44 transparent;
  }
  .cv-main::-webkit-scrollbar { width: 6px; }
  .cv-main::-webkit-scrollbar-thumb { background: #2d2d44; border-radius: 4px; }

  .cv-no-lesson {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    color: #4b5563;
  }
  .cv-no-lesson-title {
    font-size: 20px;
    font-weight: 800;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
  }
  .cv-no-lesson-sub {
    font-size: 13px;
    color: #374151;
    margin: 0;
  }

  /* ── Video ── */
  .cv-video-wrapper {
    background: #000;
    flex-shrink: 0;
    position: relative;
  }
  .cv-video-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    max-height: 65vh;
    background: #000;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cv-video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .cv-no-video {
    aspect-ratio: 16/9;
    max-height: 65vh;
    background: #0a0a14;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border-bottom: 1px solid #1e1e30;
  }

  /* Play overlay */
  .cv-play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.3);
    pointer-events: none;
  }
  .cv-play-btn-big {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.5);
  }

  /* Completed chip */
  .cv-completed-chip {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(6, 78, 59, 0.9);
    border: 1px solid #059669;
    color: #6ee7b7;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 5px 12px;
    border-radius: 999px;
    backdrop-filter: blur(8px);
    pointer-events: none;
  }

  /* Controls */
  .cv-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
    padding: 40px 16px 12px;
    pointer-events: none;
  }
  .cv-controls > * { pointer-events: auto; }

  /* Seekbar */
  .cv-seekbar-wrap {
    position: relative;
    height: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;
  }
  .cv-seekbar-bg {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.15);
    border-radius: 4px;
    position: relative;
    overflow: visible;
  }
  .cv-seekbar-watched {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    background: rgba(99, 102, 241, 0.35);
    border-radius: 4px;
    transition: width 0.5s;
  }
  .cv-seekbar-current {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    background: #6366f1;
    border-radius: 4px;
  }
  .cv-seekbar-thumb {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(99, 102, 241, 0.8);
    pointer-events: none;
    margin-top: -6px;
  }

  .cv-controls-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cv-controls-left, .cv-controls-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cv-ctrl-btn {
    background: transparent;
    border: none;
    color: #e2e8f0;
    cursor: pointer;
    padding: 4px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s, background 0.15s;
    font-size: 16px;
    line-height: 1;
  }
  .cv-ctrl-btn:hover { color: #fff; background: rgba(255,255,255,0.1); }

  .cv-time-display {
    font-size: 12px;
    color: #d1d5db;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    font-family: monospace;
  }

  /* Volume */
  .cv-volume-wrap { position: relative; }
  .cv-volume-slider-wrap {
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    background: #1e1e30;
    border: 1px solid #2d2d44;
    border-radius: 10px;
    padding: 12px 8px;
    z-index: 10;
  }
  .cv-volume-range {
    -webkit-appearance: none;
    appearance: none;
    writing-mode: vertical-lr;
    direction: rtl;
    width: 4px;
    height: 80px;
    background: #374151;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }
  .cv-volume-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #6366f1;
    cursor: pointer;
  }

  /* Speed */
  .cv-speed-wrap { position: relative; }
  .cv-speed-btn {
    font-size: 11px !important;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: #c7d2fe !important;
    background: #1e1b4b !important;
    border: 1px solid #312e81 !important;
    border-radius: 6px !important;
    padding: 3px 8px !important;
    height: auto !important;
    min-width: 36px;
  }
  .cv-speed-menu {
    position: absolute;
    bottom: 36px;
    right: 0;
    background: #1a1a28;
    border: 1px solid #2d2d44;
    border-radius: 10px;
    overflow: hidden;
    z-index: 20;
    min-width: 70px;
  }
  .cv-speed-item {
    width: 100%;
    background: transparent;
    border: none;
    color: #9ca3af;
    font-size: 12px;
    font-weight: 700;
    padding: 8px 14px;
    cursor: pointer;
    text-align: left;
    transition: background 0.12s;
  }
  .cv-speed-item:hover { background: #1e1e30; color: #e2e8f0; }
  .cv-speed-item.cv-speed-active { color: #6366f1; background: #1e1b4b; }

  /* ── Lesson Info ── */
  .cv-lesson-info {
    padding: 28px 32px;
    border-bottom: 1px solid #1e1e30;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #0f0f1a;
  }
  .cv-lesson-info-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
  .cv-lesson-breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #4b5563;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 6px;
  }
  .cv-lesson-info-title {
    font-size: 20px;
    font-weight: 900;
    color: #f1f5f9;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin: 0 0 6px;
    line-height: 1.2;
  }
  .cv-lesson-info-desc {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
    max-width: 700px;
  }
  .cv-lesson-info-badges {
    flex-shrink: 0;
  }

  /* Badges */
  .cv-badge {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }
  .cv-badge-done { background: #064e3b; color: #6ee7b7; border: 1px solid #059669; }
  .cv-badge-progress { background: #1e1b4b; color: #a5b4fc; border: 1px solid #4338ca; }
  .cv-badge-none { background: #1f2937; color: #6b7280; border: 1px solid #374151; }

  /* Watch progress */
  .cv-watch-progress { display: flex; flex-direction: column; gap: 6px; }
  .cv-watch-progress-header {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .cv-watch-pct { color: #6366f1; }
  .cv-watch-pct-done { color: #10b981; }
  .cv-watch-bar-bg {
    height: 6px;
    background: #1e1e30;
    border-radius: 6px;
    position: relative;
    overflow: visible;
  }
  .cv-watch-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    border-radius: 6px;
    transition: width 0.6s ease;
  }
  .cv-watch-bar-done {
    background: linear-gradient(90deg, #059669, #10b981) !important;
  }
  .cv-watch-bar-marker {
    position: absolute;
    top: -3px;
    bottom: -3px;
    width: 2px;
    background: #f59e0b;
    border-radius: 2px;
    transform: translateX(-50%);
  }
  /* 70% label removed intentionally */

  /* Notes */
  .cv-lesson-notes {
    background: #0c0c18;
    border: 1px solid #1e1e30;
    border-radius: 14px;
    padding: 18px 20px;
  }
  .cv-notes-title {
    font-size: 12px;
    font-weight: 800;
    color: #a5b4fc;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 10px;
  }
  .cv-notes-content {
    font-size: 13px;
    color: #9ca3af;
    line-height: 1.7;
    white-space: pre-wrap;
  }

  /* Lesson nav */
  .cv-lesson-nav { display: flex; justify-content: flex-end; }
  .cv-next-btn {
    padding: 10px 24px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
  }
  .cv-next-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.45);
  }

  /* Completion card */
  .cv-completion-card {
    margin: 24px 32px 32px;
    background: linear-gradient(135deg, #0a2e1e, #064e3b);
    border: 1px solid #059669;
    border-radius: 20px;
    padding: 24px 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .cv-completion-card-icon { font-size: 40px; flex-shrink: 0; }
  .cv-completion-card-title {
    font-size: 18px;
    font-weight: 900;
    color: #6ee7b7;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin: 0 0 4px;
  }
  .cv-completion-card-sub {
    font-size: 12px;
    color: #a7f3d0;
    margin: 0;
  }
  .cv-completion-info {
    font-size: 11px;
    color: #a7f3d0;
    font-weight: 600;
  }
`;
