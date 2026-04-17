import React, { useState, useEffect } from "react";
import { threadApi, commentApi } from "../api/api";

export default function DiscussionSection({ contentId, token, user }) {
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [newThread, setNewThread] = useState({ title: "", message: "" });
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null); // ID of comment being replied to
  const [loading, setLoading] = useState(false);

  const fetchThreads = async () => {
    try {
      const data = await threadApi.getByContent(contentId, token);
      setThreads(data);
    } catch (err) { console.error(err); }
  };

  const fetchComments = async (threadId) => {
    try {
      const data = await commentApi.getByThread(threadId, token);
      setComments(data);
    } catch (err) { console.error(err); }
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    try {
      await threadApi.create({ contentId, ...newThread }, token);
      setNewThread({ title: "", message: "" });
      fetchThreads();
    } catch (err) { alert(err.message); }
  };

  const handleCreateComment = async (threadId, parentComment = null) => {
    try {
      await commentApi.create({ threadId, message: newComment, parentComment }, token);
      setNewComment("");
      setReplyTo(null);
      fetchComments(threadId);
    } catch (err) { alert(err.message); }
  };

  useEffect(() => {
    fetchThreads();
  }, [contentId]);

  return (
    <div className="mt-12 pt-12 border-t border-surface-100 space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-surface-900 uppercase tracking-tighter">Peer Discussion</h3>
        <span className="text-[10px] font-black text-primary-600 uppercase bg-primary-50 px-3 py-1 rounded-full">{threads.length} Threads</span>
      </div>

      {/* Create Thread Form */}
      <form onSubmit={handleCreateThread} className="p-8 bg-surface-50 rounded-[2rem] space-y-4">
        <input 
          type="text" 
          placeholder="Discussion Topic..." 
          className="w-full px-6 py-3 rounded-xl border-none outline-none font-bold text-surface-900"
          value={newThread.title}
          onChange={(e) => setNewThread({...newThread, title: e.target.value})}
          required
        />
        <textarea 
          placeholder="Share your perspective or ask a question..." 
          className="w-full px-6 py-4 rounded-xl border-none outline-none font-medium text-surface-600 min-h-[100px]"
          value={newThread.message}
          onChange={(e) => setNewThread({...newThread, message: e.target.value})}
          required
        />
        <button type="submit" className="px-8 py-3 bg-surface-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Post Thread</button>
      </form>

      {/* Threads List */}
      <div className="space-y-6">
        {threads.map(thread => (
          <div key={thread._id} className="p-8 bg-white border border-surface-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h4 className="text-lg font-black text-surface-900 uppercase">{thread.title}</h4>
                  <p className="text-xs text-surface-400 font-bold mt-1 uppercase tracking-widest">Started by {thread.user?.name}</p>
               </div>
               <button 
                  onClick={() => {
                    if (activeThread === thread._id) setActiveThread(null);
                    else {
                      setActiveThread(thread._id);
                      fetchComments(thread._id);
                    }
                  }}
                  className="px-4 py-2 bg-surface-50 text-surface-600 rounded-xl text-[10px] font-black uppercase"
               >
                  {activeThread === thread._id ? "Hide Replies" : `View ${thread.commentCount || 0} Replies`}
               </button>
            </div>
            <p className="text-sm text-surface-600 leading-relaxed font-medium mb-6">{thread.message}</p>

            {activeThread === thread._id && (
              <div className="pt-6 border-t border-surface-50 space-y-6">
                {/* Comments List */}
                <div className="space-y-4 ml-8">
                  {comments.filter(c => !c.parentComment).map(comment => (
                    <div key={comment._id} className="space-y-4">
                       <div className="p-4 bg-surface-50 rounded-2xl border-l-4 border-primary-200">
                         <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] font-black text-surface-900 uppercase tracking-widest">{comment.user?.name}</span>
                           <span className="text-[9px] text-surface-400 font-bold">{new Date(comment.createdAt).toLocaleDateString()}</span>
                         </div>
                         <p className="text-sm text-surface-600 font-medium mb-3">{comment.message}</p>
                         <button 
                            onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
                            className="text-[9px] font-black text-primary-600 uppercase tracking-widest hover:underline"
                         >
                            {replyTo === comment._id ? "Cancel Reply" : "Reply to Comment"}
                         </button>
                       </div>

                       {/* Subthreads */}
                       <div className="ml-8 space-y-3">
                          {comments.filter(sub => sub.parentComment === comment._id).map(sub => (
                             <div key={sub._id} className="p-3 bg-white border border-surface-100 rounded-xl border-l-2 border-primary-400">
                                <div className="flex justify-between items-center mb-1">
                                   <span className="text-[9px] font-black text-surface-600 uppercase">{sub.user?.name}</span>
                                </div>
                                <p className="text-xs text-surface-500 font-medium">{sub.message}</p>
                             </div>
                          ))}
                       </div>

                       {/* Reply Input for this specific comment */}
                       {replyTo === comment._id && (
                          <div className="ml-8 flex gap-3 animate-in slide-in-from-top-2 duration-300">
                             <input 
                               type="text" 
                               placeholder={`Replying to ${comment.user?.name}...`} 
                               className="flex-1 px-4 py-2 rounded-lg bg-surface-50 border-none outline-none text-xs"
                               value={newComment}
                               onChange={(e) => setNewComment(e.target.value)}
                               autoFocus
                             />
                             <button 
                               onClick={() => handleCreateComment(thread._id, comment._id)}
                               className="px-4 py-2 bg-primary-600 text-white rounded-lg text-[9px] font-black uppercase"
                             >
                               Send
                             </button>
                          </div>
                       )}
                    </div>
                  ))}
                </div>

                {/* Primary Reply Input (no parent) */}
                {!replyTo && (
                  <div className="flex gap-4 border-t border-surface-50 pt-6">
                    <input 
                      type="text" 
                      placeholder="Share your perspective..." 
                      className="flex-1 px-6 py-3 rounded-xl bg-surface-50 border-none outline-none text-sm"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button 
                      onClick={() => handleCreateComment(thread._id)}
                      className="px-6 py-3 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
