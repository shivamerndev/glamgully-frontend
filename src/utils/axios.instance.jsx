import axios from "axios";

export const axiosProductInstance = axios.create({
    baseURL: import.meta.env.VITE_PRODUCT_BASE,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosAdminInstance = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_BASE,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})