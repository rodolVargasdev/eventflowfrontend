import { getEnvVariable } from "../helpers/getEnvVariables";
import axios from 'axios';

const {VITE_API_URL} = getEnvVariable()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

//Configurar interceptores
calendarApi.interceptors.request.use(config =>{
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default calendarApi;