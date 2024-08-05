import axios from "axios";

const baseURL = import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:5000";
let headers = {
    'Content-Type': 'application/json',
};

if (localStorage.token) {
    headers.Authorization = `Bearer ${localStorage.token}`;
}

const axiosClient = axios.create({
    baseURL: baseURL,
    headers,
});

export default axiosClient;