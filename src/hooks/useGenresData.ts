/**
 * useGenresData Hook
 *
 * Purpose:
 * Fetches and provides genre data from the RAWG Video Games Database API using React Query for data fetching and caching.
 * This hook retrieves a list of game genres, including details like the number of games available in each genre and background images.
 *
 * Usage:
 * Mainly utilized within components that require a list of game genres, such as a genre filter or navigation menu.
 * It facilitates the display of genres with their metadata and provides a foundation for building interactive UI elements based on genre data.
 *
 * Data Model:
 * Leverages the GenreApiResponse interface to type the expected response from the API. This interface includes:
 * - count: Total number of genres.
 * - next: URL for the next page of results (if applicable).
 * - previous: URL for the previous page of results (if applicable).
 * - results: Array of Genre objects, each containing id, name, games_count, image_background, and an array of associated games.
 *
 * API Response Structure:
 * - count: Total number of genres.
 * - next: URL for the next page of results.
 * - previous: URL for the previous page of results.
 * - results: Array of genres, each with associated details and games.
 *
 * Return Value:
 * Utilizes React Query's useQuery hook to return a query object containing:
 * - data: The fetched genre data or undefined if not yet loaded.
 * - error: An error object if an error occurred during the fetch.
 * - isLoading: A boolean indicating if the request is in progress.
 * - isError: A boolean indicating if the request resulted in an error.
 *
 * Error Handling:
 * Errors during the fetch process are managed by React Query and accessible through the error and isError return values.
 *
 * Dependencies:
 * Uses the ApiClient class for making API requests, leveraging React Query for caching, state management, and error handling.
 *
 * Example:
 * const { data, isLoading, error } = useGenresData();
 * if (isLoading) return <LoadingIndicator />;
 * if (error) return <ErrorDisplay message={error.message} />;
 * return <GenresList genres={data?.results} />;
 */

import ApiClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';
import ms from 'ms';

interface Game {
    id: number;
    name: string;
    added: number;
}

interface Genre {
    id: number;
    name: string;
    games_count: number;
    image_background: string;
    games: Game[];
}

interface GenreApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Genre[];
}

function useGenresData() {

    return useQuery<GenreApiResponse>({
        queryKey: ['Genres'],
        queryFn: () => ApiClient.get<GenreApiResponse>('/genres'),
        staleTime: 7200000, // Data is considered fresh for 2 hours
        refetchInterval: ms('2 hours'),


    })

}

export default useGenresData;