import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// คุณสามารถเพิ่ม Interceptor เพื่อใส่ Auth Token ได้ที่นี่ในอนาคต
export default api;
