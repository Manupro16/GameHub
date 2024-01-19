/**
 * API Client Configuration
 *
 * Purpose:
 * Sets up an Axios client specifically configured for making requests to the RAWG Video Games Database API.
 *
 * Usage:
 * This configured client is used across the application to make API requests, ensuring consistent configuration
 * and the inclusion of necessary parameters like the API key.
 *
 * Configuration Details:
 * - baseURL: The base URL for all requests made using this client, pointing to the RAWG API.
 * - params: Default parameters included in every request. In this case, the API key is included.
 *
 * API Key:
 * The API key is sourced from environment variables (VITE_API_KEY) for security and configuration flexibility.
 *
 * Error Handling:
 * Any errors encountered by requests made using this client should be handled by the components/hooks
 * that use this client.
 *
 * Dependencies:
 * Relies on the axios library for making HTTP requests.
 *
 * Example:
 * import ApiClient from './api-client';
 * ApiClient.get('/games').then(response => {
 *   // Handle the response data
 * }).catch(error => {
 *   // Handle the error
 * });
 */
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

const ApiClient = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: apiKey,
    }
})

export default ApiClient;

