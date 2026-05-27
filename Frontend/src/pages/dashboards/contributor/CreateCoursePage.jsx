import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store/useStore";
import { courseApi, domainApi } from "../../../api/api";
import "../dashboard.css";

export default function CreateCoursePage() {
    const { token } = useStore();
    const navigate = useNavigate();
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        domain: "",
        pricingType: "free",
        price: "",
        thumbnail: null
    });

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const data = await domainApi.getDomains();
                setDomains(data);
                if (data.length > 0) setFormData(prev => ({ ...prev, domain: data[0] }));
            } catch (err) {
                console.error("Failed to load domains", err);
            }
        };
        fetchDomains();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, thumbnail: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("domain", formData.domain);
            data.append("pricingType", formData.pricingType);
            if (formData.pricingType === "paid") data.append("price", formData.price);
            if (formData.thumbnail) data.append("thumbnail", formData.thumbnail);

            const course = await courseApi.create(data, token);
            navigate(`/dashboard/contributor/courses/${course._id}`);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 animate-in slide-in-from-bottom-8 duration-700">
            <header className="mb-12">
                <button
                    onClick={() => navigate("/dashboard/contributor/courses")}
                    className="mb-4 text-[10px] font-black uppercase text-surface-400 hover:text-primary-600 transition-colors tracking-[0.2em]"
                >
                    ← Back to Courses
                </button>
                <h1 className="text-4xl font-black text-surface-900 uppercase tracking-tighter">Create New Course</h1>
                <p className="text-surface-400 font-medium mt-2">STEP 1: BASIC INFORMATION</p>
            </header>

            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-surface-100 shadow-2xl space-y-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2 tracking-widest">Course Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            placeholder="e.g. Advanced ECG Interpretation"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-black text-surface-900 text-xl"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black uppercase text-surface-300 mb-2 tracking-widest">Description</label>
                        <textarea
                            name="description"
                            required
                            placeholder="Describe what students will learn..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold text-surface-600 min-h-[120px] resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-surface-300 mb-2 tracking-widest">Medical Domain</label>
                            <select
                                name="domain"
                                value={formData.domain}
                                onChange={handleChange}
                                className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold text-surface-600 appearance-none"
                            >
                                {domains.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-surface-300 mb-2 tracking-widest">Thumbnail Image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none font-bold text-surface-400 flex items-center gap-3">
                                    <span>🖼️</span> {formData.thumbnail ? formData.thumbnail.name : "Choose Cover Image"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-surface-50 rounded-[2.5rem] border border-surface-100">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-surface-300 mb-2 tracking-widest">Pricing Type</label>
                            <div className="flex gap-4">
                                {["free", "paid"].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, pricingType: type }))}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.pricingType === type
                                                ? "bg-surface-900 text-white shadow-xl"
                                                : "bg-white text-surface-400 border border-surface-100"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {formData.pricingType === "paid" && (
                            <div className="animate-in slide-in-from-left-4 duration-300">
                                <label className="block text-[10px] font-black uppercase text-surface-300 mb-2 tracking-widest">Course Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    placeholder="1999"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-6 py-3 rounded-xl bg-white border border-surface-100 outline-none font-black text-surface-900"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-primary-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary-500/30 hover:bg-primary-700 transition-all transform hover:-translate-y-1 active:translate-y-0"
                    >
                        {loading ? "Initializing..." : "Create Course & Continue →"}
                    </button>
                </div>
            </form>
        </div>
    );
}
