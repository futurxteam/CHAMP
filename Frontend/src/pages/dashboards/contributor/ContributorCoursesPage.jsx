import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../../store/useStore";
import { courseApi } from "../../../api/api";
import "../dashboard.css";

export default function ContributorCoursesPage() {
    const { token, user } = useStore();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const data = await courseApi.getMyCourses(token);
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "approved": return "bg-green-100 text-green-700";
            case "rejected": return "bg-red-100 text-red-700";
            default: return "bg-amber-100 text-amber-700";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">My Courses</h1>
                    <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mt-1">
                        Structured Learning Management
                    </p>
                </div>
                <Link
                    to="/dashboard/contributor/courses/create"
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-colors"
                >
                    Create New Course
                </Link>
            </div>

            {loading ? (
                <div className="p-20 text-center">
                    <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[10px] font-black text-surface-400 uppercase tracking-[0.2em]">Syncing Courses...</p>
                </div>
            ) : courses.length === 0 ? (
                <div className="p-20 bg-white rounded-[3rem] border-2 border-dashed border-surface-100 text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter">No Courses Yet</h3>
                    <p className="text-sm text-surface-400 font-medium mt-2 mb-8">Start your teaching journey by creating your first structured course.</p>
                    <Link
                        to="/dashboard/contributor/courses/create"
                        className="px-8 py-4 bg-surface-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl"
                    >
                        Begin Creation
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-[2.5rem] border border-surface-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col">
                            <div className="relative h-48 overflow-hidden bg-surface-50">
                                {course.thumbnail ? (
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl">📘</div>
                                )}
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(course.status)}`}>
                                        {course.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-0.5 bg-primary-50 text-primary-600 text-[8px] font-black uppercase rounded tracking-widest">
                                        {course.domain}
                                    </span>
                                    <span className="px-2 py-0.5 bg-surface-100 text-surface-500 text-[8px] font-black uppercase rounded tracking-widest">
                                        {course.pricingType}
                                    </span>
                                </div>
                                <h3 className="text-lg font-black text-surface-900 uppercase tracking-tighter line-clamp-1 mb-2">
                                    {course.title}
                                </h3>
                                <p className="text-xs text-surface-500 font-medium line-clamp-2 mb-6 leading-relaxed">
                                    {course.description}
                                </p>
                                
                                {course.status === "rejected" && course.rejectionReason && (
                                    <div className="mb-6 p-3 bg-red-50 rounded-xl border-l-2 border-red-500">
                                        <p className="text-[9px] font-bold text-red-600 uppercase mb-1">Feedback:</p>
                                        <p className="text-[10px] text-red-500 italic">"{course.rejectionReason}"</p>
                                    </div>
                                )}

                                <div className="mt-auto pt-6 border-t border-surface-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-surface-400 uppercase tracking-widest">
                                        {course.pricingType === "paid" ? `$${course.price}` : "Free"}
                                    </span>
                                    <button
                                        onClick={() => navigate(`/dashboard/contributor/courses/${course._id}`)}
                                        className="px-4 py-2 bg-surface-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary-600 transition-colors"
                                    >
                                        Manage
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
