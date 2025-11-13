// import axios from "axios";

// export const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("jwt");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);