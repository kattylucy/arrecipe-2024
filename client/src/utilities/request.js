import axios from "axios";

const apiKey = "c5b5d0cdbae149eb91f50bc0a2647626";

const edamamApi = axios.create({
  baseURL: "https://api.spoonacular.com/recipes/",
  headers: {
    "Content-type": "application/json",
  },
});

export const request = async (method, url, data, config) => {
  try {
    const response = await edamamApi({
      method,
      url: `${url}&apiKey=${apiKey}`,
      params: {
        ...data,
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
