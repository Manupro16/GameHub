/**
 * Generic API Service Hook
 *
 * Purpose:
 * This file defines a custom hook `ApiService` for fetching data from an API endpoint.
 * It utilizes Axios for HTTP requests and provides state management for API data, loading status, and errors.
 *
 * Usage:
 * This hook can be used to fetch any data from an API by providing the required endpoint.
 * It returns an object containing the data, error status, and loading status.
 *
 * Parameters:
 * - T: Generic type parameter representing the expected shape of the response data.
 * - endpoint: API endpoint string to which the request is made.
 *
 * States:
 * - data: State holding the API response data.
 * - error: State holding any error that occurs during the request.
 * - loading: State indicating whether the request is in progress.
 *
 * useEffect Hook:
 * Handles the lifecycle of the API request. Automatically cancels the request if the component unmounts,
 * using Axios's cancel token feature to prevent memory leaks.
 *
 * Error Handling:
 * Errors are captured and set in the error state, which can be used by the consuming components for error handling.
 *
 * Dependencies:
 * Depends on axios for making API requests and useState, useEffect from React.
 *
 * Example Usage:
 * const { data, error, loading } = ApiService<DataType>('/endpoint');
 */
import { useState, useEffect } from 'react';
import ApiClient from './api-client';
import axios from 'axios';

function ApiService<T>(endpoint: string) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const cancelTokenSource = axios.CancelToken.source();

        async function fetchData() {
            try {
                const response = await ApiClient.get<T>(endpoint,
                    { cancelToken: cancelTokenSource.token });
                setData(response.data);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }


        }
        fetchData();

        return () => {
            cancelTokenSource.cancel('Component unmounted or request retriggered');
        };
    }, [endpoint]);

    return { data, error, loading };
}
export default ApiService;