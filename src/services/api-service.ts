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