const API_BASE_URL = import.meta.env.VITE_API_URL;

// Types
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: "student" | "admin";
  };
  token: string;
}

// Utility function for API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
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

  // Handle token expiration
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    role?: "student" | "admin";
  }): Promise<AuthResponse> => {
    return apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  login: async (data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    return apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// Quiz API
export const quizAPI = {
  getQuizzes: async () => {
    return apiRequest("/api/quizzes");
  },

  getQuizById: async (id: string) => {
    return apiRequest(`/api/quizzes/${id}`);
  },

  createQuiz: async (data: any) => {
    return apiRequest("/api/quizzes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateQuiz: async (id: string, data: any) => {
    return apiRequest(`/api/quizzes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteQuiz: async (id: string) => {
    return apiRequest(`/api/quizzes/${id}`, {
      method: "DELETE",
    });
  },
};

// Announcement API
export const announcementAPI = {
  getAnnouncements: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest("/api/announcements");
  },

  getAnnouncementById: async (id: string): Promise<ApiResponse<any>> => {
    return apiRequest(`/api/announcements/${id}`);
  },

  createAnnouncement: async (data: {
    title: string;
    content: string;
    instructor: string;
    instructorAvatar?: string;
  }): Promise<ApiResponse<any>> => {
    return apiRequest("/api/announcements", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateAnnouncement: async (
    id: string,
    data: any
  ): Promise<ApiResponse<any>> => {
    return apiRequest(`/api/announcements/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteAnnouncement: async (id: string) => {
    return apiRequest(`/api/announcements/${id}`, {
      method: "DELETE",
    });
  },
};
