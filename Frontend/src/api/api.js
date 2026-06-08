/* api.js - Frontend API Handler */

const API_URL = "http://localhost:5000/api";

const apiHandler = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {} } = options;

  const isFormData = body instanceof FormData;

  const config = {
    method,
    headers: { ...headers },
  };

  if (!isFormData) {
    config.headers["Content-Type"] = "application/json";
    if (body) config.body = JSON.stringify(body);
  } else {
    config.body = body;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
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

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  signup: (name, email, password, expertise = "", expertiseLevel = "", proofFile = null) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("expertise", expertise);
    formData.append("expertiseLevel", expertiseLevel);
    if (proofFile) formData.append("proof", proofFile);
    return apiHandler("/auth/signup", { method: "POST", body: formData });
  },

  login: (email, password) =>
    apiHandler("/auth/login", { method: "POST", body: { email, password } }),

  getProfile: (token) =>
    apiHandler("/auth/profile", { headers: { Authorization: `Bearer ${token}` } }),
};

// ─── Admin ───────────────────────────────────────────────────────────────────
export const adminApi = {
  // Contributor management
  getPendingContributors: (token) =>
    apiHandler("/admin/contributors/pending", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  approveContributor: (id, token) =>
    apiHandler(`/admin/contributors/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }),

  rejectContributor: (id, token) =>
    apiHandler(`/admin/contributors/${id}/reject`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }),

  promoteContributor: (id, token) =>
    apiHandler(`/admin/contributors/${id}/promote`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }),

  getAllUsers: (token, page = 1, limit = 10, filters = {}) => {
    const query = new URLSearchParams({ page, limit, ...filters }).toString();
    return apiHandler(`/admin/users?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateUserStatus: (id, status, token, role) =>
    apiHandler(`/admin/users/${id}/status`, {
      method: "PUT",
      body: { status, role },
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Content Management
  getPendingContent: (token) =>
    apiHandler("/admin/content/pending", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getAllContent: (token, status = "") => {
    const query = status ? `?status=${status}` : "";
    return apiHandler(`/admin/content/all${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

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

  deleteContent: (id, token) =>
    apiHandler(`/admin/content/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// ─── Content ─────────────────────────────────────────────────────────────────
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

  getPublishedContent: (token, filters = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v))
    ).toString();
    return apiHandler(`/content/published${query ? `?${query}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

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

// ─── Threads ─────────────────────────────────────────────────────────────────
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

// ─── Comments ────────────────────────────────────────────────────────────────
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

// ─── Events ──────────────────────────────────────────────────────────────────
export const eventApi = {
  getEvents: (token) =>
    apiHandler("/events", { headers: { Authorization: `Bearer ${token}` } }),

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

// ─── Certifications / Test ────────────────────────────────────────────────────
export const testApi = {
  getCertifications: (token) =>
    apiHandler("/test/certifications", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  startTest: (certId, token) =>
    apiHandler(`/test/${certId}/start`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  submitTest: (data, token) =>
    apiHandler("/test/submit", {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  getMyCertificates: (token) =>
    apiHandler("/test/my-certificates", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  verifyCertificate: (verificationId) =>
    apiHandler(`/test/certificate/${verificationId}`),
};

// ─── Admin – Certification Management ────────────────────────────────────────
export const adminCertApi = {
  createCertification: (data, token) =>
    apiHandler("/admin/certification/create", {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  addQuestion: (certId, data, token) =>
    apiHandler(`/admin/certification/${certId}/question`, {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  getQuestionsByCert: (certId, token) =>
    apiHandler(`/admin/certification/${certId}/questions`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteQuestion: (id, token) =>
    apiHandler(`/admin/question/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// ─── Domains ──────────────────────────────────────────────────────────────────
// Fetches the centralized medical domain taxonomy from the backend.
// Use this in every component that needs a domain dropdown.
export const domainApi = {
  getDomains: () => apiHandler("/domains"),
};

// ─── Courses ──────────────────────────────────────────────────────────────────
export const courseApi = {
  create: (data, token) =>
    apiHandler("/courses/create", {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  getMyCourses: (token) =>
    apiHandler("/courses/my", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getCatalog: (token, filters = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined && v !== ""))
    ).toString();
    return apiHandler(`/courses/catalog${query ? `?${query}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getAll: (token, filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    return apiHandler(`/courses?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getById: (id, token) =>
    apiHandler(`/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (id, data, token) =>
    apiHandler(`/courses/${id}`, {
      method: "PUT",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateBasicInfo: (id, data, token) =>
    apiHandler(`/courses/${id}/basic-info`, {
      method: "PUT",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  submitForReview: (id, token) =>
    apiHandler(`/courses/${id}/submit`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }),

  approve: (id, token) =>
    apiHandler(`/courses/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    }),

  reject: (id, reason, token) =>
    apiHandler(`/courses/${id}/reject`, {
      method: "PUT",
      body: { reason },
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// ─── Modules ──────────────────────────────────────────────────────────────────
export const moduleApi = {
  create: (data, token) =>
    apiHandler("/modules/create", {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  getByCourse: (courseId, token) =>
    apiHandler(`/modules/course/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (id, data, token) =>
    apiHandler(`/modules/${id}`, {
      method: "PUT",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  delete: (id, token) =>
    apiHandler(`/modules/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// ─── Lessons ──────────────────────────────────────────────────────────────────
export const lessonApi = {
  create: (data, token) =>
    apiHandler("/lessons/create", {
      method: "POST",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  getByModule: (moduleId, token) =>
    apiHandler(`/lessons/module/${moduleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (id, data, token) =>
    apiHandler(`/lessons/${id}`, {
      method: "PUT",
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    }),

  delete: (id, token) =>
    apiHandler(`/lessons/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};


export default apiHandler;
