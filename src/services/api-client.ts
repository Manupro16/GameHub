import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const ApiClient = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: apiKey,
    }
})

export default ApiClient;

