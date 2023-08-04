import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";
import {
  storageAuthGetToken,
  storageAuthSaveToken,
} from "@storage/storageAuthToken";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.100.69:3333",
  timeout: 6000,
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

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

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }
          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              // Looking for the token

              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token,
              });
              await storageAuthSaveToken({
                token: data.token,
                refresh_token: data.refresh_token,
              });
              console.log(data);
            } catch (error: any) {
              // deny the requests
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });

              // sign out the user
              signOut();

              // give back the error
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
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
