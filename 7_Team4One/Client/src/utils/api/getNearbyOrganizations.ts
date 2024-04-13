import axiosInstance from "@/config/axios.config";
import { UserType } from "@/types/User.type";
import { AxiosError } from "axios";

const getNearbyOrganizations = async (location: {
  lat: number;
  lng: number;
}): Promise<
  | {
      organizations: UserType[];
    }
  | undefined
> => {
  try {
    const response = await axiosInstance.request({
      url: "/api/orgs/nearby",
      method: "GET",
      params: location,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
};

export default getNearbyOrganizations;
