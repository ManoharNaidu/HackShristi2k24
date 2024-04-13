import axiosInstance from "@/config/axios.config";
import { PostType } from "@/types/Post.type";
import { AxiosError } from "axios";

const getDonationPosts = async (): Promise<
  | {
      posts: PostType[];
      message: string;
      success: boolean;
    }
  | undefined
> => {
  try {
    const posts = await axiosInstance.get("/api/posts/donations");
    return posts.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

export default getDonationPosts;
