import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../dashboard.css";
import useStore from "../../../store/useStore";
import { adminApi, eventApi } from "../../../api/api";
import VideoPlayer from "../../../components/VideoPlayer";

export default function AdminDashboard() {
   const { user, logout, token } = useStore();
   const [activeTab, setActiveTab] = useState("overview");
   const [users, setUsers] = useState([]);
   const [userMeta, setUserMeta] = useState({ pages: 1, current: 1 });
   const [filters, setFilters] = useState({ name: "", role: "" });
   const [loading, setLoading] = useState(false);
   const [pendingContent, setPendingContent] = useState([]);
   const [expandedItem, setExpandedItem] = useState(null);

   // Event Management State
   const [events, setEvents] = useState([]);
   const [showEventForm, setShowEventForm] = useState(false);
   const [editingEvent, setEditingEvent] = useState(null);
   const [eventData, setEventData] = useState({
      title: "", date: "", time: "10:00 AM", description: "", location: "", thumbnail: "", maxOccupants: 50, registrationTimeline: ""
   });

   const fetchAdminEvents = async () => {
      setLoading(true);
      try {
         const data = await eventApi.getAllAdmin(token);
         setEvents(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
   };

   const handleSubmitEvent = async (e) => {
      e.preventDefault();
      try {
         if (editingEvent) {
            await eventApi.update(editingEvent._id, eventData, token);
         } else {
            await eventApi.create(eventData, token);
         }
         setShowEventForm(false);
         setEditingEvent(null);
         setEventData({ title: "", date: "", time: "10:00 AM", description: "", location: "", thumbnail: "", maxOccupants: 50, registrationTimeline: "" });
         fetchAdminEvents();
      } catch (err) { alert(err.message); }
   };

   const handleDeleteEvent = async (id) => {
      if (!window.confirm("Delete this event definitively?")) return;
      try {
         await eventApi.delete(id, token);
         fetchAdminEvents();
      } catch (err) { alert(err.message); }
   };

   const menuItems = [
      { id: "overview", label: "System Overview", icon: "📊" },
      { id: "users", label: "Manage People", icon: "👥" },
      { id: "content", label: "Content Moderation", icon: "📄" },
      { id: "events", label: "Platform Events", icon: "📅" },
      { id: "settings", label: "System Settings", icon: "⚙️" },
   ];

   const fetchContent = async () => {
      setLoading(true);
      try {
         const data = await adminApi.getPendingContent(token);
         setPendingContent(data);
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   const fetchUsers = async (page = 1) => {
      setLoading(true);
      try {
         const data = await adminApi.getAllUsers(token, page, 8, filters);
         setUsers(data.users);
         setUserMeta({ pages: data.pages, current: data.currentPage });
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   const handleContentAction = async (id, action) => {
      try {
         if (action === "approve") await adminApi.approveContent(id, token);
         else await adminApi.rejectContent(id, "Content policy violation", token);
         fetchContent();
      } catch (err) {
         alert(err.message);
      }
   };

   const updateStatus = async (id, status) => {
      try {
         await adminApi.updateUserStatus(id, status, token);
         fetchUsers(userMeta.current);
      } catch (err) {
         alert(err.message);
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
      } catch {
         return <p className="text-sm">{contentStr}</p>;
      }
   };

    useEffect(() => {
       if (activeTab === "users") fetchUsers(1);
       if (activeTab === "content") fetchContent();
       if (activeTab === "events") fetchAdminEvents();
    }, [activeTab, filters.role, token]);

    return (
       <div className="dashboard-layout">
          {/* ... Modal for Event Creation/Edit ... */}
          {showEventForm && (
             <div className="fixed inset-0 z-[100] bg-surface-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-[3rem] w-full max-w-2xl p-10 shadow-2xl animate-in zoom-in-95 duration-300">
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">
                         {editingEvent ? "Edit Platform Event" : "Initialize New Event"}
                      </h2>
                      <button onClick={() => { setShowEventForm(false); setEditingEvent(null); }} className="text-2xl">✕</button>
                   </div>
                   
                   <form onSubmit={handleSubmitEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                         <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Event Heading</label>
                         <input required type="text" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-surface-100 bg-surface-50 font-bold text-surface-900 outline-none focus:border-primary-600 transition-colors" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Event Date</label>
                         <input required type="date" value={eventData.date} onChange={e => setEventData({...eventData, date: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-surface-100 bg-surface-50 font-bold text-surface-900 outline-none" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Event Time</label>
                         <input required type="text" value={eventData.time} onChange={e => setEventData({...eventData, time: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-surface-100 bg-surface-50 font-bold text-surface-900 outline-none" placeholder="e.g. 10:00 AM" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Location / Link</label>
                         <input required type="text" value={eventData.location} onChange={e => setEventData({...eventData, location: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-surface-100 bg-surface-50 font-bold text-surface-900 outline-none" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Max Occupants</label>
                         <input required type="number" value={eventData.maxOccupants} onChange={e => setEventData({...eventData, maxOccupants: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-surface-100 bg-surface-50 font-bold text-surface-900 outline-none" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                         <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Registration Deadline</label>
                         <input required type="date" value={eventData.registrationTimeline} onChange={e => setEventData({...eventData, registrationTimeline: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-surface-100 bg-surface-50 font-bold text-surface-900 outline-none" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                         <label className="text-[10px] font-black uppercase text-surface-300 tracking-widest">Brief Description</label>
                         <textarea required value={eventData.description} onChange={e => setEventData({...eventData, description: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-surface-100 bg-surface-50 font-bold text-surface-900 outline-none h-24 resize-none" />
                      </div>
                      <div className="md:col-span-2 pt-4">
                         <button type="submit" className="w-full py-4 bg-surface-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-primary-600 transition-all">
                            {editingEvent ? "Commit Changes" : "Publish Event"}
                         </button>
                      </div>
                   </form>
                </div>
             </div>
          )}
         <aside className="dashboard-sidebar">
            <div className="px-4 mb-8">
               <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-xl bg-surface-900 flex items-center justify-center text-white font-black">C</div>
                  <span className="text-xl font-black tracking-tighter text-surface-900">CHAMP</span>
               </Link>
               <div className="mt-2 text-[10px] font-black text-primary-600 uppercase tracking-widest">Admin Control</div>
            </div>

            <nav className="flex-1">
               {menuItems.map((item) => (
                  <button
                     key={item.id}
                     onClick={() => {
                        setActiveTab(item.id);
                        setExpandedItem(null);
                        setShowEventForm(false);
                        setEditingEvent(null);
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

         <main className="dashboard-content">
            <header className="dashboard-header flex justify-between items-center">
               <div>
                  <h1 className="text-2xl font-black text-surface-900 uppercase tracking-tighter text-shadow-sm">
                     {menuItems.find(i => i.id === activeTab)?.label}
                  </h1>
                  <p className="text-xs text-surface-400 font-bold uppercase tracking-widest mt-1">
                     System Admin • {user?.name}
                  </p>
               </div>
               <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-black text-xl shadow-xl">
                  {user?.name?.charAt(0)}
               </div>
            </header>

            <div className="dashboard-body">
               {activeTab === "overview" && (
                  <>
                     <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                           { label: "Total Members", val: "5,234" },
                           { label: "Pending Issues", val: pendingContent.length },
                           { label: "Active Sessions", val: "86" },
                           { label: "Platform Growth", val: "+24.8%" }
                        ].map((stat, i) => (
                           <div key={i} className="p-8 bg-white rounded-3xl border border-surface-100 shadow-sm">
                              <div className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-2">{stat.label}</div>
                              <div className="text-3xl font-black text-surface-900">{stat.val}</div>
                           </div>
                        ))}
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="p-8 bg-white rounded-[3rem] border border-surface-100">
                           <h3 className="text-lg font-black text-surface-900 mb-6 uppercase tracking-tighter">System Health</h3>
                           <div className="space-y-6">
                              {[
                                 { name: "Database Efficiency", pct: "92%" },
                                 { name: "Server Load", pct: "15%" },
                                 { name: "Storage Capacity", pct: "42%" }
                              ].map((item, i) => (
                                 <div key={i}>
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                       <span className="text-surface-400">{item.name}</span>
                                       <span className="text-primary-600">{item.pct}</span>
                                    </div>
                                    <div className="h-2 w-full bg-surface-50 rounded-full overflow-hidden">
                                       <div className="h-full bg-primary-600 rounded-full" style={{ width: item.pct }} />
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div className="p-8 bg-white rounded-[3rem] border border-surface-100 flex flex-col items-center justify-center text-center">
                           <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center text-2xl mb-4">🚀</div>
                           <h4 className="text-xl font-black text-surface-900 uppercase">Scale Mode Active</h4>
                           <p className="text-sm text-surface-400 font-medium mt-2">Platform is operating at peak efficiency. No critical issues detected.</p>
                        </div>
                     </div>
                  </>
               )}

               {activeTab === "users" && (
                  <div className="space-y-8">
                     <div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-3xl border border-surface-100">
                        <input
                           type="text"
                           placeholder="Search name..."
                           className="flex-1 px-4 py-2 rounded-xl border border-surface-200 outline-none text-sm font-bold placeholder-surface-300"
                           value={filters.name}
                           onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                           onKeyDown={(e) => e.key === "Enter" && fetchUsers(1)}
                        />
                        <select
                           className="px-4 py-2 rounded-xl border border-surface-200 outline-none text-sm font-bold text-surface-600"
                           value={filters.role}
                           onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                        >
                           <option value="">All Institutional Roles</option>
                           <option value="user">Member (Health Professional)</option>
                           <option value="speaker">Expert Facilitator</option>
                        </select>
                        <button
                           onClick={() => fetchUsers(1)}
                           className="px-6 py-2 bg-surface-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                        >
                           Apply
                        </button>
                     </div>

                     <div className="grid grid-cols-1 gap-4">
                        {loading ? (
                           <div className="p-20 text-center animate-pulse"><p className="text-surface-400 uppercase font-black text-xs tracking-widest">Querying population...</p></div>
                        ) : (
                           users.map((u) => (
                              <div key={u._id} className="p-6 bg-white rounded-[2rem] border border-surface-100 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary-100 transition-all">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-surface-50 flex items-center justify-center text-surface-400 font-black text-xl">{u.name.charAt(0)}</div>
                                    <div>
                                       <div className="flex items-center gap-2">
                                          <h4 className="font-black text-surface-900 uppercase text-sm">{u.name}</h4>
                                          {u.status === "pending" && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
                                       </div>
                                       <p className="text-xs text-surface-400 font-bold tracking-tight">{u.email}</p>
                                       {u.role === "speaker" && u.speakerProfile && (
                                          <div className="mt-2 text-[9px] font-black text-primary-600 uppercase tracking-widest bg-primary-50 px-2 py-0.5 rounded inline-block">
                                             Expertise: {u.speakerProfile.expertise || "General"}
                                          </div>
                                       )}
                                    </div>
                                 </div>

                                 <div className="flex flex-wrap items-center gap-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${u.role === "speaker" ? "bg-primary-50 text-primary-600" : "bg-surface-50 text-surface-500"
                                       }`}>
                                       {u.role === "speaker" ? "Facilitator" : "Member"}
                                    </span>

                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest italic ${u.status === "approved" ? "text-green-500" :
                                       u.status === "blocked" ? "text-red-500" : "text-amber-500"
                                       }`}>
                                       {u.status}
                                    </span>

                                    <div className="flex gap-2">
                                       <button
                                          onClick={() => updateStatus(u._id, "approved")}
                                          className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                                          title="Approve"
                                       >✅</button>
                                       <button
                                          onClick={() => updateStatus(u._id, "blocked")}
                                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                          title="Block"
                                       >🚫</button>
                                       <button
                                          onClick={() => updateStatus(u._id, "pending")}
                                          className="p-2 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                                          title="Set Pending"
                                       >⏳</button>
                                    </div>
                                 </div>
                              </div>
                           ))
                        )}
                     </div>

                     {userMeta.pages > 1 && (
                        <div className="flex justify-center gap-2 pt-8">
                           {[...Array(userMeta.pages)].map((_, i) => (
                              <button
                                 key={i}
                                 onClick={() => fetchUsers(i + 1)}
                                 className={`w-10 h-10 rounded-xl font-black text-xs ${userMeta.current === i + 1 ? "bg-surface-900 text-white" : "bg-white text-surface-400 border border-surface-100"}`}
                              >
                                 {i + 1}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
               )}

               {activeTab === "content" && (
                  <div className="space-y-6">
                     {loading ? (
                        <div className="p-20 text-center animate-pulse"><p className="text-surface-400 font-black uppercase tracking-widest">Scanning submission queue...</p></div>
                     ) : pendingContent.length === 0 ? (
                        <div className="p-20 bg-surface-50 rounded-[3rem] border border-dashed border-surface-200 text-center">
                           <p className="text-surface-400 font-black uppercase tracking-widest">Queue Clear. No content pending moderation.</p>
                        </div>
                     ) : (
                        pendingContent.map((item) => (
                           <div key={item._id} className="p-8 bg-white rounded-[3rem] border border-surface-100 shadow-sm transition-all group hover:shadow-2xl overflow-hidden">
                              <div className="flex justify-between items-start mb-6">
                                 <div>
                                    <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter">{item.title}</h3>
                                    <p className="text-xs text-primary-600 font-bold uppercase tracking-widest mt-1">Submitted by {item.speaker?.name}</p>
                                 </div>
                                 <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-full tracking-widest">Pending Review</span>
                              </div>

                              <div 
                                 onClick={() => setExpandedItem(expandedItem === item._id ? null : item._id)}
                                 className={`p-6 bg-surface-50 rounded-2xl mb-8 cursor-pointer hover:bg-primary-50 transition-colors relative ${expandedItem === item._id ? "" : "max-h-[200px] overflow-hidden"}`}
                              >
                                 <div className="flex flex-col gap-6">
                                    {(item.thumbnail || item.videoUrl) && (
                                       <div className="media-preview grid grid-cols-1 md:grid-cols-2 gap-4">
                                          {item.thumbnail && (
                                             <div className="space-y-2">
                                                <p className="text-[10px] font-black text-surface-400 uppercase tracking-widest">Thumbnail Asset</p>
                                                <div className="rounded-2xl overflow-hidden shadow-lg aspect-video">
                                                   <img src={item.thumbnail} alt="Cover" className="w-full h-full object-cover" />
                                                </div>
                                             </div>
                                          )}
                                          {item.type === "video" && item.videoUrl && (
                                             <div className="space-y-2">
                                                <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Primary Resource Content</p>
                                                <VideoPlayer url={item.videoUrl} poster={item.thumbnail} />
                                             </div>
                                          )}
                                       </div>
                                    )}
                                    {renderContent(item.content)}
                                 </div>
                                 
                                 {expandedItem !== item._id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface-50 to-transparent flex items-end justify-center pb-4">
                                       <span className="text-[10px] font-black uppercase tracking-widest text-primary-600">Click to Review Article & Media Details</span>
                                    </div>
                                 )}
                              </div>

                              <div className="flex gap-4">
                                 <button
                                    onClick={() => handleContentAction(item._id, "approve")}
                                    className="px-8 py-3 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                                 >
                                    Publish Content
                                 </button>
                                 <button
                                    onClick={() => handleContentAction(item._id, "reject")}
                                    className="px-8 py-3 border-2 border-red-100 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all"
                                 >
                                    Request Changes
                                 </button>
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               )}

               {activeTab === "events" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
                     <div className="flex justify-between items-center">
                        <div className="p-8 bg-white rounded-3xl border border-surface-100 flex-1 mr-4">
                           <h3 className="text-3xl font-black text-surface-900">{events.length}</h3>
                           <p className="text-[10px] font-black text-surface-300 uppercase tracking-widest mt-1">Total Platform Events</p>
                        </div>
                        <button 
                           onClick={() => { setEditingEvent(null); setEventData({ title: "", date: "", time: "10:00 AM", description: "", location: "", thumbnail: "", maxOccupants: 50, registrationTimeline: "" }); setShowEventForm(true); }}
                           className="h-24 px-10 bg-surface-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-primary-600 transition-all shadow-xl"
                        >
                           + New Event
                        </button>
                     </div>

                     <div className="grid grid-cols-1 gap-6">
                        {loading ? (
                           <div className="p-20 text-center animate-pulse text-xs font-black uppercase text-surface-300">Synchronizing calendar...</div>
                        ) : events.length > 0 ? (
                           events.map(event => (
                              <div key={event._id} className="p-8 bg-white rounded-[3rem] border border-surface-100 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-primary-100 transition-all shadow-sm">
                                 <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-3xl overflow-hidden bg-surface-50">
                                       <img src={event.thumbnail || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200"} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                       <h4 className="text-xl font-black text-surface-900 uppercase tracking-tighter">{event.title}</h4>
                                       <div className="flex gap-4 mt-1">
                                          <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest">{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                                          <span className="text-[10px] font-black text-surface-300 uppercase tracking-widest">{event.location}</span>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="flex items-center gap-8">
                                    <div className="text-right">
                                       <div className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-1">Registration Status</div>
                                       <div className="text-lg font-black text-surface-900">{event.registrations?.length || 0} / {event.maxOccupants}</div>
                                    </div>

                                    <div className="flex gap-2">
                                       <button 
                                          onClick={() => { 
                                             setEditingEvent(event); 
                                             setEventData({
                                                title: event.title,
                                                date: event.date ? new Date(event.date).toISOString().split('T')[0] : "",
                                                time: event.time,
                                                description: event.description,
                                                location: event.location,
                                                thumbnail: event.thumbnail,
                                                maxOccupants: event.maxOccupants,
                                                registrationTimeline: event.registrationTimeline ? new Date(event.registrationTimeline).toISOString().split('T')[0] : ""
                                             });
                                             setShowEventForm(true);
                                          }}
                                          className="p-4 bg-surface-50 hover:bg-primary-50 text-surface-600 hover:text-primary-600 rounded-2xl transition-all font-black text-xs uppercase"
                                       >
                                          Edit
                                       </button>
                                       <button 
                                          onClick={() => handleDeleteEvent(event._id)}
                                          className="p-4 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all font-black text-xs uppercase"
                                       >
                                          Definite Delete
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           ))
                        ) : (
                           <div className="p-20 bg-surface-50 rounded-[3rem] border border-dashed border-surface-200 text-center text-surface-400 font-bold uppercase tracking-widest italic text-xs">
                              Platform calendar is empty.
                           </div>
                        )}
                     </div>
                  </div>
               )}

               {activeTab !== "overview" && activeTab !== "users" && activeTab !== "content" && activeTab !== "events" && (
                  <div className="p-20 bg-surface-50 rounded-[3rem] border border-dashed border-surface-200 text-center">
                     <p className="text-surface-400 font-bold uppercase tracking-widest italic text-xs">Section under active development.</p>
                  </div>
               )}
            </div>
         </main>
      </div>
   );
}
