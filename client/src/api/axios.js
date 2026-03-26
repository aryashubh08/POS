import axios from "axios";

const api = axios.create({
  baseURL: "https://pos-server-phi.vercel.app",
  withCredentials: true,
});

export default api;
