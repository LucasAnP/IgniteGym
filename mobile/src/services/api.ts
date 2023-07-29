import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.69:3333",
});

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
