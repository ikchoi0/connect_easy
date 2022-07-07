import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  timeout: 1000,
});

export const getCategory = async () => {
  try {
    return await apiClient.get("/category");
  } catch (exception) {
    return {
      error: true,
      message: exception.response.data,
    };
  }
};
