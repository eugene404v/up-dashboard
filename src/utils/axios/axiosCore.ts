import axios from "axios";

export const baseURL = process.env.REACT_APP_BACKEND_URL || "http://pstproject.ru:1337/api"

axios.defaults.baseURL = baseURL;

export const getCommonHeaders = () => ({
    "Authorization": `Token ${window.localStorage.token}`
})

export default axios;
