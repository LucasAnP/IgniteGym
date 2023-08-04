import axios, { AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";
import { storageAuthGetToken } from "@storage/storageAuthToken";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.100.69:3333",
  timeout: 6000,
}) as APIInstanceProps;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthGetToken();

          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }
        }

        signOut();
      }

      // Validate is the error is handled
      if (requestError.response && requestError.response.data) {
        // Message handled by backend
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        // Message not handled by backend
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

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
