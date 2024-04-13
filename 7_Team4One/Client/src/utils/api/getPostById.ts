import axiosInstance from "@/config/axios.config";
import { PostType } from "@/types/Post.type";
import { AxiosError } from "axios";

const getPostById = async (
  id: string
): Promise<
  | {
      post: PostType;
      message: string;
      success: boolean;
    }
  | undefined
> => {
  try {
    const response = await axiosInstance.get(`/api/posts/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

export default getPostById;
