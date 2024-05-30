import API from "../api"

export const signin = async (credentials) => {
    try {
        const res = await API.post("/signin", credentials, { withCredentials: true });
        console.log(res)
        return res.data;
    } catch (error) {
        console.log(error.response.data)
        return error.response.data;
    }
}

export const signup = async (credentials) => {
    try {
        const res = await API.post("/signup", credentials, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.log(error.response.data)
        return error.response.data;
    }
}

export const getProjects = async () => {
    try {
        const res = await API.get("/projects", { withCredentials: true });
        return res.data;
    } catch (error) {
        console.log(error.response.data)
        return error.response.data;
    }
}

export const createProject = async () => {
    try {
        const res = await API.post("/projects/new", { withCredentials: true });
        return res.data;
    } catch (error) {
        console.log(error.response.data)
        return error.response.data;
    }
}
