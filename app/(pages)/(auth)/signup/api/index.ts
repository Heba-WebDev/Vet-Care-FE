import axios from "axios";
import { ApiAxiosInterceptor } from "@/app/config/axios";
import { CustomError } from "@/app/utils/CustomError";
import { ISignUp } from "../interfaces";

export const registerStaffApi = async (data: ISignUp) => {
  try {
    const response = await ApiAxiosInterceptor.post("/api/v1/staff/register", data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error?.response) {
      throw new CustomError(error.response);
    } else {
      throw error;
    }
  }
};


export const registerVetApi = async (data: ISignUp) => {
  try {
    const response = await ApiAxiosInterceptor.post("/api/v1/vets/register", data);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new CustomError(response);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error?.response) {
      throw new CustomError(error.response);
    } else {
      throw error;
    }
  }
};

