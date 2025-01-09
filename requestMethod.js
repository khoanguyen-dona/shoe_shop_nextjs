

import axios from "axios";


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const TOKEN = user && JSON.parse(user).currentUser?.accessToken


//requestMethod.js

export const publicRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})


export const userRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { token: `Bearer ${TOKEN}`}
})

