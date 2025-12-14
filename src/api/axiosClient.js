import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://6938e7e24618a71d77d19513.mockapi.io/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
