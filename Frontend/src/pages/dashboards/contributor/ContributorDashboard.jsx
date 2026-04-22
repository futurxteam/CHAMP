import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../dashboard.css";
import useStore from "../../../store/useStore";
import { contentApi, eventApi } from "../../../api/api";
import VideoPlayer from "../../../components/VideoPlayer";

export default function ContributorDashboard() {
  const { user, logout, token } = useStore();
  const [activeTab, setActiveTab ] = useState("teaching");
  const [myContent, setMyContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  // Events Logic
  const [events, setEvents] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);

  const fetchEvents = async () => {
     setEventLoading(true);
     try {
        const data = await eventApi.getEvents(token);
        setEvents(data);
     } catch (err) { console.error(err); }
     finally { setEventLoading(false); }
  };

  const handleRegisterEvent = async (id) => {
     try {
        const res = await eventApi.register(id, token);
        alert(res.message);
        fetchEvents();
     } catch (err) { alert(err.message); }
  };

  const checkActive = (array) => {
     if (!array || !user) return false;
     const targetId = user.id || user._id;
     return array.some(id => id.toString() === targetId.toString());
  };

  const renderContent = (contentStr) => {
     try {
        const blocks = JSON.parse(contentStr);
        if (!Array.isArray(blocks)) return <p className="text-sm">{contentStr}</p>;
        
        return (
           <div className="space-y-6">
              {blocks.map((block, i) => (
                 <div key={i}>
                    {block.type === "heading" && <h4 className="text-lg font-black text-surface-900 uppercase border-l-4 border-primary-600 pl-4">{block.text}</h4>}
                    {block.type === "paragraph" && <p className="text-sm text-surface-600 leading-relaxed font-medium mt-2">{block.text}</p>}
                 </div>
              ))}
           </div>
        );
     } catch {
        return <p className="text-sm">{contentStr}</p>;
     }
  };

  const [formData, setFormData] = useState({
     title: "",
     type: "article",
     sections: [{ type: "heading", text: "" }],
     thumbnail: null,
     video: null
  });

  const fetchMyContent = async () => {
     setLoading(true);
     try {
        const data = await contentApi.getMyContent(token);
        setMyContent(data);
     } catch (err) { console.error(err); }
     finally { setLoading(false); }
  };

  const handleEdit = (item) => {
     setEditingId(item._id);
     try {
        const sections = JSON.parse(item.content);
        setFormData({
           title: item.title,
           type: item.type,
           sections: Array.isArray(sections) ? sections : [{ type: "heading", text: item.content }],
           thumbnail: null,
           video: null
        });
        setShowForm(true);
        setActiveTab("content");
     } catch (e) {
        setFormData({
           title: item.title,
           type: item.type,
           sections: [{ type: "paragraph", text: item.content }],
           thumbnail: null,
           video: null
        });
        setShowForm(true);
     }
  };

  const addSection = (type) => {
     setFormData({...formData, sections: [...formData.sections, { type, text: "" }]});
  };

  const updateSection = (index, text) => {
     const news = [...formData.sections];
     news[index].text = text;
     setFormData({...formData, sections: news});
  };

  const removeSection = (index) => {
     setFormData({...formData, sections: formData.sections.filter((_, i) => i !== index)});
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
     setIsSubmitting(true);
     try {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("type", formData.type);
        data.append("content", JSON.stringify(formData.sections));
        if (formData.thumbnail) data.append("thumbnail", formData.thumbnail);
        if (formData.video) data.append("video", formData.video);
        
        const description = formData.sections.find(s => s.type === "paragraph")?.text.slice(0, 100);
        if (description) data.append("description", description);

        if (editingId) {
           await contentApi.updateContent(editingId, data, token);
        } else {
           await contentApi.createContent(data, token);
        }

        setShowForm(false);
        setEditingId(null);
        setFormData({ title: "", type: "article", sections: [{ type: "heading", text: "" }], thumbnail: null, video: null });
        fetchMyContent();
     } catch (err) { alert(err.message); }
     finally { setIsSubmitting(false); }
  };

  React.useEffect(() => {
     if (activeTab === "content") fetchMyContent();
     if (activeTab === "events") fetchEvents();
  }, [activeTab]);

  const roleLabel = user?.role === "L3" ? "Senior Contributor (L3)" : "Contributor (L2)";

  const menuItems = [
    { id: "profile", label: "My Profile", icon: "👤" },
    { id: "content", label: "Manage Content", icon: "📄" },
    { id: "certs", label: "My Certifications", icon: "🏆" },
    { id: "learning", label: "My Learning & Programs", icon: "📖" },
    { id: "test", label: "Test Dashboard", icon: "🧪" },
    { id: "discussions", label: "Community Discussions", icon: "💬" },
    { id: "events", label: "Events & Registrations", icon: "📅" },
    { id: "teaching", label: "Contributions & Teaching Activity", icon: "🎓" },
  ];

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
            <button
              key={item.id}
              onClick={() => {
                 setActiveTab(item.id);
                 setExpandedItem(null);
                 setShowForm(false);
                 setEditingId(null);
              }}
              className={`sidebar-nav-item w-full text-left ${activeTab === item.id ? "active" : ""}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
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
                 {menuItems.find(i => i.id === activeTab)?.label}
              </h1>
              <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mt-1">
                 Contributor Hub • {user?.name}
              </p>
           </div>
           <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-accent-100 text-accent-700 text-[10px] font-black uppercase rounded-full tracking-widest">{roleLabel}</span>
              <div className="w-12 h-12 rounded-full bg-surface-900 flex items-center justify-center text-white font-black text-xl shadow-xl">
                 {user?.name?.charAt(0)}
              </div>
           </div>
        </header>

        <div className="dashboard-body">
           {activeTab === "profile" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-8 bg-white rounded-3xl border border-surface-100 shadow-sm">
                    <h3 className="text-sm font-black text-surface-400 uppercase tracking-widest mb-6">Contributor Profile</h3>
                    <div className="space-y-4">
                       <div><label className="text-[10px] font-black uppercase text-surface-300">Name</label><p className="font-bold text-surface-900">{user?.name}</p></div>
                       <div><label className="text-[10px] font-black uppercase text-surface-300">Email</label><p className="font-bold text-surface-900">{user?.email}</p></div>
                       <div><label className="text-[10px] font-black uppercase text-surface-300">Access Level</label><p className="font-bold text-accent-600 uppercase text-xs">{roleLabel}</p></div>
                       {user?.expertise?.length > 0 && (
                         <div>
                           <label className="text-[10px] font-black uppercase text-surface-300">Expertise</label>
                           <p className="font-bold text-surface-900">{user.expertise.join(", ")}</p>
                         </div>
                       )}
                       {user?.expertiseLevel && (
                         <div>
                           <label className="text-[10px] font-black uppercase text-surface-300">Expertise Level</label>
                           <p className="font-bold text-surface-900">{user.expertiseLevel}</p>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
           )}

           {activeTab === "content" && (
              <div className="space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter">Your Publications</h3>
                    <button 
                       onClick={() => setShowForm(!showForm)}
                       className="px-6 py-3 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-500/20"
                    >
                       {showForm ? "Cancel Submission" : "Add New Content"}
                    </button>
                 </div>

                 {showForm && (
                    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-[3rem] border border-surface-100 shadow-2xl">
                       <div className="space-y-6">
                          <div className="flex justify-between items-center">
                             <h3 className="text-sm font-black text-primary-600 uppercase tracking-widest">
                                {editingId ? "Edit Submission" : "New Article Submission"}
                             </h3>
                             {editingId && <span className="text-[10px] font-bold text-surface-400">ID: {editingId}</span>}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Content Type</label>
                                <select 
                                   value={formData.type}
                                   onChange={(e) => setFormData({...formData, type: e.target.value})}
                                   className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-bold text-surface-600"
                                >
                                   <option value="article">Article / Guide</option>
                                   <option value="video">Resource Video / Lesson</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Cover Thumbnail (Image)</label>
                                <div className="relative">
                                   <input 
                                      type="file" 
                                      accept="image/*"
                                      onChange={(e) => setFormData({...formData, thumbnail: e.target.files[0]})}
                                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                   />
                                   <div className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none font-bold text-surface-400 flex items-center gap-3">
                                      <span>🖼️</span> {formData.thumbnail ? formData.thumbnail.name : "Choose Cover Image"}
                                   </div>
                                </div>
                             </div>
                          </div>

                          {formData.type === "video" && (
                             <div className="p-8 bg-primary-50 rounded-3xl border border-primary-100">
                                <label className="block text-[10px] font-black uppercase text-primary-600 mb-3">Upload Video Resource</label>
                                <div className="relative">
                                   <input 
                                      type="file" 
                                      accept="video/*"
                                      onChange={(e) => setFormData({...formData, video: e.target.files[0]})}
                                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                   />
                                   <div className="w-full px-8 py-10 rounded-[2rem] bg-white border-2 border-dashed border-primary-200 flex flex-col items-center justify-center text-center">
                                      <div className="text-3xl mb-2">📹</div>
                                      <p className="text-xs font-black text-primary-900 uppercase">{formData.video ? formData.video.name : "Drop Video Here or Click to Browse"}</p>
                                      <p className="text-[10px] text-primary-400 font-medium mt-1 uppercase">Max 100MB • MP4 / WebM</p>
                                   </div>
                                </div>
                             </div>
                          )}

                          <div>
                             <label className="block text-[10px] font-black uppercase text-surface-300 mb-2">Main Heading (Title)</label>
                             <input 
                                type="text" 
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                className="w-full px-6 py-4 rounded-2xl bg-surface-50 border-none outline-none font-black text-surface-900 text-xl"
                                placeholder="Enter Article Title"
                             />
                          </div>

                          <div className="space-y-4">
                             <label className="block text-[10px] font-black uppercase text-surface-300">Article Blocks</label>
                             {formData.sections.map((section, idx) => (
                                <div key={idx} className="relative group">
                                   {section.type === "heading" && (
                                      <input 
                                         type="text" 
                                         placeholder="Sub-heading..." 
                                         className="w-full px-4 py-2 bg-white border-l-4 border-primary-500 font-bold text-surface-900 outline-none"
                                         value={section.text}
                                         onChange={(e) => updateSection(idx, e.target.value)}
                                      />
                                   )}
                                   {section.type === "paragraph" && (
                                      <textarea 
                                         placeholder="Detailed paragraph..." 
                                         className="w-full px-4 py-3 bg-white border-l-4 border-surface-200 text-surface-600 outline-none min-h-[100px]"
                                         value={section.text}
                                         onChange={(e) => updateSection(idx, e.target.value)}
                                      />
                                   )}
                                   <button 
                                      type="button" 
                                      onClick={() => removeSection(idx)}
                                      className="absolute -right-2 -top-2 w-6 h-6 bg-red-100 text-red-500 rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                                   >✕</button>
                                </div>
                             ))}
                          </div>

                          <div className="flex gap-4 p-4 bg-surface-50 rounded-2xl">
                             <button type="button" onClick={() => addSection("heading")} className="flex-1 py-3 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-surface-100">+ Sub-heading</button>
                             <button type="button" onClick={() => addSection("paragraph")} className="flex-1 py-3 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest border border-surface-100">+ Paragraph</button>
                          </div>

                          <div className="flex gap-4">
                             <button 
                                type="button" 
                                disabled={isSubmitting}
                                onClick={() => { setShowForm(false); setEditingId(null); setFormData({ title: "", type: "article", sections: [{ type: "heading", text: "" }] }); }}
                                className="px-8 py-5 border-2 border-surface-100 text-surface-400 rounded-[2rem] font-black uppercase tracking-widest text-[10px]"
                             >
                                Discard
                             </button>
                             <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="flex-1 py-5 bg-surface-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] relative overflow-hidden"
                             >
                                {isSubmitting ? (
                                   <div className="flex items-center justify-center gap-2">
                                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                      Syncing Resources...
                                   </div>
                                ) : (
                                   editingId ? "Update & Re-Submit" : "Submit for Peer Review"
                                )}
                             </button>
                          </div>
                       </div>
                    </form>
                 )}

                 <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                       <div className="p-20 text-center animate-pulse"><p className="text-surface-400 uppercase font-black">Syncing repository...</p></div>
                    ) : myContent.length === 0 ? (
                       <div className="p-20 bg-surface-50 rounded-[3rem] border border-dashed border-surface-200 text-center">
                          <p className="text-surface-300 font-black uppercase">Your repository is empty</p>
                       </div>
                    ) : (
                       myContent.map((c) => (
                          <div 
                             key={c._id} 
                             className="p-8 bg-white rounded-[3rem] border border-surface-100 flex flex-col group hover:shadow-2xl transition-all overflow-hidden"
                          >
                             <div className="flex items-center gap-6">
                                {c.thumbnail && (
                                   <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                                      <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                   </div>
                                ) || (
                                   <div className="w-24 h-24 rounded-2xl bg-surface-50 flex items-center justify-center text-2xl flex-shrink-0">
                                      {c.type === "video" ? "🎬" : "📄"}
                                   </div>
                                )}

                                <div className="flex-1">
                                   <div className="flex items-center justify-between">
                                      <div>
                                         <h4 className="text-lg font-black text-surface-900 uppercase tracking-tighter">
                                            {c.type === "video" && <span className="mr-2">📹</span>}
                                            {c.title}
                                         </h4>
                                         <div className="flex gap-3 mt-2">
                                            <span className="px-2 py-0.5 bg-surface-100 text-surface-500 text-[9px] font-black uppercase rounded">{c.type}</span>
                                            <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                                               c.status === "published" ? "bg-green-50 text-green-600" : 
                                               c.status === "rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                                            }`}>
                                               {c.status === "rejected" ? "Action Required" : c.status}
                                            </span>
                                         </div>
                                      </div>
                                      <div className="flex items-center gap-4">
                                         <button 
                                            onClick={() => handleEdit(c)}
                                            className="px-4 py-2 bg-surface-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-600 transition-colors"
                                         >
                                            Edit
                                         </button>
                                         <button 
                                            onClick={() => setExpandedItem(expandedItem === c._id ? null : c._id)}
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${expandedItem === c._id ? "bg-primary-600 text-white rotate-180" : "bg-surface-50 text-surface-400 hover:bg-surface-100"}`}
                                         >
                                            ➔
                                         </button>
                                      </div>
                                   </div>
                                </div>
                             </div>

                             {expandedItem === c._id && (
                                <div className="mt-8 pt-8 border-t border-surface-50 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                   {c.type === "video" && c.videoUrl && (
                                      <div className="space-y-3">
                                         <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Video Resource Preview</p>
                                         <VideoPlayer url={c.videoUrl} poster={c.thumbnail} />
                                      </div>
                                   )}
                                   
                                   <div className="space-y-3">
                                      <p className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Full Article Content</p>
                                      {renderContent(c.content)}
                                   </div>

                                   {c.status === "rejected" && c.rejectionReason && (
                                      <div className="p-6 bg-red-50 rounded-3xl border-l-4 border-red-500">
                                         <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Administrative Feedback</p>
                                         <p className="text-xs text-red-500 font-medium leading-relaxed italic">"{c.rejectionReason}"</p>
                                      </div>
                                   )}
                                </div>
                             )}
                          </div>
                       ))
                    )}
                 </div>
              </div>
           )}

           {activeTab === "certs" && (
              <div className="p-12 bg-white rounded-[3rem] border border-surface-100 text-center">
                 <div className="text-4xl mb-4">📜</div>
                 <h3 className="text-xl font-black text-surface-900 uppercase">Expert Credentials</h3>
                 <p className="text-surface-500 mt-2 font-medium">Your teaching certificates and peer recognition badges will appear here.</p>
              </div>
           )}

           {activeTab === "learning" && (
              <div className="p-12 bg-surface-50 rounded-[3rem] text-center italic text-surface-400 font-bold uppercase text-xs tracking-widest">
                No active learning programs for contributor accounts yet.
              </div>
           )}

           {activeTab === "test" && (
              <div className="p-8 bg-surface-100 rounded-[2.5rem]">
                 <h3 className="text-2xl font-black uppercase mb-4 text-surface-900">Platform Standards Test</h3>
                 <p className="text-surface-500 font-medium mb-8">Maintain your verified status by reviewing institutional guidelines and passing the annual standards check.</p>
                 <button className="px-8 py-4 bg-surface-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Run Assessment</button>
              </div>
           )}

           {activeTab === "discussions" && (
              <div className="p-12 text-center italic text-surface-400 font-black uppercase tracking-widest text-[10px]">
                 Community interaction protocols active. Join specialized contributor circles.
              </div>
           )}

            {activeTab === "events" && (
               <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <div className="flex items-center justify-between mb-8">
                     <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">Upcoming Platform Events</h2>
                     <span className="px-4 py-2 bg-accent-50 text-accent-700 text-[10px] font-black uppercase rounded-full tracking-widest">{events.length} Active Sessions</span>
                  </div>

                  {eventLoading ? (
                     <div className="flex justify-center p-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
                     </div>
                  ) : events.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {events.map(event => (
                           <div key={event._id} className="bg-white rounded-[3rem] border border-surface-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row">
                              <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden">
                                 <img 
                                    src={event.thumbnail || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format"} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    alt="" 
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-accent-600 px-2 py-1 rounded">
                                       {new Date(event.date).toLocaleDateString()}
                                    </span>
                                 </div>
                              </div>
                              <div className="flex-1 p-8 flex flex-col justify-between">
                                 <div>
                                    <div className="flex justify-between items-start mb-2">
                                       <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter leading-none">{event.title}</h3>
                                       <span className="text-[10px] font-black text-surface-300 uppercase italic whitespace-nowrap">{event.time}</span>
                                    </div>
                                    <p className="text-sm text-surface-500 line-clamp-2 mb-6 font-medium leading-relaxed">{event.description}</p>
                                    
                                    <div className="flex flex-wrap gap-4 mb-6">
                                       <div className="flex items-center gap-2 text-[10px] font-black text-surface-400 uppercase tracking-widest">
                                          <span>📍</span> {event.location}
                                       </div>
                                       <div className="flex items-center gap-2 text-[10px] font-black text-surface-400 uppercase tracking-widest">
                                          <span>👥</span> {event.registrations?.length || 0} / {event.maxOccupants} Joined
                                       </div>
                                    </div>
                                 </div>

                                 <div className="pt-6 border-t border-surface-50 flex items-center justify-between">
                                    <div className="text-[9px] font-black text-red-400 uppercase tracking-widest italic">
                                       Deadline: {new Date(event.registrationTimeline).toLocaleDateString()}
                                    </div>
                                    {checkActive(event.registrations) ? (
                                       <button disabled className="px-6 py-2 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full border border-green-100">
                                          ✓ Registered
                                       </button>
                                    ) : (
                                       <button 
                                          onClick={() => handleRegisterEvent(event._id)}
                                          className="px-6 py-2 bg-surface-900 text-white text-[10px] font-black uppercase rounded-full hover:bg-accent-600 transition-all shadow-lg"
                                       >
                                          Join Event
                                       </button>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <div className="p-20 bg-surface-50 rounded-[4rem] border-2 border-dashed border-surface-200 text-center">
                        <span className="text-6xl mb-6 block">📅</span>
                        <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest">No Facilitated Events</h3>
                        <p className="text-surface-400 font-medium mt-2">There are currently no sessions scheduled.</p>
                     </div>
                  )}
               </div>
            )}

           {activeTab === "teaching" && (
              <div className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { l: "Teaching Sessions", v: "12" },
                      { l: "Total Reach", v: "1,240" },
                      { l: "Session Feedback", v: "4.9/5" },
                      { l: "Pending Proposals", v: "1" }
                    ].map((s, i) => (
                      <div key={i} className="p-8 bg-white rounded-3xl border border-surface-100">
                         <h4 className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-2">{s.l}</h4>
                         <p className="text-2xl font-black text-surface-900">{s.v}</p>
                      </div>
                    ))}
                 </div>
                 <div className="bg-white p-12 rounded-[4rem] border border-surface-100 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                       <h3 className="text-2xl font-black text-surface-900 uppercase tracking-tighter mb-4">Expert Contributions</h3>
                       <p className="text-surface-500 font-medium mb-10 max-w-xl">Continue sharing your unique insights with the community. As an L2/L3 contributor you can publish articles, videos, and courses.</p>
                       <div className="flex gap-4">
                          <button 
                             onClick={() => { setActiveTab("content"); setShowForm(true); }}
                             className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px]"
                          >
                             Contribute Knowledge
                          </button>
                          <button 
                             onClick={() => setActiveTab("content")}
                             className="px-8 py-4 border-2 border-surface-900 text-surface-900 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                          >
                             View My Resources
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           )}
        </div>
      </main>
    </div>
  );
}
