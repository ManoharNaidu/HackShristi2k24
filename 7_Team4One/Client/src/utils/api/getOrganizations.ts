import axiosInstance from "@/config/axios.config";
import { UserType } from "@/types/User.type";
import { AxiosError } from "axios";

const getOrganizations = async (): Promise<
  | {
      organizations: UserType[];
    }
  | undefined
> => {
  try {
    const response = await axiosInstance.get("/api/orgs");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
};

export default getOrganizations;
