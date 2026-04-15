import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = "http://localhost:5000/api";

const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
      loading: false,

      // Authentication actions
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Login failed");
          }

          set({
            isAuthenticated: true,
            user: data.user,
            token: data.token,
            loading: false,
          });
          return true;
        } catch (error) {
          set({ error: error.message, loading: false });
          return false;
        }
      },

      signup: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || "Registration failed");
          }

          set({
            isAuthenticated: true,
            user: data.user,
            token: data.token,
            loading: false,
          });
          return true;
        } catch (error) {
          set({ error: error.message, loading: false });
          return false;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          error: null,
        });
      },

      // Membership status
      upgradeToPremium: () => {
        set((state) => ({
          user: state.user ? { ...state.user, isPremium: true } : null,
        }));
      },

      // Interaction helpers
      getAuthHeaders: () => {
        const token = get().token;
        return token ? { Authorization: `Bearer ${token}` } : {};
      },

      // Bookmarks & Likes (Sync with user profile if needed)
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

      registeredEvents: [],
      registerForEvent: (eventId) => {
        set((state) => ({
          registeredEvents: [...new Set([...state.registeredEvents, eventId])],
        }));
      },

      toggleBlogBookmark: (blogId) => {
        set((state) => {
          if (!state.user) return state;
          const savedBlogs = state.user.savedBlogs || [];
          const isSaved = savedBlogs.includes(blogId);
          const newSaved = isSaved
            ? savedBlogs.filter((id) => id !== blogId)
            : [...savedBlogs, blogId];
          
          return {
            user: { ...state.user, savedBlogs: newSaved }
          };
        });
      },

      toggleEventBookmark: (eventId) => {
        set((state) => {
          if (!state.user) return state;
          const savedEvents = state.user.savedEvents || [];
          const isSaved = savedEvents.includes(eventId);
          const newSaved = isSaved
            ? savedEvents.filter((id) => id !== eventId)
            : [...savedEvents, eventId];
          
          return {
            user: { ...state.user, savedEvents: newSaved }
          };
        });
      },
      
      // Notifications (Static for now)
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
    }),
    {
      name: "champ-auth-storage", // Key for localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);

export default useStore;
