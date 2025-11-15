import { apiClient } from './api';
import type { LoginCredentials, AuthResponse } from '@/types/api';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
    
    if (response.success && response.data) {
      this.setToken(response.data.token);
      this.setUser(response.data.user);
      return response.data;
    }
    
    throw new Error(response.error || 'Login failed');
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
      window.location.href = '/admin/login';
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  },

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  },

  getUser(): { email: string; name: string } | null {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(AUTH_USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  setUser(user: { email: string; name: string }): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};


