import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import { courseApi } from "../api/api";

export default function TestResultPage() {
  const { token } = useStore();
  const [enrollStatuses, setEnrollStatuses] = useState({}); // { [courseId]: "idle" | "enrolling" | "enrolled" | "already" }
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  const handleEnroll = async (courseId) => {
    setEnrollStatuses(prev => ({ ...prev, [courseId]: "enrolling" }));
    try {
      const res = await courseApi.enroll(courseId, token);
      if (res.alreadyEnrolled) {
        setEnrollStatuses(prev => ({ ...prev, [courseId]: "already" }));
        alert("Already in My Courses");
      } else {
        setEnrollStatuses(prev => ({ ...prev, [courseId]: "enrolled" }));
        alert("Successfully added to My Courses");
      }
    } catch (err) {
      alert(err.message || "Failed to enroll");
      setEnrollStatuses(prev => ({ ...prev, [courseId]: "idle" }));
    }
  };

  console.log('--- TEST RESULT DEBUG ---');
  console.log('Result State:', result);
  console.log('-------------------------');

  if (!result) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-surface-700 mb-2">No result data found</h2>
          <p className="text-surface-500 mb-6">Please complete a test to see your results.</p>
          <button onClick={() => navigate("/certifications")} className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
            Go to Certifications
          </button>
        </div>
      </div>
    );
  }

  const { score, passed, correct, total, certTitle, passingScore, certificate, recommendations } = result;

  if (passed) {
    const verificationId = certificate?.verificationId;
    const certificateUrl = certificate?.certificateUrl;

    return (
      <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-surface-50 to-primary-50/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
          {/* Result Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-accent-50 to-primary-50 border border-accent-200 rounded-3xl p-8 text-center mb-8"
          >
            <div className="text-7xl mb-4">🏆</div>
            <h1 className="text-3xl font-extrabold mb-2 text-accent-700">
              Congratulations!
            </h1>
            <p className="text-surface-600 text-lg mb-6">{certTitle}</p>

            <div className="inline-flex flex-col items-center justify-center w-28 h-28 rounded-full border-4 border-[#10b981] text-[#10b981] mb-4">
              <span className="text-3xl font-extrabold">{score}%</span>
              <span className="text-xs font-medium opacity-70">Score</span>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-surface-600 mb-6">
              <div className="text-center"><p className="text-xl font-bold text-surface-800">{correct}</p><p>Correct</p></div>
              <div className="w-px h-8 bg-surface-300" />
              <div className="text-center"><p className="text-xl font-bold text-surface-800">{total - correct}</p><p>Incorrect</p></div>
              <div className="w-px h-8 bg-surface-300" />
              <div className="text-center"><p className="text-xl font-bold text-surface-800">{passingScore}%</p><p>Passing</p></div>
            </div>

            <div className="bg-white/80 rounded-2xl p-5 border border-accent-200">
              <p className="text-sm font-semibold text-accent-700 mb-4">🎓 Certificate Issued!</p>
              <div className="flex flex-col items-center gap-3">
                {verificationId && (
                  <p className="text-[10px] font-mono bg-accent-50 border border-accent-100 rounded-lg px-3 py-1.5 text-accent-800 uppercase tracking-widest">
                    Verification ID: <strong>{verificationId}</strong>
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 mt-1">
                  {certificateUrl ? (
                    <a
                      href={certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-surface-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg text-center inline-block min-w-[140px]"
                    >
                      ⬇ Download PDF
                    </a>
                  ) : (
                    <p className="text-[9px] text-surface-400 italic">Generating PDF link...</p>
                  )}
                  {verificationId && (
                    <Link
                      to={`/verify/${verificationId}`}
                      target="_blank"
                      className="px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg text-center min-w-[140px]"
                    >
                      🔍 Verify Online
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/certifications")} className="px-6 py-3 rounded-xl border-2 border-surface-200 text-sm font-semibold text-surface-700 hover:bg-surface-50 transition-all">
              ← All Certifications
            </button>
            {verificationId && (
              <Link
                to={`/verify/${verificationId}`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-50 to-accent-600 text-white text-sm font-bold hover:from-accent-600 hover:to-accent-700 transition-all shadow-md text-center"
              >
                View My Certificate Page →
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // FAIL STATE
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-surface-50 to-primary-50/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Fail Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-[2rem] p-10 text-center mb-10 border border-red-100 bg-gradient-to-br from-red-50/50 to-orange-50/30 backdrop-blur-md shadow-xl"
        >
          <div className="text-7xl mb-5">📚</div>
          <h1 className="text-3xl md:text-4xl font-black text-red-700 uppercase tracking-tight mb-2">
            You did not pass this certification.
          </h1>
          <p className="text-surface-500 font-bold uppercase text-xs tracking-widest mb-6">
            Domain: {result.certificationDomain || "Medical Specialty"}
          </p>

          <div className="inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-red-500 bg-white shadow-lg shadow-red-500/10 mb-2">
            <span className="text-4xl font-black text-red-600">{score}%</span>
            <span className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Score</span>
          </div>
        </motion.div>

        {/* Recommended Learning Path Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="border-b border-surface-100 pb-4">
            <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tight">
              Recommended Learning Path
            </h2>
            <p className="text-xs font-bold text-surface-400 uppercase tracking-widest mt-1">
              Study these free resources in {result.certificationDomain || "the specialty domain"} to prepare for a retake.
            </p>
          </div>

          {/* Recommended Free Courses Header */}
          <div className="flex items-center justify-between pt-2">
            <h3 className="text-sm font-black text-surface-700 uppercase tracking-widest">
              Recommended Free Courses
            </h3>
            <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase rounded-full tracking-widest border border-primary-100">
              {recommendations?.length || 0} Courses Available
            </span>
          </div>

          {/* Courses List/Grid or Empty State */}
          {!recommendations || recommendations.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-surface-100 text-center shadow-md">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-surface-600 font-bold text-sm">
                No free learning resources are currently available for this specialty.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((course, i) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="bg-white rounded-3xl border border-surface-100 shadow-sm flex flex-col p-6 hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
                >
                  {/* Course card header/details */}
                  <div className="flex gap-5 mb-5 items-start">
                    {/* Image Showcasing / Thumbnail */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden relative shadow-inner bg-surface-100 border border-surface-100 shrink-0">
                      <img
                        src={course.thumbnail || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={course.title}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400";
                        }}
                      />
                    </div>

                    {/* Course basic info */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[9px] font-black uppercase tracking-widest rounded-full border border-primary-50">
                        {course.domain}
                      </span>
                      <h4 className="text-base font-black text-surface-900 uppercase tracking-tight leading-tight group-hover:text-primary-600 transition-colors line-clamp-2 pt-1">
                        {course.title}
                      </h4>
                      <div className="flex items-center gap-1.5 pt-0.5">
                        <div className="w-4 h-4 rounded-full bg-surface-900 flex items-center justify-center text-white font-black text-[8px]">
                          {course.createdBy?.name?.charAt(0) || "I"}
                        </div>
                        <span className="text-[10px] font-bold text-surface-500">
                          By {course.createdBy?.name || "Dr. CHAMP Faculty"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Course description */}
                  <p className="text-xs text-surface-500 leading-relaxed font-medium mb-6 line-clamp-3 flex-grow">
                    {course.description}
                  </p>

                  {/* Action buttons */}
                  <div className="pt-4 border-t border-surface-50 mt-auto flex flex-col gap-2">
                    <button
                      onClick={() => handleEnroll(course._id)}
                      disabled={enrollStatuses[course._id] === "enrolling" || enrollStatuses[course._id] === "enrolled" || enrollStatuses[course._id] === "already"}
                      className={`w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 text-center flex items-center justify-center gap-2 group/btn ${
                        enrollStatuses[course._id] === "enrolled" || enrollStatuses[course._id] === "already"
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : "bg-primary-600 hover:bg-primary-700 text-white"
                      }`}
                    >
                      {enrollStatuses[course._id] === "enrolling" && "Enrolling..."}
                      {enrollStatuses[course._id] === "enrolled" && "Successfully added to My Courses"}
                      {enrollStatuses[course._id] === "already" && "Already in My Courses"}
                      {(!enrollStatuses[course._id] || enrollStatuses[course._id] === "idle") && "Enroll For Free"}
                    </button>
                    <button
                      onClick={() => navigate(`/courses/${course._id}`)}
                      className="w-full py-2.5 bg-surface-900 hover:bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 text-center flex items-center justify-center gap-2 group/btn"
                    >
                      Open Course <span>➔</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-surface-100">
            <button
              onClick={() => navigate("/dashboard/user?tab=test")}
              className="px-8 py-3 rounded-xl border border-surface-200 text-xs font-black uppercase tracking-widest text-surface-700 hover:bg-surface-50 transition-all shadow-sm"
            >
              ← Back to Certifications
            </button>
            <button
              onClick={() => navigate(-2)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-500/20"
            >
              Retry Test ↻
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
