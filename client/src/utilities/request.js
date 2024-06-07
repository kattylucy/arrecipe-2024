import axios from "axios";

// Create an Axios instance with a default configuration
const api = axios.create({
  baseURL: "http://localhost:4000/api", // Update this with your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic request function
export const request = async (method, url, data, params, config) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.response || error.message);
    throw error;
  }
};

// GET request function
export const get = (url, params, config) => {
  return request("get", url, null, params, config);
};

// POST request function
export const post = (url, data, config) => {
  return request("post", url, data, null, config);
};

// PUT request function
export const put = (url, data, config) => {
  return request("put", url, data, null, config);
};

// DELETE request function
export const del = (url, params, config) => {
  return request("delete", url, null, params, config);
};
