import axios from "axios";
import Cookies from "js-cookie"

const token = Cookies.get("token");

const headers = {
    "Content-Type": "application/json",
    ...(token && { authorization: token })
}

const url = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: headers,
    withCredentials: true,
})

export default url;