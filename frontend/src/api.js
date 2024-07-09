import axios from "axios";
import Cookies from "js-cookie"

const token = Cookies.get("token");

const url = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
})

url.defaults.headers.common["Authorization"] = token;

url.interceptors.request.use(request => {
    console.log("Request -> ", request);
    return request;
}, err => {
    console.log(err);
})

url.interceptors.response.use(response => {
    console.log("Response -> ", response);
    return response;
}, err => {
    if (err.response.status === 401) {
        window.location.assign("/signin");
    }
    console.log(err);
})

export default url;



