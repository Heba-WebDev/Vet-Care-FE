import axios from "axios";

export const ApiAxiosInterceptor = axios.create({
  baseURL: "http://localhost:5002",
});
