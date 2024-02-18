/**
 * ApiClient Class
 *
 * Purpose:
 * Provides a centralized and reusable way to make HTTP requests to a specified base URL.
 * This class encapsulates Axios instance configuration, including setting up base URL,
 * default parameters like API keys, and initializing request and response interceptors for global handling.
 *
 * Features:
 * - Configurable for any API base URL and default query parameters such as an API key.
 * - Methods for standard HTTP requests: GET, POST, PUT, PATCH, DELETE.
 * - Interceptors for request and response can be customized for logging, error handling, or header manipulation.
 *
 * Usage:
 * Instantiate with a base URL and optionally an API key. Use the provided methods to make API requests.
 *
 * Example:
 * ```
 * const apiClient = new ApiClient({
 *   baseURL: 'https://api.example.com',
 *   apiKey: 'your_api_key_here',
 * });
 *
 * // To fetch resources
 * apiClient.get('/resources')
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 *
 * // To create a resource
 * apiClient.post('/resources', { name: 'New Resource' })
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 * ```
 *
 * Interceptors:
 * Customize by adding logic inside `initializeInterceptors` method. For example, adding Authorization headers,
 * logging requests and responses, or handling errors globally.
 *
 * Params Handling:
 * For methods that support body data (POST, PUT, PATCH), pass the data as the second argument.
 * For GET requests with query parameters, use the `config` argument with a `params` object.
 *
 * Error Handling:
 * Errors are caught and should be handled in the calling context. Interceptors can also be used for global error handling.
 *
 * Dependencies:
 * Axios for making HTTP requests. The class abstracts Axios configuration and usage patterns.
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiClientConfig {
    baseURL: string;
    apiKey: string;
}

class ApiClient {
    private readonly axiosInstance: AxiosInstance;
    private readonly apiKey: string;

    constructor(config: ApiClientConfig) {
        this.apiKey = config.apiKey;
        this.axiosInstance = axios.create({
            baseURL: config.baseURL,

            params: {
                key: this.apiKey,
            },
        });

        // Example of using interceptors for request and response
        this.initializeInterceptors();
    }

    private initializeInterceptors() {
        this.axiosInstance.interceptors.request.use((config) => {
            // Here, TypeScript should infer `config` as AxiosRequestConfig
            // Modify or log the request config here if needed
            return config;
        });

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    private async request<T>(method: 'get' | 'post' | 'put' | 'patch' | 'delete', endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        let response: AxiosResponse<T>;

        switch (method) {
            case 'get':
                response = await this.axiosInstance.get<T>(endpoint, { ...config, params: { ...config?.params, key: this.apiKey } });
                break;
            case 'post':
                response = await this.axiosInstance.post<T>(endpoint, data, { ...config, params: { ...config?.params, key: this.apiKey } });
                break;
            case 'put':
                response = await this.axiosInstance.put<T>(endpoint, data, { ...config, params: { ...config?.params, key: this.apiKey } });
                break;
            case 'patch':
                response = await this.axiosInstance.patch<T>(endpoint, data, { ...config, params: { ...config?.params, key: this.apiKey } });
                break;
            case 'delete':
                response = await this.axiosInstance.delete<T>(endpoint, { ...config, params: { ...config?.params, key: this.apiKey } });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        return response.data;
    }

    public get<T>(endpoint: string, config?: AxiosRequestConfig) {
        return this.request<T>('get', endpoint, undefined, config);
    }

    public post<T>(endpoint: string, data: any, config?: AxiosRequestConfig) {
        return this.request<T>('post', endpoint, data, config);
    }

}

const apiClient = new ApiClient({
    baseURL: 'https://api.rawg.io/api',
    apiKey: import.meta.env.VITE_API_KEY,
});

export default apiClient;



