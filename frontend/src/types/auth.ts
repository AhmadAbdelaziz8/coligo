export interface User {
  _id: string
  name: string
  email: string
  role: 'student' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role?: 'student' | 'admin'
}

export interface AuthResponse {
  success: boolean
  message: string
  user: User
  token: string
} 