import axiosInstance from "@/config/axios.config";
import { PostType } from "@/types/Post.type";
import { AxiosError } from "axios";

const getPosts = async (): Promise<
  | {
      posts: PostType[];
      message: string;
      success: boolean;
    }
  | undefined
> => {
  try {
    const posts = await axiosInstance.get("/api/posts");
    return posts.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

export default getPosts;
