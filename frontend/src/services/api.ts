const API_BASE_URL = "http://localhost:5001/api";

// Simple fetch wrapper with auth token
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  getProfile: async () => {
    return apiRequest("/auth/profile");
  },
};

// Quiz API
export const quizAPI = {
  getQuizzes: async () => {
    return apiRequest("/quizzes");
  },

  getQuizById: async (quizId: string) => {
    return apiRequest(`/quizzes/${quizId}`);
  },

  submitAttempt: async (quizId: string, answers: Record<string, unknown>) => {
    return apiRequest(`/quizzes/${quizId}/attempt`, {
      method: "POST",
      body: JSON.stringify({ answers }),
    });
  },

  getAttempts: async () => {
    return apiRequest("/quiz-attempts");
  },
};

// Announcement API
export const announcementAPI = {
  getAnnouncements: async () => {
    return apiRequest("/announcements");
  },

  getAnnouncementById: async (announcementId: string) => {
    return apiRequest(`/announcements/${announcementId}`);
  },
};
