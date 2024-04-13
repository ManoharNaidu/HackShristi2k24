export type UserRole = "user" | "org";

export interface UserType {
  id: string;
  email: string;
  role: UserRole[];
  first_name: string;
  last_name?: string | null;
  avatar: string;

  address: string;
  pincode: string;
  state: string;
  city: string;
  country: string;
  phone: string;
}

export interface UserContextType {
  user: UserType | null;
  admin: boolean;
  loading: boolean;
  login: (user: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  fetchUser: () => Promise<void>;
}
