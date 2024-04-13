export interface PersonalDetailsType {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string[];
  address: string;
  pincode: string;
  state: string;
  city: string;
  country: string;
  phone: string;
  avatar: string | null;
  location?: {
    lat: number;
    lng: number;
  };
}
