import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import { courseApi, moduleApi } from "../api/api";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const { token } = useStore();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const courseData = await courseApi.getById(courseId, token);
        setCourse(courseData);

        const modulesData = await moduleApi.getByCourse(courseId, token);
        setModules(modulesData);
      } catch (err) {
        console.error("Error loading course details:", err);
        setError(err.message || "Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && token) {
      fetchDetails();
    }
  }, [courseId, token]);

  if (loading) {
    return (
      <div className="min-height-screen bg-[#f8fafc] flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-6" />
        <p className="text-surface-400 font-black uppercase text-xs tracking-widest">
          Loading Course Preview...
        </p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-height-screen bg-[#f8fafc] py-20 px-4">
        <div className="max-w-xl mx-auto p-12 bg-white rounded-[3rem] border border-surface-100 text-center shadow-xl">
          <span className="text-6xl mb-6 block">⚠️</span>
          <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter mb-4">
            {error || "Course Not Found"}
          </h3>
          <p className="text-surface-500 font-medium mb-8">
            The course you are trying to view is unavailable or does not exist.
          </p>
          <Link
            to="/dashboard/user?tab=learning"
            className="px-8 py-3 bg-surface-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all inline-block shadow-lg"
          >
            ← Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate("/dashboard/user?tab=learning")}
          className="mb-8 px-6 py-2 bg-white text-surface-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-900 hover:text-white transition-all shadow-sm border border-surface-100"
        >
          ← Back to Catalog
        </button>

        {/* Course Card / Detail Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details & Module Preview */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Main Header / Info */}
            <div className="p-10 bg-white rounded-[3rem] border border-surface-100 shadow-xl space-y-6">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="px-4 py-1.5 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {course.domain}
                </span>
                <span className="px-4 py-1.5 bg-accent-50 text-accent-600 text-[10px] font-black uppercase tracking-widest rounded-full italic">
                  Premium Curriculum
                </span>
              </div>

              <h1 className="text-4xl font-black text-surface-900 uppercase tracking-tighter leading-none">
                {course.title}
              </h1>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-surface-900 flex items-center justify-center text-white font-black text-sm shadow-md">
                  {course.createdBy?.name?.charAt(0) || "I"}
                </div>
                <div>
                  <p className="text-[8px] font-black text-surface-300 uppercase tracking-widest">
                    Instructor
                  </p>
                  <p className="text-xs font-bold text-surface-700">
                    {course.createdBy?.name || "Dr. CHAMP Faculty"}
                  </p>
                </div>
              </div>

              <div className="border-t border-surface-50 pt-6">
                <h4 className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-4">
                  About This Course
                </h4>
                <p className="text-sm text-surface-600 leading-relaxed font-medium whitespace-pre-line">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Modules Outline (Privacy Preserved: strictly only titles) */}
            <div className="p-10 bg-white rounded-[3rem] border border-surface-100 shadow-xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-50">
                <div>
                  <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter">
                    Curriculum Overview
                  </h3>
                  <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest italic mt-1">
                    Modules preview (Syllabus structure only)
                  </p>
                </div>
                <span className="px-4 py-2 bg-surface-50 text-surface-400 text-[10px] font-black uppercase rounded-full tracking-widest border border-surface-100">
                  {modules.length} Modules
                </span>
              </div>

              {modules.length > 0 ? (
                <div className="space-y-4">
                  {modules.map((mod, idx) => (
                    <div
                      key={mod._id}
                      className="p-6 bg-surface-50 rounded-2xl border border-surface-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-md"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-black text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-surface-900 uppercase tracking-tight">
                          {mod.title}
                        </h4>
                        {mod.description && (
                          <p className="text-xs text-surface-500 font-medium leading-relaxed">
                            {mod.description}
                          </p>
                        )}
                        <div className="pt-2 flex items-center gap-1.5 text-[9px] font-black text-surface-300 uppercase tracking-widest italic">
                          <span>🔒 Lessons restricted until purchase</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 bg-surface-50 rounded-2xl border border-dashed border-surface-200 text-center">
                  <span className="text-3xl mb-3 block">📖</span>
                  <p className="text-surface-400 font-bold uppercase text-[10px] tracking-widest">
                    No curriculum preview modules uploaded yet
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Checkout Pricing & Sticky Widget */}
          <div className="lg:col-span-4">
            <div className="p-8 bg-surface-900 rounded-[3rem] text-white border border-surface-800 sticky top-8 shadow-2xl space-y-8 overflow-hidden relative">
              {/* Background glows */}
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-primary-600/20 rounded-full blur-3xl" />
              <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-accent-500/15 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-6">
                
                {/* Image Showcase */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden relative shadow-inner bg-surface-800 border border-white/10">
                  <img
                    src={course.thumbnail || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800"}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="space-y-2 text-center py-4">
                  <span className="text-[10px] font-black text-accent-400 uppercase tracking-[0.2em]">
                    Total Investment
                  </span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-black tracking-tight">
                      ₹{course.price?.toLocaleString()}
                    </span>
                    <span className="text-xs text-white/50 font-bold uppercase">
                      INR
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-white/80 font-medium">
                    <span>⚡</span> Instant access to syllabus dashboard
                  </div>
                  <div className="flex items-center gap-2 text-white/80 font-medium">
                    <span>🎓</span> Learn on your own schedule (Self-Paced)
                  </div>
                  <div className="flex items-center gap-2 text-white/80 font-medium">
                    <span>🏆</span> Platform enrollment eligibility
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/checkout/${course._id}`)}
                  className="w-full py-4 bg-white hover:bg-accent-400 hover:text-surface-900 text-surface-900 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Enroll Now
                </button>

                <p className="text-[9px] text-white/40 text-center uppercase tracking-widest font-bold pt-2">
                  🔒 256-Bit Secure Purchase Portal
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
