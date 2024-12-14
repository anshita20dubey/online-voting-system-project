import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7777/api",
});

export default API;
