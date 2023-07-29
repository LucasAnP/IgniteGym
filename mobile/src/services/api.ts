import axios from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: "http://192.168.100.69:3333",
  timeout: 6000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      // Message handled by backend
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      // Message not handled by backend
      return Promise.reject(error);
    }
  }
);

export { api };
