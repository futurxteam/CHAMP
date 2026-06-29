import React, { useState, useEffect, useRef } from "react";
import { communityApi } from "../api/api";

const COMMUNITIES = ["Medical", "Management", "Business", "General"];

const COMMUNITY_META = {
  General: { emoji: "💬", color: "bg-emerald-100 text-emerald-700 border-emerald-200", pill: "bg-emerald-500" },
  Medical: { emoji: "🏥", color: "bg-red-100 text-red-700 border-red-200", pill: "bg-red-500" },
  Management: { emoji: "📊", color: "bg-blue-100 text-blue-700 border-blue-200", pill: "bg-blue-500" },
  Business: { emoji: "💼", color: "bg-amber-100 text-amber-700 border-amber-200", pill: "bg-amber-500" },
};

const COMMUNITY_FLAIRS = {
  Medical: [
    "Case Discussion",
    "Clinical Question",
    "Research",
    "Guidelines",
    "Patient Safety",
    "Technology"
  ],
  Management: [
    "Leadership",
    "Operations",
    "Hospital Strategy",
    "Accreditation",
    "Digital Transformation"
  ],
  Business: [
    "Startup",
    "Investment",
    "Healthcare Economics",
    "Market Trends",
    "Innovation"
  ],
  General: [
    "Discussion",
    "Question",
    "Announcement",
    "Opinion",
    "Experience",
    "Resource"
  ]
};

const ROLE_BADGES = {
  admin: { label: "Admin", bg: "bg-red-100 text-red-700" },
  L3: { label: "Senior Contributor", bg: "bg-accent-100 text-accent-700" },
  L2: { label: "Contributor", bg: "bg-primary-100 text-primary-700" },
  L1: { label: "Member", bg: "bg-surface-100 text-surface-500" },
};

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const isVideoUrl = (url) => {
  if (!url) return false;
  const cleanUrl = url.split("?")[0].toLowerCase();
  return cleanUrl.endsWith(".mp4") || cleanUrl.endsWith(".mov") || cleanUrl.endsWith(".webm") || url.includes("/video/upload/");
};

const renderMedia = (url) => {
  if (!url) return null;
  if (isVideoUrl(url)) {
    return (
      <div className="my-4 rounded-2xl overflow-hidden border border-surface-100 bg-black max-w-full">
        <video src={url} controls className="w-full max-h-[400px] block" playsInline />
      </div>
    );
  }
  return (
    <div className="my-4 rounded-2xl overflow-hidden border border-surface-100 max-w-full bg-surface-50">
      <img src={url} alt="Uploaded media" className="w-full object-cover max-h-[500px]" />
    </div>
  );
};

// ─── Comment Tree ──────────────────────────────────────────────────────────────
function CommentTree({ comments, user, token, discussionId, onUpvote, onDelete, onReply, depth = 0 }) {
  const rootComments = comments.filter(c =>
    depth === 0 ? !c.parentComment : c.parentComment?._id === undefined
  );

  if (depth === 0) {
    const topLevel = comments.filter(c => !c.parentComment);
    return (
      <div className="space-y-4">
        {topLevel.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            replies={comments.filter(c => {
              const parent = c.parentComment?._id || c.parentComment;
              return parent && parent.toString() === comment._id.toString();
            })}
            allComments={comments}
            user={user}
            token={token}
            discussionId={discussionId}
            onUpvote={onUpvote}
            onDelete={onDelete}
            onReply={onReply}
          />
        ))}
      </div>
    );
  }
  return null;
}

