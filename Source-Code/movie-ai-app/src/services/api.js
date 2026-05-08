import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.18:5000/api", // change if using mobile device (use IP)
});

export default api;