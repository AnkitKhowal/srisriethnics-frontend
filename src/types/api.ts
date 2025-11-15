export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  items: T[];
  lastKey?: string;
  count: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export interface PresignedUrlRequest {
  fileName: string;
  fileType: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  uploadFields?: Record<string, string>;
  fileUrl: string;
  key: string;
}


