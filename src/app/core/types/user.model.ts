export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  role?: "admin" | "user"
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpData {
  name: string
  email: string
  password: string
  confirmPassword: string
}
