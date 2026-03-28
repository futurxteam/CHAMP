import { create } from "zustand";
import { currentUser } from "../data/users";

const useStore = create((set, get) => ({
  // Auth state
  isAuthenticated: false,
  user: null,

  login: (email, password) => {
    set({
      isAuthenticated: true,
      user: { ...currentUser },
    });
  },

  signup: (name, email, password) => {
    set({
      isAuthenticated: true,
      user: {
        ...currentUser,
        name,
        email,
        isPremium: false,
      },
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },

  // Premium
  upgradeToPremium: () => {
    set((state) => ({
      user: state.user ? { ...state.user, isPremium: true } : null,
    }));
  },

  // Bookmarks
  toggleBlogBookmark: (blogId) => {
    set((state) => {
      if (!state.user) return state;
      const saved = state.user.savedBlogs || [];
      const newSaved = saved.includes(blogId)
        ? saved.filter((id) => id !== blogId)
        : [...saved, blogId];
      return { user: { ...state.user, savedBlogs: newSaved } };
    });
  },

  toggleEventBookmark: (eventId) => {
    set((state) => {
      if (!state.user) return state;
      const saved = state.user.savedEvents || [];
      const newSaved = saved.includes(eventId)
        ? saved.filter((id) => id !== eventId)
        : [...saved, eventId];
      return { user: { ...state.user, savedEvents: newSaved } };
    });
  },

  // Likes
  likedBlogs: [],
  toggleBlogLike: (blogId) => {
    set((state) => {
      const liked = state.likedBlogs;
      const newLiked = liked.includes(blogId)
        ? liked.filter((id) => id !== blogId)
        : [...liked, blogId];
      return { likedBlogs: newLiked };
    });
  },

  // Event registrations
  registeredEvents: [],
  registerForEvent: (eventId) => {
    set((state) => ({
      registeredEvents: [...new Set([...state.registeredEvents, eventId])],
    }));
  },

  // Notifications
  notifications: [
    { id: 1, text: "Dr. James Carter connected with you", time: "2m ago", read: false },
    { id: 2, text: "New event: Global Digital Health Summit 2026", time: "1h ago", read: false },
    { id: 3, text: "Your blog post received 50 new likes", time: "3h ago", read: true },
  ],

  markNotificationRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },
}));

export default useStore;
