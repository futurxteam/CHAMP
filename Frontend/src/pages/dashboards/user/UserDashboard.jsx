// Sanity check
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import "../dashboard.css";
import useStore from "../../../store/useStore";
import { contentApi, threadApi, commentApi, eventApi, testApi, domainApi, courseApi } from "../../../api/api";
import VideoPlayer from "../../../components/VideoPlayer";
import DiscussionSection from "../../../components/DiscussionSection";

export default function UserDashboard() {
  const { user, logout, token } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "discover");
  
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);
  const [publishedContent, setPublishedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewContent, setViewContent] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [certLoading, setCertLoading] = useState(false);
  const [availableCerts, setAvailableCerts] = useState([]);
  const [availableCertsLoading, setAvailableCertsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);
  const navigate = useNavigate();

  // Filters state
  const [filters, setFilters] = useState({
      search: "",
      domain: "",
      type: ""
   });

  const [catalogFilters, setCatalogFilters] = useState({
      search: "",
      domain: "",
      maxPrice: ""
   });

   const [domains, setDomains] = useState([]);

   const fetchDomains = async () => {
      try {
         const data = await domainApi.getDomains();
         setDomains(data);
      } catch (err) {
         console.error("Failed to load domains:", err.message);
      }
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
     } catch { return <p className="text-sm">{contentStr}</p>; }
  };

  const menuItems = [
    { id: "discover", label: "Discover Content", icon: "🌐" },
    { id: "my-courses", label: "My Courses", icon: "📚", link: "/my-courses" },
    { id: "saved", label: "Saved Resources", icon: "🔖" },
    { id: "profile", label: "My Profile", icon: "👤" },
    { id: "certs", label: "My Certifications", icon: "🏆" },
    { id: "learning", label: "My Learning & Programs", icon: "📖" },
    { id: "test", label: "Test Dashboard", icon: "🧪" },
    { id: "discussions", label: "Community Discussions", icon: "💬" },
    { id: "events", label: "Events & Registrations", icon: "📅" },
  ];

  const savedContent = publishedContent.filter(c => 
     c.saves?.some(id => id && user?.id && id.toString() === user.id.toString())
  );

  const fetchPublished = async () => {
     setLoading(true);
     try {
        const data = await contentApi.getPublishedContent(token, filters);
        setPublishedContent(data);
     } catch (err) { console.error(err); }
     finally { setLoading(false); }
  };

  const fetchCertificates = async () => {
    setCertLoading(true);
    try {
      const data = await testApi.getMyCertificates(token);
      setCertificates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCertLoading(false);
    }
  };

  const fetchAvailableCerts = async () => {
    setAvailableCertsLoading(true);
    try {
      const data = await testApi.getCertifications(token);
      setAvailableCerts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAvailableCertsLoading(false);
    }
  };

  const fetchCourses = async () => {
    setCourseLoading(true);
    try {
      const data = await courseApi.getCatalog(token, catalogFilters);
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCourseLoading(false);
    }
  };

  const handleToggleLike = async (id) => {
     try {
        const res = await contentApi.toggleLike(id, token);
        const myId = user.id || user._id;
        const update = (c) => c._id === id ? { 
           ...c, 
           likes: res.isLiked ? [...c.likes, myId] : c.likes.filter(uid => (uid._id || uid).toString() !== myId.toString()) 
        } : c;
        
        setPublishedContent(publishedContent.map(update));
        if (viewContent && viewContent._id === id) {
           setViewContent(update(viewContent));
        }
     } catch (err) { alert(err.message); }
  };

  const handleToggleSave = async (id) => {
     try {
        const res = await contentApi.toggleSave(id, token);
        const myId = user.id || user._id;
        const update = (c) => c._id === id ? { 
           ...c, 
           saves: res.saved ? [...c.saves, myId] : c.saves.filter(uid => (uid._id || uid).toString() !== myId.toString()) 
        } : c;

        setPublishedContent(publishedContent.map(update));
        if (viewContent && viewContent._id === id) {
           setViewContent(update(viewContent));
        }
     } catch (err) { alert(err.message); }
  };

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
         fetchEvents(); // Refresh
      } catch (err) { alert(err.message); }
   };

   useEffect(() => {
      fetchDomains();
   }, []);

   useEffect(() => {
      if (activeTab === "discover" || activeTab === "saved") fetchPublished();
      if (activeTab === "events") fetchEvents();
      if (activeTab === "certs") fetchCertificates();
      if (activeTab === "test") fetchAvailableCerts();
      if (activeTab === "learning") fetchCourses();
   }, [activeTab, filters.domain, filters.type, catalogFilters.domain, catalogFilters.maxPrice, token]);

   const checkActive = (array) => {
      if (!array || !user) return false;
      const myId = user.id || user._id;
      if (!myId) return false;
      return array.some(id => {
         if (!id) return false;
         const compareId = id._id || id;
         return compareId.toString() === myId.toString();
      });
   };

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
            item.link ? (
              <Link
                key={item.id}
                to={item.link}
                className={`sidebar-nav-item w-full text-left ${activeTab === item.id ? "active" : ""}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                onClick={() => {
                   setActiveTab(item.id);
                   setViewContent(null);
                }}
                className={`sidebar-nav-item w-full text-left ${activeTab === item.id ? "active" : ""}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            )
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
                 Welcome back, {user?.name}
              </p>
           </div>
           <div className="w-12 h-12 rounded-full bg-surface-900 flex items-center justify-center text-white font-black text-xl shadow-xl">
              {user?.name?.charAt(0)}
           </div>
        </header>

        <div className="dashboard-body">
           {viewContent ? (
              <div className="animate-in fade-in slide-in-from-top-6 duration-500">
                 <button 
                    onClick={() => setViewContent(null)}
                    className="mb-8 px-6 py-2 bg-surface-50 text-surface-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-900 hover:text-white transition-all shadow-sm"
                 >
                    ← Back to Dashboard
                 </button>

                 <div className="p-12 bg-white rounded-[4rem] border border-surface-100 shadow-2xl">
                    <header className="mb-12">
                       <div className="flex gap-4 mb-4">
                          <span className="px-3 py-1 bg-primary-100 text-primary-600 text-[10px] font-black uppercase rounded-full tracking-widest">{viewContent.type}</span>
                          <span className="px-3 py-1 bg-surface-50 text-surface-400 text-[10px] font-black uppercase rounded-full tracking-widest italic">Authored by {viewContent.user?.name}</span>
                       </div>
                       <h2 className="text-4xl font-black text-surface-900 uppercase tracking-tighter leading-none mb-6">{viewContent.title}</h2>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                       <div className="lg:col-span-8 space-y-12">
                          {viewContent.type === "video" && viewContent.videoUrl && (
                             <div className="space-y-4">
                                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Core Technical Session</p>
                                <VideoPlayer url={viewContent.videoUrl} poster={viewContent.thumbnail} />
                             </div>
                          )}
                          <article className="content-detail">
                             {renderContent(viewContent.content)}
                          </article>

                          {/* Discussion */}
                          <DiscussionSection contentId={viewContent._id} token={token} user={user} />
                       </div>

                       <div className="lg:col-span-4">
                          <div className="p-8 bg-surface-50 rounded-[3rem] sticky top-8 border border-surface-100">
                             <h4 className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-10 italic text-center">Engagement Hub</h4>
                             <div className="flex items-center gap-16 justify-center">
                                {/* Like Interaction */}
                                <div className="flex flex-col items-center gap-3">
                                   <button 
                                      onClick={() => handleToggleLike(viewContent._id)}
                                      className="group relative transition-all active:scale-90"
                                   >
                                      {checkActive(viewContent.likes) ? (
                                         <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-red-500 fill-current animate-in zoom-in-75 duration-300" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                      ) : (
                                         <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-surface-300 fill-none stroke-current stroke-2 group-hover:text-red-400 transition-colors" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                      )}
                                   </button>
                                   <span className="text-[10px] font-black text-surface-400 uppercase tracking-tighter">{viewContent.likes?.length || 0} Appreciations</span>
                                </div>

                                {/* Save Interaction */}
                                <div className="flex flex-col items-center gap-3">
                                   <button 
                                      onClick={() => handleToggleSave(viewContent._id)}
                                      className="group relative transition-all active:scale-90"
                                   >
                                      {checkActive(viewContent.saves) ? (
                                         <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-primary-600 fill-current animate-in zoom-in-75 duration-300" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                                      ) : (
                                         <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-surface-300 fill-none stroke-current stroke-2 group-hover:text-primary-400 transition-colors" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                                      )}
                                   </button>
                                   <span className="text-[10px] font-black text-surface-400 uppercase tracking-tighter">{checkActive(viewContent.saves) ? "Archived" : "Bookmark"}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <>
                 {activeTab === "discover" && (
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        {/* Filters Bar */}
                        <div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-[2.5rem] border border-surface-100 shadow-sm">
                           <div className="flex-1 relative">
                              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-surface-300">🔍</span>
                              <input 
                                 type="text" 
                                 placeholder="Search resources, topics, or authors..."
                                 className="w-full pl-12 pr-6 py-3 bg-surface-50 rounded-2xl border-none outline-none font-bold text-surface-900 placeholder:text-surface-300 transition-all focus:bg-white focus:ring-2 focus:ring-primary-100"
                                 value={filters.search}
                                 onChange={(e) => setFilters({...filters, search: e.target.value})}
                                 onKeyDown={(e) => e.key === "Enter" && fetchPublished()}
                              />
                           </div>
                           <div className="flex gap-4">
                              <select 
                                 className="px-6 py-3 bg-surface-50 rounded-2xl border-none outline-none font-black uppercase text-[10px] tracking-widest text-surface-400 cursor-pointer hover:bg-surface-100 transition-all"
                                 value={filters.domain}
                                 onChange={(e) => setFilters({...filters, domain: e.target.value})}
                              >
                                 <option value="">All Domains</option>
                                  {domains.map(d => <option key={d} value={d}>{d}</option>)}
                              </select>
                              <select 
                                 className="px-6 py-3 bg-surface-50 rounded-2xl border-none outline-none font-black uppercase text-[10px] tracking-widest text-surface-400 cursor-pointer hover:bg-surface-100 transition-all"
                                 value={filters.type}
                                 onChange={(e) => setFilters({...filters, type: e.target.value})}
                              >
                                 <option value="">All Types</option>
                                 <option value="article">Articles</option>
                                 <option value="video">Videos</option>
                              </select>
                              <button 
                                 onClick={fetchPublished}
                                 className="px-8 py-3 bg-surface-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all active:scale-95 shadow-lg shadow-surface-900/20"
                              >
                                 Apply
                              </button>
                           </div>
                        </div>

                        {loading ? (
                           <div className="p-20 text-center animate-pulse">
                              <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mx-auto mb-6" />
                              <p className="text-surface-400 uppercase font-black text-xs tracking-widest">Querying Resource Library...</p>
                           </div>
                        ) : publishedContent.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                              {publishedContent.map(c => (
                                 <div 
                                    key={c._id} 
                                    onClick={() => setViewContent(c)}
                                    className="p-6 bg-white rounded-[3rem] border border-surface-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
                                 >
                                    <div className="aspect-video rounded-[2rem] overflow-hidden mb-6 relative shadow-lg">
                                       {c.thumbnail ? (
                                          <img src={c.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                       ) : (
                                          <div className="w-full h-full bg-surface-50 flex items-center justify-center text-4xl">
                                             {c.type === "video" ? "📹" : "📄"}
                                          </div>
                                       )}
                                       <div className="absolute top-4 right-4 flex gap-2">
                                          {c.domain && <span className="px-3 py-1 bg-primary-600/90 backdrop-blur text-white rounded-full text-[8px] font-black uppercase tracking-widest">{c.domain}</span>}
                                          <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[8px] font-black uppercase tracking-widest">{c.type}</span>
                                       </div>
                                    </div>
                                    <div>
                                       <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter line-clamp-2 leading-none group-hover:text-primary-600 transition-colors mb-2">{c.title}</h3>
                                       <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest italic mb-6">By: {c.user?.name}</p>
                                       
                                       <div className="flex justify-between items-center py-4 border-t border-surface-50">
                                          <div className="flex gap-4">
                                             <span className="flex items-center gap-1.5 text-[10px] font-black text-surface-400">
                                                <span className="text-sm">❤️</span> {c.likes?.length || 0}
                                             </span>
                                             <span className="flex items-center gap-1.5 text-[10px] font-black text-surface-400">
                                                <span className="text-sm">💬</span> Discussion Active
                                             </span>
                                          </div>
                                          <span className="w-8 h-8 rounded-full bg-surface-50 flex items-center justify-center text-surface-400 group-hover:bg-surface-900 group-hover:text-white transition-all">➔</span>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="p-20 bg-surface-50 rounded-[4rem] border-2 border-dashed border-surface-200 text-center">
                              <span className="text-6xl mb-6 block">🔍</span>
                              <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest">No matching content found</h3>
                              <p className="text-surface-400 font-medium mt-2">Try adjusting your filters or search terms.</p>
                              <button 
                                 onClick={() => setFilters({ search: "", domain: "", type: "" })}
                                 className="mt-8 px-8 py-3 bg-surface-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                              >
                                 Clear All Filters
                              </button>
                           </div>
                        )}
                     </div>
                  )}

                 {activeTab === "saved" && (
                    <div className="space-y-8">
                       <div className="flex items-center justify-between mb-8">
                          <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">Your Saved Library</h2>
                          <span className="px-4 py-2 bg-accent-50 text-accent-600 text-[10px] font-black uppercase rounded-full tracking-widest">{savedContent.length} Resources</span>
                       </div>
                       
                       {savedContent.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                             {savedContent.map(c => (
                                <div 
                                   key={c._id} 
                                   onClick={() => setViewContent(c)}
                                   className="p-6 bg-white rounded-[3rem] border border-surface-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
                                >
                                   <div className="aspect-video rounded-[2rem] overflow-hidden mb-6 relative shadow-lg">
                                      {c.thumbnail ? (
                                         <img src={c.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                      ) : (
                                         <div className="w-full h-full bg-surface-50 flex items-center justify-center text-4xl">
                                            {c.type === "video" ? "📹" : "📄"}
                                         </div>
                                      )}
                                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest">{c.type}</div>
                                   </div>
                                   <div>
                                      <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter line-clamp-2 leading-none group-hover:text-primary-600 transition-colors mb-2">{c.title}</h3>
                                      <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest italic mb-6">By: {c.user?.name}</p>
                                      
                                      <div className="flex justify-between items-center py-4 border-t border-surface-50">
                                         <div className="flex gap-4">
                                            <span className="flex items-center gap-1.5 text-[10px] font-black text-surface-400">
                                               <span className="text-sm">❤️</span> {c.likes?.length || 0}
                                            </span>
                                         </div>
                                         <span className="w-8 h-8 rounded-full bg-surface-50 flex items-center justify-center text-surface-400 group-hover:bg-surface-900 group-hover:text-white transition-all">➔</span>
                                      </div>
                                   </div>
                                </div>
                             ))}
                          </div>
                       ) : (
                          <div className="p-20 bg-surface-50 rounded-[4rem] border-2 border-dashed border-surface-200 text-center">
                             <span className="text-6xl mb-6 block">🔖</span>
                             <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest">Your library is currently empty</h3>
                             <p className="text-surface-400 font-medium mt-2">Discover and save session recordings or articles to see them here.</p>
                             <button 
                                onClick={() => setActiveTab("discover")}
                                className="mt-8 px-8 py-3 bg-surface-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all"
                             >
                                Explore Discover Feed
                             </button>
                          </div>
                       )}
                    </div>
                 )}

                 {activeTab === "profile" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="p-10 bg-white rounded-[3rem] border border-surface-100 shadow-xl shadow-surface-200/50">
                             <h3 className="text-xs font-black text-primary-600 uppercase tracking-[0.2em] mb-8">Account Information</h3>
                             <div className="space-y-6">
                                <div className="flex flex-col gap-1">
                                   <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Full Name</label>
                                   <p className="text-xl font-black text-surface-900">{user?.name}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                   <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Email Address</label>
                                   <p className="text-lg font-bold text-surface-600 italic underline decoration-primary-200">{user?.email}</p>
                                </div>
                                <div className="pt-6 border-t border-surface-50 flex items-center justify-between">
                                   <span className="text-[10px] font-black uppercase text-surface-400">Account Status</span>
                                   <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full tracking-widest border border-green-100 italic">Verified Identity</span>
                                </div>
                             </div>
                          </div>

                          <div className="p-10 bg-surface-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                             <div className="relative z-10">
                                <h3 className="text-xs font-black text-accent-400 uppercase tracking-[0.2em] mb-8">Professional Background</h3>
                                <div className="space-y-6">
                                   <div className="flex flex-col gap-1">
                                      <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Primary Role</label>
                                      <p className="text-xl font-black text-white uppercase tracking-tighter">{user?.role === "L1" ? "Healthcare Professional" : user?.role}</p>
                                   </div>
                                   {user?.expertise?.length > 0 && (
                                      <div className="flex flex-col gap-1">
                                         <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Areas of Interest</label>
                                         <p className="text-lg font-bold text-accent-400">{user.expertise.join(", ")}</p>
                                      </div>
                                   )}
                                   {user?.expertiseLevel && (
                                      <div className="flex flex-col gap-1">
                                         <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Skill Tier</label>
                                         <p className="text-2xl font-black text-accent-500 italic">{user.expertiseLevel}</p>
                                      </div>
                                   )}
                                </div>
                                <button className="mt-10 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Update Credentials</button>
                                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                             </div>
                          </div>
                       </div>
                    </div>
                 )}

                  {activeTab === "certs" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                       <div className="flex items-center justify-between mb-8">
                          <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">My Certifications</h2>
                          <span className="px-4 py-2 bg-primary-50 text-primary-600 text-[10px] font-black uppercase rounded-full tracking-widest">Learner Credentials</span>
                       </div>

                       {/* Dynamic Certificates */}
                       {certLoading ? (
                          <div className="p-20 text-center">
                             <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
                             <p className="text-surface-400 uppercase font-black text-[10px] tracking-widest">Retrieving Credentials...</p>
                          </div>
                       ) : certificates.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                             {certificates.map((cert) => (
                                <div key={cert._id} className="p-8 bg-white rounded-[3rem] border border-surface-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                                   <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                   <div className="relative z-10">
                                      <div className="text-3xl mb-6">🎓</div>
                                      <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter leading-none mb-2">{cert.certification?.title}</h3>
                                      <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mb-6 italic">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                                      
                                      <div className="pt-6 border-t border-surface-50 flex items-center justify-between">
                                         <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">ID: {cert.verificationId}</span>
                                         <Link 
                                            to={`/verify/${cert.verificationId}`}
                                            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg text-xl"
                                         >
                                            ➔
                                         </Link>
                                      </div>
                                   </div>
                                </div>
                             ))}
                          </div>
                       ) : (
                          <div className="p-12 bg-surface-50 rounded-[3rem] border-2 border-dashed border-surface-200 text-center mb-12">
                             <div className="text-4xl mb-4">🏅</div>
                             <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest">No Assessment Credentials Yet</h3>
                             <p className="text-surface-400 font-medium mt-2">Pass a certification test to see your professional certificates here.</p>
                             <Link to="/certifications" className="inline-block mt-8 px-8 py-3 bg-surface-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Start Assessment</Link>
                          </div>
                       )}

                       <div className="border-t border-surface-100 pt-12">
                          <h3 className="text-xs font-black text-surface-300 uppercase tracking-widest mb-8">Registration Documents</h3>
                          {user?.proofUrl ? (
                             <div className="p-8 bg-white rounded-[3rem] border border-surface-100 shadow-sm hover:shadow-xl transition-all group max-w-md">
                                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 relative shadow-lg bg-surface-50">
                                   <img 
                                      src={user.proofUrl} 
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                      alt="Registration Document" 
                                   />
                                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                      <a 
                                         href={user.proofUrl} 
                                         target="_blank" 
                                         rel="noopener noreferrer"
                                         className="w-full py-3 bg-white text-surface-900 text-center rounded-xl text-[10px] font-black uppercase tracking-widest"
                                      >
                                         View Full Document
                                      </a>
                                   </div>
                                </div>
                                <div className="flex justify-between items-start">
                                   <div>
                                      <h3 className="text-lg font-black text-surface-900 uppercase tracking-tighter leading-none mb-1">Verification Proof</h3>
                                      <p className="text-[10px] font-bold text-surface-400 uppercase italic">Signup Attachment</p>
                                   </div>
                                   <span className="px-2 py-1 bg-green-50 text-green-600 text-[8px] font-black uppercase rounded tracking-widest border border-green-100">Verified</span>
                                </div>
                             </div>
                          ) : (
                             <p className="text-sm text-surface-400 italic">No registration documents on file.</p>
                          )}
                       </div>
                    </div>
                 )}

                 {activeTab === "learning" && (
                     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        <div className="flex items-center justify-between mb-8">
                           <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">Academic Course Catalog</h2>
                           <span className="px-4 py-2 bg-primary-50 text-primary-600 text-[10px] font-black uppercase rounded-full tracking-widest">Formal Learning Tracks</span>
                        </div>

                        {/* Catalog Filters Bar */}
                        <div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-[2.5rem] border border-surface-100 shadow-sm">
                           <div className="flex-1 relative">
                              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-surface-300">🔍</span>
                              <input 
                                 type="text" 
                                 placeholder="Search approved paid courses..."
                                 className="w-full pl-12 pr-6 py-3 bg-surface-50 rounded-2xl border-none outline-none font-bold text-surface-900 placeholder:text-surface-300 transition-all focus:bg-white focus:ring-2 focus:ring-primary-100"
                                 value={catalogFilters.search}
                                 onChange={(e) => setCatalogFilters({...catalogFilters, search: e.target.value})}
                                 onKeyDown={(e) => e.key === "Enter" && fetchCourses()}
                              />
                           </div>
                           <div className="flex gap-4">
                              <select 
                                 className="px-6 py-3 bg-surface-50 rounded-2xl border-none outline-none font-black uppercase text-[10px] tracking-widest text-surface-400 cursor-pointer hover:bg-surface-100 transition-all"
                                 value={catalogFilters.domain}
                                 onChange={(e) => setCatalogFilters({...catalogFilters, domain: e.target.value})}
                              >
                                 <option value="">All Domains</option>
                                 {domains.map(d => <option key={d} value={d}>{d}</option>)}
                              </select>
                              <select 
                                 className="px-6 py-3 bg-surface-50 rounded-2xl border-none outline-none font-black uppercase text-[10px] tracking-widest text-surface-400 cursor-pointer hover:bg-surface-100 transition-all"
                                 value={catalogFilters.maxPrice}
                                 onChange={(e) => setCatalogFilters({...catalogFilters, maxPrice: e.target.value})}
                              >
                                 <option value="">All Prices</option>
                                 <option value="1000">Under ₹1,000</option>
                                 <option value="5000">Under ₹5,000</option>
                                 <option value="10000">Under ₹10,000</option>
                                 <option value="25000">Under ₹25,000</option>
                              </select>
                              <button 
                                 onClick={fetchCourses}
                                 className="px-8 py-3 bg-surface-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all active:scale-95 shadow-lg shadow-surface-900/20"
                              >
                                 Apply
                              </button>
                           </div>
                        </div>

                        {courseLoading ? (
                           <div className="p-20 text-center animate-pulse">
                              <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mx-auto mb-6" />
                              <p className="text-surface-400 uppercase font-black text-xs tracking-widest">Opening Curriculum Library...</p>
                           </div>
                        ) : courses.length > 0 ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                              {courses.map(course => (
                                 <div 
                                    key={course._id}
                                    className="p-6 bg-white rounded-[3rem] border border-surface-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group flex flex-col animate-in fade-in duration-500"
                                    onClick={() => navigate(`/courses/${course._id}`)}
                                 >
                                    <div className="aspect-video rounded-[2rem] overflow-hidden mb-6 relative shadow-lg">
                                       <img 
                                          src={course.thumbnail || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800"} 
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                          alt="" 
                                       />
                                       <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">★ Premium</div>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                       <span className="text-[9px] font-black text-primary-600 uppercase tracking-widest mb-2">{course.domain}</span>
                                       <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter line-clamp-2 leading-none group-hover:text-primary-600 transition-colors mb-4">{course.title}</h3>
                                       
                                       <p className="text-xs text-surface-500 font-medium line-clamp-3 leading-relaxed mb-6">
                                          {course.description}
                                       </p>

                                       <div className="mt-auto pt-6 border-t border-surface-50">
                                          <div className="flex items-center justify-between mb-4 text-xs font-bold text-surface-500">
                                             <div className="flex items-center gap-1">
                                                <span>📚</span> {course.totalModules || 0} Modules
                                             </div>
                                             <div className="flex items-center gap-1">
                                                <span>📝</span> {course.totalLessons || 0} Lessons
                                             </div>
                                          </div>
                                          
                                          <div className="flex justify-between items-center">
                                             <div className="flex flex-col">
                                                <span className="text-[8px] font-black text-surface-300 uppercase tracking-widest mb-1">Instructor</span>
                                                <span className="text-[10px] font-black text-surface-600">{course.instructor || "CHAMP Faculty"}</span>
                                             </div>
                                             <div className="flex flex-col text-right">
                                                <span className="text-[8px] font-black text-surface-300 uppercase tracking-widest mb-1">Enrolment Fee</span>
                                                <span className="text-sm font-black text-primary-600">
                                                   ₹{course.price?.toLocaleString()}
                                                </span>
                                             </div>
                                          </div>

                                          <button 
                                             onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/courses/${course._id}`);
                                             }}
                                             className="w-full mt-6 py-3.5 bg-surface-50 text-surface-700 group-hover:bg-surface-900 group-hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all text-center"
                                          >
                                             View Course
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="p-20 bg-surface-50 rounded-[4rem] border-2 border-dashed border-surface-200 text-center">
                              <span className="text-6xl mb-6 block">📚</span>
                              <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest">New learning tracks are being curated.</h3>
                              <p className="text-surface-400 font-medium mt-2">Check back soon for specialized healthcare certification programs.</p>
                           </div>
                        )}
                     </div>
                 )}

                 {activeTab === "test" && (
                    <div className="space-y-8">
                       <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-10 bg-surface-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group"
                       >
                          <div className="relative z-10">
                             <h3 className="text-2xl font-black uppercase mb-3">Competency Assessment</h3>
                             <p className="text-surface-400 font-medium max-w-2xl leading-relaxed">
                                Prove your clinical expertise and decision-making abilities with our real-world healthcare scenarios. 
                                Earn recognized certifications and showcase your professional standing.
                             </p>
                          </div>
                          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                       </motion.div>

                       {availableCertsLoading ? (
                          <div className="p-20 text-center">
                             <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
                             <p className="text-surface-400 uppercase font-black text-[10px] tracking-widest">Scanning Assessment Directory...</p>
                          </div>
                       ) : availableCerts.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                             {availableCerts.map((cert, idx) => (
                                <motion.div 
                                   key={cert._id} 
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: idx * 0.1 }}
                                   className="group bg-white rounded-[2.5rem] border border-surface-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                                >
                                   <div className="h-2 bg-gradient-to-r from-primary-500 to-accent-500" />
                                   <div className="p-8 flex flex-col flex-1">
                                      <span className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-primary-50 text-primary-600 rounded-full mb-4 self-start">
                                         {cert.domain}
                                      </span>
                                      
                                      <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter leading-none mb-3 group-hover:text-primary-600 transition-colors">
                                         {cert.title}
                                      </h3>

                                      {cert.description && (
                                         <p className="text-sm text-surface-500 font-medium leading-relaxed mb-6 line-clamp-3">
                                            {cert.description}
                                         </p>
                                      )}

                                      <div className="mt-auto pt-6 border-t border-surface-50 space-y-6">
                                         <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                               <span className="text-[8px] font-black text-surface-300 uppercase tracking-widest mb-1">Passing Threshold</span>
                                               <span className="text-sm font-black text-surface-900">{cert.passingScore}% Correct</span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                               <span className="text-[8px] font-black text-surface-300 uppercase tracking-widest mb-1">Fee Structure</span>
                                               <span className="text-sm font-black text-primary-600">
                                                  {cert.price === 0 || !cert.price ? "Free Access" : `₹${cert.price}`}
                                               </span>
                                            </div>
                                         </div>

                                         <button
                                            onClick={() => navigate(`/test/${cert._id}`)}
                                            className="w-full py-4 bg-surface-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary-600 transition-all shadow-lg active:scale-95"
                                         >
                                            Initialize Test →
                                         </button>
                                      </div>
                                   </div>
                                </motion.div>
                             ))}
                          </div>
                       ) : (
                          <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             className="p-16 bg-surface-50 rounded-[4rem] border-2 border-dashed border-surface-200 text-center"
                          >
                             <div className="text-5xl mb-6">📋</div>
                             <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest">No Assessments Available</h3>
                             <p className="text-surface-400 font-medium mt-2 max-w-sm mx-auto">Our academic board is currently finalizing new certification modules. Please check back shortly.</p>
                          </motion.div>
                       )}
                    </div>
                 )}

                 {activeTab === "discussions" && (
                    <div className="space-y-4">
                       <p className="text-surface-400 font-medium italic">Join the co-creative community discussions to share and solve practical challenges.</p>
                    </div>
                 )}

                 {activeTab === "events" && (
                    <div className="space-y-8">
                       <div className="flex items-center justify-between mb-8">
                          <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">Upcoming Institutional Events</h2>
                          <span className="px-4 py-2 bg-primary-50 text-primary-600 text-[10px] font-black uppercase rounded-full tracking-widest">{events.length} Active Events</span>
                       </div>

                       {eventLoading ? (
                          <div className="flex justify-center p-20">
                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                          </div>
                       ) : events.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                             {events.map(event => (
                                <div key={event._id} className="bg-white rounded-[3rem] border border-surface-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col md:flex-row">
                                   <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden">
                                      <img 
                                         src={event.thumbnail || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format"} 
                                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                         alt="" 
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                                         <span className="text-white text-[10px] font-black uppercase tracking-widest bg-primary-600 px-2 py-1 rounded">
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
                                            Ends: {new Date(event.registrationTimeline).toLocaleDateString()}
                                         </div>
                                         {checkActive(event.registrations) ? (
                                            <button disabled className="px-6 py-2 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-full border border-green-100">
                                               ✓ Registered
                                            </button>
                                         ) : (
                                            <button 
                                               onClick={() => handleRegisterEvent(event._id)}
                                               className="px-6 py-2 bg-surface-900 text-white text-[10px] font-black uppercase rounded-full hover:bg-primary-600 transition-all shadow-lg"
                                            >
                                               Join Session
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
                             <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest">No Active Events Found</h3>
                             <p className="text-surface-400 font-medium mt-2">Check back later for new institutional sessions and conferences.</p>
                          </div>
                       )}
                    </div>
                 )}


              </>
           )}
        </div>
      </main>
    </div>
  );
}
