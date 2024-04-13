export interface PostType {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string | null;
  avatar: string | null;
  description: string;
  pictures: string[];
  post_type: "donation" | "post";
  created_at: string;
}
