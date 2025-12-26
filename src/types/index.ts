export interface Course {
  id?: string;
  title: string;
  category: string;
  level: string;
  description: string;
  thumbnail: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}