import { capitalize, isArray } from "lodash";
import axios from "axios";
import toast from "react-hot-toast";
// import { logout } from "../services";

const token = localStorage.getItem("anafiya_userInfo")
  ? JSON.parse(localStorage.getItem("anafiya_userInfo")).token
  : "";

const api = axios.create({
  baseURL: process.env["REACT_APP_SERVER_URL"],
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // if (response.data.message) toast.success(response.data.message)
    return response.data;
  },
  async (error) => {
    if (error.response.data.message) {
      if (isArray(error.response.data.message)) {
        error.response.data.message.forEach((message) =>
          toast.error(capitalize(message))
        );
      }
    }
    if (error.response.status === 401 || error.response.status === 403) {
      //   await logout();
      // window.location.reload()
    }

    return Promise.reject(error);
  }
);

export { api };
