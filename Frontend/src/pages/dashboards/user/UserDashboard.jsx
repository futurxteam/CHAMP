import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../dashboard.css";
import useStore from "../../../store/useStore";
import { contentApi, threadApi, commentApi, eventApi } from "../../../api/api";
import VideoPlayer from "../../../components/VideoPlayer";
import DiscussionSection from "../../../components/DiscussionSection";

export default function UserDashboard() {
  const { user, logout, token } = useStore();
  const [activeTab, setActiveTab ] = useState("discover");
  const [publishedContent, setPublishedContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewContent, setViewContent] = useState(null);

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
        const data = await contentApi.getPublishedContent(token);
        setPublishedContent(data);
     } catch (err) { console.error(err); }
     finally { setLoading(false); }
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

   React.useEffect(() => {
      if (activeTab === "discover" || activeTab === "saved") fetchPublished();
      if (activeTab === "events") fetchEvents();
   }, [activeTab]);

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

  // L1 users only view — no teaching tab needed (that's in ContributorDashboard)

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
                 setViewContent(null);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
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
                                   <div className="flex flex-col gap-1">
                                      <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Experience Index</label>
                                      <p className="text-3xl font-black text-accent-500 italic">Tier 01</p>
                                   </div>
                                </div>
                                <button className="mt-10 w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Update Credentials</button>
                             </div>
                             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                          </div>
                       </div>
                    </div>
                 )}

                 {activeTab === "certs" && (
                    <div className="p-12 bg-white rounded-[3rem] border border-surface-100 text-center">
                       <div className="text-4xl mb-4">🎖️</div>
                       <h3 className="text-xl font-black text-surface-900 uppercase">No active certifications</h3>
                       <p className="text-surface-500 mt-2 font-medium">Complete programs and pass assessments to earn your CHAMP 21 credentials.</p>
                       <Link to="/certification" className="inline-block mt-8 px-8 py-3 bg-primary-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Browse Programs</Link>
                    </div>
                 )}

                 {activeTab === "learning" && (
                    <div className="grid grid-cols-1 gap-4">
                       <div className="p-6 bg-surface-50 rounded-2xl border border-dashed border-surface-200 text-center">
                          <p className="text-sm text-surface-400 font-bold uppercase tracking-widest italic">You aren't enrolled in any active learning tracks yet.</p>
                       </div>
                    </div>
                 )}

                 {activeTab === "test" && (
                    <div className="p-8 bg-surface-900 rounded-[2.5rem] text-white">
                       <h3 className="text-2xl font-black uppercase mb-4">Competency Assessment</h3>
                       <p className="text-surface-400 font-medium mb-8">Test your decision-making abilities with our real-world hospital scenarios.</p>
                       <button className="px-8 py-4 bg-accent-500 text-surface-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all">Start New Assessment</button>
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
