import { AxiosError } from "axios";
import axiosInstance from "../../config/axios.config";

const createPost = async (
  data: FormData
): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> => {
  try {
    const response = await axiosInstance.post("/api/posts/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    switch ((error as AxiosError).response?.status) {
      case 400:
        // Handle 401 error
        throw (error as AxiosError<{ message: string }>).response?.data.message;
        break;
      case 401:
        // Handle 500 error
        console.error(error);
        break;
      default:
        console.error(error);
        break;
    }
  }
};

export default createPost;
