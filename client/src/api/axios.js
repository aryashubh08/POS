import axios from "axios";

const api = axios.create({
  baseURL: "https://pos-jbid.vercel.app",
  withCredentials: true,
});

export default api;
