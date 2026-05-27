import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useStore from "../../../store/useStore";
import { courseApi, moduleApi, lessonApi, domainApi } from "../../../api/api";
import "../dashboard.css";

export default function CourseBuilderPage() {
    const { courseId } = useParams();
    const { token } = useStore();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [lessons, setLessons] = useState({}); // { moduleId: [lessons] }

    const [showModuleModal, setShowModuleModal] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [showEditBasicModal, setShowEditBasicModal] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [moduleForm, setModuleForm] = useState({ title: "", description: "" });
    const [lessonForm, setLessonForm] = useState({ title: "", description: "", notes: "", video: null });
    const [basicInfoForm, setBasicInfoForm] = useState({
        title: "",
        description: "",
        domain: "",
        pricingType: "free",
        price: "",
        thumbnail: null
    });
    const [domains, setDomains] = useState([]);
    const [savingBasicInfo, setSavingBasicInfo] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = async () => {
        try {
            const courseData = await courseApi.getById(courseId, token);
            setCourse(courseData);
            const modulesData = await moduleApi.getByCourse(courseId, token);
            setModules(modulesData);
            
            // Fetch lessons for each module
            const lessonsData = {};
            for (const mod of modulesData) {
                const modLessons = await lessonApi.getByModule(mod._id, token);
                lessonsData[mod._id] = modLessons;
            }
            setLessons(lessonsData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const fetchDomains = async () => {
            try {
                const data = await domainApi.getDomains();
                setDomains(data);
            } catch (err) {
                console.error("Failed to load domains", err);
            }
        };
        fetchDomains();
    }, [courseId]);

    useEffect(() => {
        if (course) {
            setBasicInfoForm({
                title: course.title || "",
                description: course.description || "",
                domain: course.domain || "",
                pricingType: course.pricingType || "free",
                price: course.price || "",
                thumbnail: null
            });
        }
    }, [course]);

    const handleAddModule = async (e) => {
        e.preventDefault();
        try {
            await moduleApi.create({ ...moduleForm, courseId, order: modules.length }, token);
            setModuleForm({ title: "", description: "" });
            setShowModuleModal(false);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleAddLesson = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", lessonForm.title);
            data.append("description", lessonForm.description);
            data.append("notes", lessonForm.notes);
            data.append("moduleId", activeModuleId);
            data.append("order", (lessons[activeModuleId]?.length || 0));
            if (lessonForm.video) data.append("video", lessonForm.video);

            // Note: Cloudinary upload might take time, show progress if possible
            setUploadProgress(10);
            await lessonApi.create(data, token);
            setUploadProgress(100);
            
            setLessonForm({ title: "", description: "", notes: "", video: null });
            setShowLessonModal(false);
            setUploadProgress(0);
            fetchData();
        } catch (err) { alert(err.message); setUploadProgress(0); }
    };

    const handleDeleteLesson = async (lessonId) => {
        if (!window.confirm("Delete this lesson?")) return;
        try {
            await lessonApi.delete(lessonId, token);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleDeleteModule = async (modId) => {
        if (!window.confirm("Delete module and all its lessons?")) return;
        try {
            await moduleApi.delete(modId, token);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handlePublishCourse = async () => {
        if (!window.confirm("Submit this course for admin approval? You can still edit it, but it will need re-approval.")) return;
        setIsSubmitting(true);
        try {
            await courseApi.submitForReview(courseId, token);
            fetchData();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] font-black uppercase text-surface-400 tracking-[0.3em]">Loading Course Architect...</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-700">
            {/* LEFT SIDE: Course Info */}
            <aside className="lg:col-span-4 space-y-6">
                <div className="bg-white p-8 rounded-[3rem] border border-surface-100 shadow-sm sticky top-8">
                    <button 
                        onClick={() => navigate("/dashboard/contributor/courses")}
                        className="mb-6 text-[10px] font-black uppercase text-surface-300 hover:text-primary-600 transition-colors tracking-widest"
                    >
                        ← Back to List
                    </button>
                    
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 shadow-xl">
                        {course?.thumbnail ? (
                            <img src={course.thumbnail} className="w-full h-full object-cover" alt="" />
                        ) : (
                            <div className="w-full h-full bg-surface-50 flex items-center justify-center text-3xl">📚</div>
                        )}
                    </div>

                    <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter mb-4 leading-tight">
                        {course?.title}
                    </h2>
                    
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center py-3 border-b border-surface-50">
                            <span className="text-[9px] font-black uppercase text-surface-300">Domain</span>
                            <span className="text-[10px] font-black uppercase text-primary-600">{course?.domain}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-surface-50">
                            <span className="text-[9px] font-black uppercase text-surface-300">Pricing</span>
                            <span className="text-[10px] font-black uppercase text-surface-600">{course?.pricingType === "paid" ? `$${course?.price}` : "Free"}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-surface-50">
                            <span className="text-[9px] font-black uppercase text-surface-300">Status</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                course?.status === "approved" ? "bg-green-100 text-green-700" : 
                                course?.status === "rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                            }`}>{course?.status}</span>
                        </div>
                    </div>

                    <p className="text-xs text-surface-500 font-medium leading-relaxed italic mb-8">
                        "{course?.description}"
                    </p>

                    <div className="space-y-3">
                        <button 
                            onClick={() => setShowEditBasicModal(true)}
                            className="w-full py-4 bg-white text-surface-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-50 transition-all border border-surface-100"
                        >
                            Edit Basic Info
                        </button>

                        {(course?.status === "draft" || course?.status === "rejected") && (
                            <button 
                                onClick={handlePublishCourse}
                                disabled={isSubmitting}
                                className="w-full py-4 bg-primary-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
                            >
                                {isSubmitting ? "Submitting..." : "🚀 Publish Course"}
                            </button>
                        )}

                        {course?.status === "pending" && (
                            <div className="w-full py-4 bg-amber-50 text-amber-600 rounded-2xl text-[9px] font-black uppercase tracking-widest text-center border border-amber-100 flex items-center justify-center gap-2">
                                <span className="animate-pulse">⏳</span> Under Review
                            </div>
                        )}

                        {course?.status === "approved" && (
                            <div className="w-full py-4 bg-green-50 text-green-600 rounded-2xl text-[9px] font-black uppercase tracking-widest text-center border border-green-100 flex items-center justify-center gap-2">
                                <span>✅</span> Live & Public
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* RIGHT SIDE: Module Management */}
            <main className="lg:col-span-8 space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter">Curriculum Architecture</h3>
                    <button 
                        onClick={() => setShowModuleModal(true)}
                        className="px-6 py-3 bg-surface-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all"
                    >
                        + Add New Module
                    </button>
                </div>

                {modules.length === 0 ? (
                    <div className="p-20 bg-surface-50 rounded-[4rem] border-2 border-dashed border-surface-200 text-center">
                        <p className="text-surface-300 font-black uppercase tracking-widest text-xs">Your curriculum is empty</p>
                        <p className="text-[10px] text-surface-400 font-medium mt-2">Modules group lessons by topic.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {modules.map((mod, idx) => (
                            <div key={mod._id} className="bg-white rounded-[2.5rem] border border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="p-8 bg-surface-50/50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-surface-900 text-white flex items-center justify-center font-black text-sm">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-surface-900 uppercase tracking-tighter">{mod.title}</h4>
                                            <p className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mt-0.5">{mod.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => handleDeleteModule(mod._id)}
                                            className="text-red-400 hover:text-red-600 transition-colors p-2"
                                        >🗑️</button>
                                        <button 
                                            onClick={() => { setActiveModuleId(mod._id); setShowLessonModal(true); }}
                                            className="px-4 py-2 bg-white border border-surface-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-surface-600 hover:bg-surface-100"
                                        >
                                            + Add Lesson
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="p-8 space-y-4">
                                    {lessons[mod._id]?.length === 0 ? (
                                        <p className="text-[10px] text-center text-surface-300 font-black uppercase py-4">No lessons in this module</p>
                                    ) : (
                                        lessons[mod._id]?.map((lesson, lIdx) => (
                                            <div key={lesson._id} className="flex items-center justify-between p-4 bg-white border border-surface-50 rounded-2xl group hover:border-primary-100 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] font-black text-surface-300">#{lIdx + 1}</span>
                                                    <div>
                                                        <h5 className="text-sm font-black text-surface-800 flex items-center gap-2 uppercase tracking-tight">
                                                            {lesson.videoUrl && <span className="text-primary-500">📹</span>}
                                                            {lesson.title}
                                                        </h5>
                                                        <p className="text-[9px] text-surface-400 font-medium">
                                                            {lesson.description || "No description provided."}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        onClick={() => handleDeleteLesson(lesson._id)}
                                                        className="text-[10px] p-2 hover:bg-red-50 rounded-lg text-red-400"
                                                    >✕</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* MODULE MODAL */}
            {showModuleModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">New Module</h3>
                            <button onClick={() => setShowModuleModal(false)} className="text-surface-300 hover:text-black">✕</button>
                        </div>
                        <form onSubmit={handleAddModule} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Module Title</label>
                                <input 
                                    type="text" 
                                    required 
                                    className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold"
                                    value={moduleForm.title}
                                    onChange={e => setModuleForm({...moduleForm, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Short Description</label>
                                <textarea 
                                    className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold h-24 resize-none"
                                    value={moduleForm.description}
                                    onChange={e => setModuleForm({...moduleForm, description: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="w-full py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">
                                Create Module
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* LESSON MODAL */}
            {showLessonModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-[3.5rem] p-10 animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">Compose Lesson</h3>
                                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mt-1">Module ID: {activeModuleId.slice(-6)}</p>
                            </div>
                            <button onClick={() => setShowLessonModal(false)} className="text-surface-300 hover:text-black">✕</button>
                        </div>
                        <form onSubmit={handleAddLesson} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Lesson Title</label>
                                        <input 
                                            type="text" 
                                            required 
                                            className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold"
                                            value={lessonForm.title}
                                            onChange={e => setLessonForm({...lessonForm, title: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Description</label>
                                        <textarea 
                                            className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold h-24 resize-none"
                                            value={lessonForm.description}
                                            onChange={e => setLessonForm({...lessonForm, description: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Video Resource (MP4/WebM)</label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                accept="video/*"
                                                onChange={e => setLessonForm({...lessonForm, video: e.target.files[0]})}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="w-full p-8 border-2 border-dashed border-surface-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-primary-300 transition-colors">
                                                <span className="text-2xl mb-2">📹</span>
                                                <p className="text-[9px] font-black uppercase text-surface-400">
                                                    {lessonForm.video ? lessonForm.video.name : "Select Video File"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Learner Notes (Optional)</label>
                                        <textarea 
                                            className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold h-24 resize-none"
                                            placeholder="Key takeaways or resources..."
                                            value={lessonForm.notes}
                                            onChange={e => setLessonForm({...lessonForm, notes: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {uploadProgress > 0 && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-black uppercase text-primary-600">
                                        <span>Cloudinary Syncing</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-surface-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary-600 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                                    </div>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={uploadProgress > 0}
                                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all ${
                                    uploadProgress > 0 ? "bg-surface-200 text-surface-400 cursor-not-allowed" : "bg-surface-900 text-white hover:bg-black"
                                }`}
                            >
                                {uploadProgress > 0 ? "Uploading Assets..." : "Publish Lesson"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT BASIC INFO MODAL */}
            {showEditBasicModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-[3.5rem] p-10 animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">Edit Basic Info</h3>
                            <button onClick={() => setShowEditBasicModal(false)} className="text-surface-300 hover:text-black">✕</button>
                        </div>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            setSavingBasicInfo(true);
                            try {
                                const data = new FormData();
                                data.append("title", basicInfoForm.title);
                                data.append("description", basicInfoForm.description);
                                data.append("domain", basicInfoForm.domain);
                                data.append("pricingType", basicInfoForm.pricingType);
                                if (basicInfoForm.pricingType === "paid") data.append("price", basicInfoForm.price);
                                if (basicInfoForm.thumbnail) data.append("thumbnail", basicInfoForm.thumbnail);

                                await courseApi.updateBasicInfo(courseId, data, token);
                                setShowEditBasicModal(false);
                                fetchData();
                            } catch (err) {
                                alert(err.message);
                            } finally {
                                setSavingBasicInfo(false);
                            }
                        }} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Course Title</label>
                                        <input 
                                            type="text" 
                                            required 
                                            className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold"
                                            value={basicInfoForm.title}
                                            onChange={e => setBasicInfoForm({...basicInfoForm, title: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Description</label>
                                        <textarea 
                                            className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold h-32 resize-none"
                                            value={basicInfoForm.description}
                                            onChange={e => setBasicInfoForm({...basicInfoForm, description: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Medical Domain</label>
                                        <select 
                                            className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold appearance-none"
                                            value={basicInfoForm.domain}
                                            onChange={e => setBasicInfoForm({...basicInfoForm, domain: e.target.value})}
                                        >
                                            {domains.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Update Thumbnail</label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={e => setBasicInfoForm({...basicInfoForm, thumbnail: e.target.files[0]})}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="w-full p-6 border-2 border-dashed border-surface-200 rounded-2xl flex flex-col items-center justify-center text-center hover:border-primary-300 transition-colors">
                                                <span className="text-xl mb-1">🖼️</span>
                                                <p className="text-[9px] font-black uppercase text-surface-400">
                                                    {basicInfoForm.thumbnail ? basicInfoForm.thumbnail.name : "Select New Cover"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-surface-50 rounded-2xl border border-surface-100">
                                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-3">Pricing Model</label>
                                        <div className="flex gap-3 mb-4">
                                            {["free", "paid"].map(type => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setBasicInfoForm(prev => ({ ...prev, pricingType: type }))}
                                                    className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${basicInfoForm.pricingType === type
                                                            ? "bg-surface-900 text-white shadow-lg"
                                                            : "bg-white text-surface-400 border border-surface-100"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                        {basicInfoForm.pricingType === "paid" && (
                                            <input
                                                type="number"
                                                required
                                                placeholder="Price in ₹"
                                                className="w-full px-4 py-2 rounded-xl bg-white border border-surface-100 outline-none font-black text-surface-900 text-sm"
                                                value={basicInfoForm.price}
                                                onChange={e => setBasicInfoForm({...basicInfoForm, price: e.target.value})}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={savingBasicInfo}
                                className="w-full py-5 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-primary-700 disabled:opacity-50 transition-all"
                            >
                                {savingBasicInfo ? "Saving Changes..." : "Update Basic Information"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
