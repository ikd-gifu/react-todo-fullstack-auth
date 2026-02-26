export type UserType = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  token: string;
  user: UserType;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
