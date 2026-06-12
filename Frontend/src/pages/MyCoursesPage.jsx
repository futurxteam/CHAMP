import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./dashboards/dashboard.css";
import useStore from "../store/useStore";
import { courseApi } from "../api/api";

export default function MyCoursesPage() {
  const { user, logout, token } = useStore();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchEnrolledCourses = async () => {
    setLoading(true);
    try {
      const data = await courseApi.getEnrolledCourses(token);
      setEnrolled(data);
    } catch (err) {
      console.error("Failed to load enrolled courses:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEnrolledCourses();
    }
  }, [token]);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
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

      {/* Content Area */}
      <main className="dashboard-content">
        <header className="dashboard-header flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">
              My Courses
            </h1>
            <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mt-1">
              Your Personal Learning Library
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-surface-900 flex items-center justify-center text-white font-black text-xl shadow-xl">
            {user?.name?.charAt(0)}
          </div>
        </header>

        <div className="dashboard-body">
          {loading ? (
            <div className="p-20 text-center animate-pulse">
              <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mx-auto mb-6" />
              <p className="text-surface-400 uppercase font-black text-xs tracking-widest">Retrieving enrolled programs...</p>
            </div>
          ) : enrolled.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in duration-500">
              {enrolled.map((course) => (
                <div 
                  key={course._id}
                  className="p-6 bg-white rounded-[3rem] border border-surface-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group flex flex-col"
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  <div className="aspect-video rounded-[2rem] overflow-hidden mb-6 relative shadow-lg">
                    <img 
                      src={course.thumbnail || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={course.title} 
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800";
                      }}
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                      {course.pricingType === "free" ? "FREE COURSE" : "PAID COURSE"}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[9px] font-black text-primary-600 uppercase tracking-widest mb-2">{course.domain}</span>
                    <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter line-clamp-2 leading-none group-hover:text-primary-600 transition-colors mb-4">{course.title}</h3>
                    
                    <div className="space-y-2 mb-6 text-xs text-surface-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-surface-900 flex items-center justify-center text-white font-black text-[8px]">
                          {course.instructor?.charAt(0) || "I"}
                        </div>
                        <span>Instructor: <strong>{course.instructor}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>📅</span>
                        <span>Enrolled: <strong>{new Date(course.enrolledAt).toLocaleDateString()}</strong></span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-surface-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/courses/${course._id}`);
                        }}
                        className="w-full py-3 bg-surface-900 hover:bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 text-center flex items-center justify-center gap-2 group/btn"
                      >
                        Open Course ➔
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-20 bg-surface-50 rounded-[4rem] border-2 border-dashed border-surface-200 text-center">
              <span className="text-6xl mb-6 block">📖</span>
              <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest">You have not enrolled in any courses yet.</h3>
              <p className="text-surface-400 font-medium mt-2">Browse the catalog to find free learning resources and programs.</p>
              <button 
                onClick={() => navigate("/dashboard/user?tab=learning")}
                className="mt-8 px-8 py-3 bg-surface-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-surface-900/20"
              >
                Browse Learning Programs
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
