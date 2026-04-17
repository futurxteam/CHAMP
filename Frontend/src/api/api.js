/* api.js - Frontend API Handler */

const API_URL = "http://localhost:5000/api";

const apiHandler = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {} } = options;

  const isFormData = body instanceof FormData;

  const config = {
    method,
    headers: {
      ...headers,
    },
  };

  if (!isFormData) {
     config.headers["Content-Type"] = "application/json";
     if (body) config.body = JSON.stringify(body);
  } else {
     config.body = body;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // 🔥 read as text first (SAFE)
    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(text || "Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(data.message || "API error");
    }

    return data;

  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message);
    throw error;
  }
};

export const authApi = {
  login: (email, password) =>
    apiHandler("/auth/login", {
      method: "POST",
      body: { email, password },
    }),

  signup: (name, email, password) =>
    apiHandler("/auth/register", {
      method: "POST",
      body: { name, email, password },
    }),

  signupSpeaker: (speakerData) =>
    apiHandler("/auth/register-speaker", {
      method: "POST",
      body: speakerData,
    }),

  getProfile: (token) =>
    apiHandler("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const adminApi = {
  getPendingSpeakers: (token) =>
    apiHandler("/admin/speakers/pending", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  approveSpeaker: (id, token) =>
    apiHandler(`/admin/speakers/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }),

  rejectSpeaker: (id, token) =>
    apiHandler(`/admin/speakers/${id}/reject`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getAllUsers: (token, page = 1, limit = 10, filters = {}) => {
    const query = new URLSearchParams({ page, limit, ...filters }).toString();
    return apiHandler(`/admin/users?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateUserStatus: (id, status, token) =>
    apiHandler(`/admin/users/${id}/status`, {
      method: "PUT",
      body: { status },
      headers: { Authorization: `Bearer ${token}` },
    }),

  // 🔥 Content Management
  getPendingContent: (token) =>
    apiHandler("/admin/content/pending", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  approveContent: (id, token) =>
    apiHandler(`/admin/content/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }),

  rejectContent: (id, reason, token) =>
    apiHandler(`/admin/content/${id}/reject`, {
      method: "PUT",
      body: { reason },
      headers: { Authorization: `Bearer ${token}` },
    }),
};
export const contentApi = {
  createContent: (contentData, token) =>
    apiHandler("/content/create", {
      method: "POST",
      body: contentData,
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateContent: (id, contentData, token) =>
    apiHandler(`/content/${id}`, {
      method: "PUT",
      body: contentData,
      headers: { Authorization: `Bearer ${token}` },
    }),

  getMyContent: (token) =>
    apiHandler("/content/my-content", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPublishedContent: (token) =>
    apiHandler("/content/published", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getSaved: (token) =>
    apiHandler("/content/saved", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  toggleLike: (id, token) =>
    apiHandler(`/content/${id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),

  toggleSave: (id, token) =>
    apiHandler(`/content/${id}/save`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const threadApi = {
  create: (data, token) =>
    apiHandler("/thread", {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),
  getByContent: (contentId, token) =>
    apiHandler(`/thread/${contentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  toggleLike: (id, token) =>
    apiHandler(`/thread/${id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const commentApi = {
  create: (data, token) =>
    apiHandler("/comment", {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),
  getByThread: (threadId, token) =>
    apiHandler(`/comment/${threadId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  toggleLike: (id, token) =>
    apiHandler(`/comment/${id}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const eventApi = {
  getEvents: (token) =>
    apiHandler("/events", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  register: (id, token) =>
    apiHandler(`/events/${id}/register`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }),

  create: (data, token) =>
    apiHandler("/events", {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (id, data, token) =>
    apiHandler(`/events/${id}`, {
      method: "PUT",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  delete: (id, token) =>
    apiHandler(`/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getAllAdmin: (token) =>
    apiHandler("/events/admin/all", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default apiHandler;
