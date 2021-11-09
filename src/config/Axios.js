import axios from "axios"
const AxiosConfig = () => {
    const Token = localStorage.getItem('auth_token');
    axios.defaults.baseURL = "http://localhost:8000/";
    axios.defaults.headers.post["Accept"] = "application/json";
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios.defaults.withCredentials = true;
    axios.interceptors.request.use((config) => {
        config.headers.Authorization = Token ? `Bearer ${Token}` : '';
        return config;
    })
}
export default AxiosConfig;