function CommentItem({ comment, replies = [], allComments, user, token, discussionId, onUpvote, onDelete, onReply }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const myId = user?.id || user?._id;
  const isUpvoted = comment.upvotes?.some(id => (id._id || id)?.toString() === myId?.toString());
  const isAuthor = comment.author?._id?.toString() === myId?.toString();
  const isAdmin = user?.role === "admin";
  const roleMeta = ROLE_BADGES[comment.author?.role] || ROLE_BADGES.L1;

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      await onReply(comment._id, replyText.trim());
      setReplyText("");
      setReplyOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const nestedReplies = allComments.filter(c => {
    const parent = c.parentComment?._id || c.parentComment;
    return parent && parent.toString() === comment._id.toString();
  });

  return (
    <div className="group">
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-surface-100 flex items-center justify-center text-sm font-black text-surface-600 flex-shrink-0">
            {comment.author?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          {nestedReplies.length > 0 && (
            <div className="w-0.5 bg-surface-100 flex-1 mt-2" />
          )}
        </div>

        <div className="flex-1 pb-2">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-black text-surface-900">{comment.author?.name}</span>
            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${roleMeta.bg}`}>
              {roleMeta.label}
            </span>
            <span className="text-[10px] text-surface-400 font-medium">{timeAgo(comment.createdAt)}</span>
          </div>

          <p className="text-sm text-surface-700 leading-relaxed mb-2">{comment.content}</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onUpvote(comment._id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 ${
                isUpvoted 
                  ? "bg-primary-50 text-primary-600 border-primary-200" 
                  : "bg-surface-50 text-surface-400 border-surface-150 hover:bg-surface-100"
              }`}
            >
              ▲ Upvote · {comment.upvotes?.length || 0}
            </button>
            <button
              onClick={() => setReplyOpen(!replyOpen)}
              className="text-[10px] font-black uppercase tracking-widest text-surface-400 hover:text-surface-700 transition-colors"
            >
              Reply
            </button>
            {(isAuthor || isAdmin) && (
              <button
                onClick={() => onDelete(comment._id)}
                className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
              >
                Delete
              </button>
            )}
          </div>

          {replyOpen && (
            <div className="mt-3 flex gap-2 animate-in slide-in-from-top-2 duration-200">
              <input
                type="text"
                placeholder="Write a reply..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleReply()}
                className="flex-1 px-4 py-2 bg-surface-50 rounded-xl border border-surface-100 outline-none text-sm font-medium text-surface-900 focus:border-primary-200 transition-colors"
              />
              <button
                disabled={submitting || !replyText.trim()}
                onClick={handleReply}
                className="px-4 py-2 bg-primary-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50 hover:bg-primary-700 transition-colors"
              >
                {submitting ? "..." : "Post"}
              </button>
            </div>
          )}

          {nestedReplies.length > 0 && (
            <div className="mt-3 space-y-3 pl-2 border-l-2 border-surface-100">
              {nestedReplies.map(reply => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  replies={[]}
                  allComments={allComments}
                  user={user}
                  token={token}
                  discussionId={discussionId}
                  onUpvote={onUpvote}
                  onDelete={onDelete}
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Discussion Detail View ────────────────────────────────────────────────────
function DiscussionDetail({ discussion, comments, user, token, isAdmin, onBack, onUpvote, onDelete, onPin, onAddComment, onUpvoteComment, onDeleteComment }) {
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const myId = user?.id || user?._id;
  const isUpvoted = discussion.upvotes?.some(id => (id._id || id)?.toString() === myId?.toString());
  const isAuthor = discussion.author?._id?.toString() === myId?.toString();
  const communityMeta = COMMUNITY_META[discussion.community] || COMMUNITY_META.General;
  const roleMeta = ROLE_BADGES[discussion.author?.role] || ROLE_BADGES.L1;

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      await onAddComment(discussion._id, commentText.trim(), null);
      setCommentText("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId, text) => {
    await onAddComment(discussion._id, text, parentId);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-400 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-surface-400 hover:text-surface-900 transition-colors"
      >
        ← Back to Community
      </button>

      {/* Post card */}
      <div className="bg-white rounded-[2.5rem] border border-surface-100 shadow-sm overflow-hidden">
        <div className={`h-1.5 w-full ${communityMeta.pill}`} />

        <div className="p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {discussion.isPinned && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-black uppercase rounded tracking-widest border border-amber-200">
                    📌 Pinned
                  </span>
                )}
                <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full tracking-widest border ${communityMeta.color}`}>
                  {communityMeta.emoji} {discussion.community}
                </span>
                <span className="px-2 py-0.5 bg-surface-100 text-surface-700 text-[9px] font-black uppercase rounded-full tracking-widest border border-surface-200">
                  🏷️ {discussion.flair}
                </span>
              </div>
              <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter leading-tight">
                {discussion.title}
              </h2>
            </div>

            {(isAdmin || isAuthor) && (
              <div className="flex items-center gap-2 flex-shrink-0">
                {isAdmin && (
                  <button
                    onClick={() => onPin(discussion._id)}
                    className="px-3 py-1.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-100 transition-colors"
                  >
                    {discussion.isPinned ? "Unpin" : "Pin"}
                  </button>
                )}
                <button
                  onClick={() => onDelete(discussion._id)}
                  className="px-3 py-1.5 bg-red-50 text-red-500 border border-red-100 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-surface-50">
            <div className="w-10 h-10 rounded-full bg-surface-900 text-white flex items-center justify-center font-black text-sm">
              {discussion.author?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-surface-900">{discussion.author?.name}</span>
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${roleMeta.bg}`}>
                  {roleMeta.label}
                </span>
              </div>
              <span className="text-[10px] text-surface-400 font-medium">{timeAgo(discussion.createdAt)}</span>
            </div>
          </div>

          <p className="text-sm text-surface-700 leading-relaxed whitespace-pre-wrap mb-6">
            {discussion.body}
          </p>

          {renderMedia(discussion.mediaUrl)}

          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={() => onUpvote(discussion._id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                isUpvoted
                  ? "bg-primary-600 text-white border-primary-600 shadow-lg shadow-primary-500/30"
                  : "bg-white text-surface-500 border-surface-100 hover:border-primary-200"
              }`}
            >
              ▲ Upvote · {discussion.upvotes?.length || 0}
            </button>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">
              💬 {comments.length} {comments.length === 1 ? "Reply" : "Replies"}
            </span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">
              👁 {discussion.views || 0} Views
            </span>
          </div>
        </div>
      </div>

      {/* Comment compose */}
      <div className="bg-white rounded-[2rem] border border-surface-100 p-6">
        <p className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-3">
          Join the Discussion
        </p>
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-surface-900 text-white flex items-center justify-center font-black text-sm flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1">
            <textarea
              rows={3}
              placeholder="Share your perspective..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="w-full px-5 py-3 bg-surface-50 rounded-2xl border border-surface-100 outline-none text-sm font-medium text-surface-900 placeholder:text-surface-300 focus:border-primary-200 focus:bg-white transition-all resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmitComment}
                disabled={submitting || !commentText.trim()}
                className="px-6 py-2.5 bg-surface-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-600 transition-colors disabled:opacity-40 shadow-lg"
              >
                {submitting ? "Posting..." : "Post Reply"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="bg-white rounded-[2rem] border border-surface-100 p-6">
        <p className="text-[10px] font-black text-surface-300 uppercase tracking-widest mb-6">
          {comments.length} {comments.length === 1 ? "Reply" : "Replies"}
        </p>
        {comments.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-surface-400 font-medium text-sm">Be the first to reply to this discussion.</p>
          </div>
        ) : (
          <CommentTree
            comments={comments}
            user={user}
            token={token}
            discussionId={discussion._id}
            onUpvote={onUpvoteComment}
            onDelete={onDeleteComment}
            onReply={handleReply}
          />
        )}
      </div>
    </div>
  );
}

// ─── Discussion Card ──────────────────────────────────────────────────────────
function DiscussionCard({ discussion, user, token, onClick, onUpvote, isAdmin, onDelete, onPin }) {
  const myId = user?.id || user?._id;
  const isUpvoted = discussion.upvotes?.some(id => (id._id || id)?.toString() === myId?.toString());
  const isAuthor = discussion.author?._id?.toString() === myId?.toString();
  const communityMeta = COMMUNITY_META[discussion.community] || COMMUNITY_META.General;
  const roleMeta = ROLE_BADGES[discussion.author?.role] || ROLE_BADGES.L1;

  return (
    <div className="bg-white rounded-[2rem] border border-surface-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group overflow-hidden flex flex-col justify-between">
      <div>
        <div className={`h-1 w-full ${communityMeta.pill}`} />

        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-wrap gap-2">
              {discussion.isPinned && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-black uppercase rounded tracking-widest border border-amber-200 flex items-center gap-1">
                  📌 Pinned
                </span>
              )}
              <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase rounded-full tracking-widest border ${communityMeta.color}`}>
                {communityMeta.emoji} {discussion.community}
              </span>
              <span className="px-2 py-0.5 bg-surface-100 text-surface-700 text-[9px] font-black uppercase rounded-full tracking-widest border border-surface-200">
                🏷️ {discussion.flair}
              </span>
              {discussion.mediaUrl && (
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase rounded-full border border-indigo-150">
                  {isVideoUrl(discussion.mediaUrl) ? "🎥 Video" : "📷 Photo"}
                </span>
              )}
            </div>

            {(isAdmin || isAuthor) && (
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {isAdmin && (
                  <button
                    onClick={e => { e.stopPropagation(); onPin(discussion._id); }}
                    className="p-1.5 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors text-xs"
                    title="Pin/Unpin"
                  >
                    📌
                  </button>
                )}
                <button
                  onClick={e => { e.stopPropagation(); onDelete(discussion._id); }}
                  className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors text-xs"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onClick(discussion)}
            className="block text-left w-full"
          >
            <h3 className="text-base font-black text-surface-900 uppercase tracking-tighter line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors mb-2">
              {discussion.title}
            </h3>
            <p className="text-xs text-surface-500 font-medium leading-relaxed line-clamp-2 mb-4">
              {discussion.body}
            </p>
          </button>

          {discussion.mediaUrl && (
            <div className="mb-4">
              {renderMedia(discussion.mediaUrl)}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="flex items-center justify-between pt-4 border-t border-surface-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-surface-200 text-surface-600 flex items-center justify-center font-black text-xs">
              {discussion.author?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] font-black text-surface-700">{discussion.author?.name}</span>
              <span className={`ml-2 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full ${roleMeta.bg}`}>
                {roleMeta.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-surface-400 flex items-center gap-1">
              👁 {discussion.views || 0}
            </span>
            <button
              onClick={e => { e.stopPropagation(); onUpvote(discussion._id); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${
                isUpvoted
                  ? "bg-primary-50 text-primary-600 border-primary-200"
                  : "bg-surface-50 text-surface-500 border-surface-200 hover:bg-surface-100"
              }`}
            >
              ▲ Upvote · {discussion.upvotes?.length || 0}
            </button>
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-surface-400">
              💬 {discussion.commentsCount || 0}
            </span>
            <span className="text-[9px] text-surface-300 font-medium">{timeAgo(discussion.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main CommunityDiscussions Component ─────────────────────────────────────
export default function CommunityDiscussions({ user, token }) {
  const [discussions, setDiscussions] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCommunity, setActiveCommunity] = useState(""); // "" = all
  const [activeSort, setActiveSort] = useState("new");
  const [viewingDiscussion, setViewingDiscussion] = useState(null);
  const [discussionComments, setDiscussionComments] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const isAdmin = user?.role === "admin";

  // Create form state
  const [form, setForm] = useState({
    title: "",
    body: "",
    community: "General",
    flair: "Discussion",
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaError, setMediaError] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      const data = await communityApi.getDiscussions(token, activeCommunity, activeSort);
      setDiscussions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrending = async () => {
    try {
      const data = await communityApi.getTrending(token);
      setTrending(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [activeCommunity, activeSort]);

  useEffect(() => {
    fetchTrending();
  }, [discussions]);

  const openDiscussion = async (d) => {
    setViewingDiscussion(d);
    setDetailLoading(true);
    try {
      const data = await communityApi.getById(d._id, token);
      setViewingDiscussion(data.discussion);
      setDiscussionComments(data.comments);
      
      // Update local view counts of the discussion in states so it's fresh
      setDiscussions(prev => prev.map(item => item._id === d._id ? { ...item, views: (item.views || 0) + 1 } : item));
    } catch (err) {
      console.error(err);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleUpvote = async (id) => {
    try {
      const res = await communityApi.upvote(id, token);
      const myId = user?.id || user?._id;
      setDiscussions(prev =>
        prev.map(d => {
          if (d._id !== id) return d;
          const upvotes = res.isUpvoted
            ? [...d.upvotes, myId]
            : d.upvotes.filter(uid => (uid._id || uid)?.toString() !== myId?.toString());
          return { ...d, upvotes };
        })
      );
      if (viewingDiscussion?._id === id) {
        setViewingDiscussion(prev => {
          const upvotes = res.isUpvoted
            ? [...(prev.upvotes || []), myId]
            : (prev.upvotes || []).filter(uid => (uid._id || uid)?.toString() !== myId?.toString());
          return { ...prev, upvotes };
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this discussion from the community?")) return;
    try {
      await communityApi.deleteDiscussion(id, token);
      setDiscussions(prev => prev.filter(d => d._id !== id));
      if (viewingDiscussion?._id === id) setViewingDiscussion(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePin = async (id) => {
    try {
      const res = await communityApi.pin(id, token);
      setDiscussions(prev =>
        prev.map(d => d._id === id ? { ...d, isPinned: res.isPinned } : d)
      );
      if (viewingDiscussion?._id === id) {
        setViewingDiscussion(prev => ({ ...prev, isPinned: res.isPinned }));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddComment = async (discussionId, content, parentId) => {
    try {
      const comment = await communityApi.addComment(
        discussionId,
        { content, parentComment: parentId || undefined },
        token
      );
      setDiscussionComments(prev => [...prev, comment]);
      setDiscussions(prev =>
        prev.map(d =>
          d._id === discussionId
            ? { ...d, commentsCount: (d.commentsCount || 0) + 1 }
            : d
        )
      );
      if (viewingDiscussion?._id === discussionId) {
        setViewingDiscussion(prev => ({
          ...prev,
          commentsCount: (prev.commentsCount || 0) + 1,
        }));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpvoteComment = async (commentId) => {
    if (!viewingDiscussion) return;
    try {
      const res = await communityApi.upvoteComment(viewingDiscussion._id, commentId, token);
      const myId = user?.id || user?._id;
      setDiscussionComments(prev =>
        prev.map(c => {
          if (c._id !== commentId) return c;
          const upvotes = res.isUpvoted
            ? [...(c.upvotes || []), myId]
            : (c.upvotes || []).filter(uid => (uid._id || uid)?.toString() !== myId?.toString());
          return { ...c, upvotes };
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!viewingDiscussion) return;
    if (!window.confirm("Remove this reply?")) return;
    try {
      await communityApi.deleteComment(viewingDiscussion._id, commentId, token);
      setDiscussionComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    setMediaError("");
    setMediaPreview("");
    setMediaFile(null);

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      setMediaError("Unsupported file format. Please upload an image or a video.");
      return;
    }

    if (isImage) {
      if (file.size > 5 * 1024 * 1024) {
        setMediaError("Images must be smaller than 5 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (isVideo) {
      if (file.size > 50 * 1024 * 1024) {
        setMediaError("Videos must be smaller than 50 MB.");
        return;
      }
      setMediaPreview(URL.createObjectURL(file));
    }

    setMediaFile(file);
  };

  const handleCommunityChange = (c) => {
    setForm(prev => ({
      ...prev,
      community: c,
      flair: COMMUNITY_FLAIRS[c][0],
    }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    if (form.title.trim().length > 150) {
      alert("Title cannot exceed 150 characters.");
      return;
    }
    if (form.body.trim().length > 5000) {
      alert("Body cannot exceed 5000 characters.");
      return;
    }

    setFormSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", form.title.trim());
      data.append("body", form.body.trim());
      data.append("community", form.community);
      data.append("flair", form.flair);
      if (mediaFile) {
        data.append("mediaFile", mediaFile);
      }

      const newDiscussion = await communityApi.create(data, token);
      setDiscussions(prev => [newDiscussion, ...prev]);
      setForm({ title: "", body: "", community: "General", flair: "Discussion" });
      setMediaFile(null);
      setMediaPreview("");
      setShowCreateForm(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const sortedDiscussions = [...discussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Header controls ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-surface-900 uppercase tracking-tighter">
            Community Hub
          </h2>
          <p className="text-[10px] font-bold text-surface-400 uppercase tracking-widest mt-0.5">
            Healthcare Professionals Network
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setForm({ title: "", body: "", community: "General", flair: "Discussion" });
            setMediaFile(null);
            setMediaPreview("");
            setMediaError("");
          }}
          className="px-6 py-3 bg-surface-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-primary-600 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          {showCreateForm ? "✕ Cancel" : "+ New Discussion"}
        </button>
      </div>

      {/* ── Trending Discussions ── */}
      {!viewingDiscussion && trending.length > 0 && (
        <div className="bg-surface-900 text-white rounded-[2rem] p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-primary-400">
              Trending Discussions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {trending.map((t, idx) => (
              <button
                key={t._id}
                onClick={() => openDiscussion(t)}
                className="bg-white/10 hover:bg-white/20 transition-all text-left p-4 rounded-2xl flex flex-col justify-between group border border-white/5"
              >
                <div>
                  <div className="flex justify-between items-center text-[9px] font-bold text-white/50 mb-1">
                    <span>#{idx + 1} · {t.community}</span>
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-tighter line-clamp-2 leading-snug group-hover:text-primary-300 transition-colors">
                    {t.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2.5 mt-3 text-[9px] font-black text-white/70">
                  <span>▲ {t.upvotes?.length || 0}</span>
                  <span>💬 {t.commentsCount || 0}</span>
                  <span>👁 {t.views || 0}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Create post form ── */}
      {showCreateForm && (
        <form
          onSubmit={handleCreatePost}
          className="bg-white rounded-[2.5rem] border border-surface-100 shadow-2xl p-8 space-y-5 animate-in zoom-in-95 slide-in-from-top-4 duration-300"
        >
          <h3 className="text-sm font-black text-primary-600 uppercase tracking-widest">Start a New Discussion</h3>

          {/* Community selector */}
          <div>
            <label className="block text-[10px] font-black uppercase text-surface-300 tracking-widest mb-2">Community *</label>
            <div className="flex gap-3 flex-wrap">
              {COMMUNITIES.map(c => {
                const meta = COMMUNITY_META[c];
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCommunityChange(c)}
                    className={`px-5 py-2.5 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                      form.community === c
                        ? `${meta.pill} text-white border-transparent shadow-lg`
                        : `bg-white ${meta.color} border-current`
                    }`}
                  >
                    {meta.emoji} {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Flair selector */}
          <div>
            <label className="block text-[10px] font-black uppercase text-surface-300 tracking-widest mb-2">Flair *</label>
            <select
              value={form.flair}
              onChange={e => setForm({ ...form, flair: e.target.value })}
              className="w-full px-5 py-3 bg-surface-50 rounded-2xl border border-surface-100 outline-none font-bold text-surface-900 focus:border-primary-200 focus:bg-white transition-all appearance-none"
            >
              {COMMUNITY_FLAIRS[form.community]?.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Title with Character Counter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-black uppercase text-surface-300 tracking-widest">Discussion Title *</label>
              <span className="text-[10px] font-black text-surface-400">{form.title.length} / 150</span>
            </div>
            <input
              required
              type="text"
              maxLength={150}
              placeholder="What's the core question or insight you want to share?"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-5 py-3 bg-surface-50 rounded-2xl border border-surface-100 outline-none font-bold text-surface-900 placeholder:text-surface-300 focus:border-primary-200 focus:bg-white transition-all"
            />
          </div>

          {/* Body with Character Counter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-black uppercase text-surface-300 tracking-widest">Body *</label>
              <span className="text-[10px] font-black text-surface-400">{form.body.length} / 5000</span>
            </div>
            <textarea
              required
              rows={5}
              maxLength={5000}
              placeholder="Expand your thoughts, provide context, or describe a case study..."
              value={form.body}
              onChange={e => setForm({ ...form, body: e.target.value })}
              className="w-full px-5 py-4 bg-surface-50 rounded-2xl border border-surface-100 outline-none font-medium text-surface-900 placeholder:text-surface-300 focus:border-primary-200 focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Drag and drop Media upload */}
          <div>
            <label className="block text-[10px] font-black uppercase text-surface-300 tracking-widest mb-2">Media Upload</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
              className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
                isDragging ? "border-primary-500 bg-primary-50/50" : "border-surface-250 hover:border-primary-300 bg-surface-50"
              }`}
              onClick={() => document.getElementById("mediaFileInput").click()}
            >
              <input
                id="mediaFileInput"
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={e => handleFile(e.target.files[0])}
              />
              <div className="space-y-2">
                <div className="text-3xl">📁</div>
                <div className="text-xs font-black uppercase tracking-widest text-surface-600">
                  Drag and Drop or Click to Upload
                </div>
                <div className="text-[10px] text-surface-400 font-medium">
                  Images (PNG, JPG, WEBP) up to 5MB · Videos (MP4, MOV, WEBM) up to 50MB
                </div>
              </div>
            </div>
            {mediaError && (
              <p className="mt-2 text-xs font-black text-red-500 uppercase tracking-wider">{mediaError}</p>
            )}
            {mediaFile && (
              <div className="mt-3 flex items-center justify-between p-3 bg-surface-50 border border-surface-100 rounded-2xl">
                <span className="text-xs font-bold text-surface-600 truncate max-w-xs">{mediaFile.name}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setMediaFile(null); setMediaPreview(""); }}
                  className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Live Preview Card */}
          <div className="pt-6 border-t border-surface-100">
            <h4 className="text-[10px] font-black uppercase text-surface-300 tracking-widest mb-3">Live Preview</h4>
            <div className="bg-white rounded-[2rem] border border-surface-150 p-6 opacity-85 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2.5 py-0.5 text-[9px] font-black uppercase rounded-full tracking-widest border ${COMMUNITY_META[form.community]?.color}`}>
                  {COMMUNITY_META[form.community]?.emoji} {form.community}
                </span>
                <span className="px-2 py-0.5 bg-surface-100 text-surface-700 text-[9px] font-black uppercase rounded-full tracking-widest border border-surface-200">
                  🏷️ {form.flair}
                </span>
              </div>
              <h3 className="text-base font-black text-surface-900 uppercase tracking-tighter line-clamp-2 leading-snug mb-2">
                {form.title || "Your Discussion Title Here"}
              </h3>
              <p className="text-xs text-surface-500 font-medium leading-relaxed whitespace-pre-wrap mb-4">
                {form.body || "Your discussion content will appear here..."}
              </p>
              {mediaPreview && (
                <div className="mb-4 max-w-md rounded-2xl overflow-hidden border border-surface-150">
                  {mediaFile?.type?.startsWith("video/") ? (
                    <video src={mediaPreview} controls className="w-full max-h-[250px]" />
                  ) : (
                    <img src={mediaPreview} alt="Preview" className="w-full object-cover max-h-[250px]" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Submit/Discard */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={formSubmitting || !form.title.trim() || !form.body.trim()}
              className="flex-1 py-4 bg-surface-900 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] hover:bg-primary-600 transition-all shadow-xl disabled:opacity-40"
            >
              {formSubmitting ? "Publishing..." : "Publish Discussion"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCreateForm(false);
                setMediaFile(null);
                setMediaPreview("");
              }}
              className="px-8 py-4 border-2 border-surface-100 text-surface-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-surface-50 transition-all"
            >
              Discard
            </button>
          </div>
        </form>
      )}

      {/* ── If viewing a single discussion ── */}
      {viewingDiscussion && !detailLoading ? (
        <DiscussionDetail
          discussion={viewingDiscussion}
          comments={discussionComments}
          user={user}
          token={token}
          isAdmin={isAdmin}
          onBack={() => setViewingDiscussion(null)}
          onUpvote={handleUpvote}
          onDelete={handleDelete}
          onPin={handlePin}
          onAddComment={handleAddComment}
          onUpvoteComment={handleUpvoteComment}
          onDeleteComment={handleDeleteComment}
        />
      ) : detailLoading ? (
        <div className="flex justify-center p-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
        </div>
      ) : (
        <>
          {/* ── Filter row ── */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveCommunity("")}
                className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  activeCommunity === ""
                    ? "bg-surface-900 text-white border-transparent shadow"
                    : "bg-white text-surface-400 border-surface-100 hover:border-surface-300"
                }`}
              >
                🌐 All
              </button>
              {COMMUNITIES.map(c => {
                const meta = COMMUNITY_META[c];
                return (
                  <button
                    key={c}
                    onClick={() => setActiveCommunity(c === activeCommunity ? "" : c)}
                    className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                      activeCommunity === c
                        ? `${meta.pill} text-white border-transparent shadow-lg`
                        : `bg-white ${meta.color} hover:shadow-sm`
                    }`}
                  >
                    {meta.emoji} {c}
                  </button>
                );
              })}
            </div>

            {/* Sort selector */}
            <div className="flex gap-2 ml-auto">
              {[
                { key: "new", label: "🕐 New" },
                { key: "top", label: "🔥 Top" },
              ].map(s => (
                <button
                  key={s.key}
                  onClick={() => setActiveSort(s.key)}
                  className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeSort === s.key
                      ? "bg-surface-900 text-white shadow"
                      : "bg-white text-surface-400 border border-surface-100 hover:border-surface-300"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Discussion list ── */}
          {loading ? (
            <div className="flex justify-center p-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600" />
            </div>
          ) : sortedDiscussions.length === 0 ? (
            <div className="p-16 bg-surface-50 rounded-[3rem] border-2 border-dashed border-surface-200 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-black text-surface-400 uppercase tracking-widest mb-2">
                Be the first healthcare professional to start a discussion.
              </h3>
              <p className="text-sm text-surface-400 font-medium max-w-xs mx-auto mb-6">
                Share insights, questions, cases or strategies with the CHAMP community.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-8 py-3 bg-surface-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all hover:bg-primary-600"
              >
                Create Discussion
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {sortedDiscussions.map(d => (
                <DiscussionCard
                  key={d._id}
                  discussion={d}
                  user={user}
                  token={token}
                  onClick={openDiscussion}
                  onUpvote={handleUpvote}
                  isAdmin={isAdmin}
                  onDelete={handleDelete}
                  onPin={handlePin}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
