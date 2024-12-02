import axios from "axios";


export const publicRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})


export const userRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    // header: { token: `Bearer ${TOKEN}`}
})