import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const photoConfig = {
  maxFileSize: 5 * 1024 * 1024,
  allowedFormats: ["jpg", "jpeg", "png", "webp"],
  validatePhoto: (file) => {
    if (!file) return { valid: false, error: "No file selected" };

    const ext = file.name?.split(".")?.pop()?.toLowerCase();
    if (!photoConfig.allowedFormats.includes(ext)) {
      return {
        valid: false,
        error: `Invalid format. Allowed: ${photoConfig.allowedFormats.join(", ")}`,
      };
    }

    if (file.size > photoConfig.maxFileSize) {
      return { valid: false, error: "File size should be less than 5MB" };
    }

    return { valid: true };
  },
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // Redirect to login page
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export const uploadPhoto = async (file) => {
  const validation = photoConfig.validatePhoto(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post("/auth/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default axiosInstance;
