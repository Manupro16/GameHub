/**
 * useGamesData Hook
 *
 * Purpose:
 * Fetches and manages game data from the RAWG Video Games Database API using React Query.
 * This hook abstracts the API call logic, leveraging React Query for efficient data fetching, caching, and synchronization.
 *
 * Usage:
 * Ideal for components requiring a list of games and their detailed information, such as game listings or search results.
 * It provides easy access to game data, including pagination support through the RAWG API's response structure.
 *
 * Data Model:
 * Utilizes the Game interface to type the response from the API, including details like id, name, release date,
 * background image, metacritic score, platforms, and genres for comprehensive game information.
 *
 * API Response Structure:
 * - count: Total number of games matching the query.
 * - next: URL for the next page of results, facilitating pagination.
 * - previous: URL for the previous page of results, facilitating pagination.
 * - results: Array of game objects, each containing detailed game information.
 *
 * Return Value:
 * The hook leverages React Query's useQuery to return a query object with the following properties:
 * - data: The fetched games data, or undefined if not yet loaded.
 * - error: An error object if an error occurred during the fetch.
 * - isLoading: A boolean indicating if the request is in progress.
 * - isError: A boolean indicating if the request resulted in an error.
 *
 * Error Handling:
 * Managed by React Query, with errors accessible through the error and isError properties, providing a robust way to handle API call failures.
 *
 * Dependencies:
 * Uses the ApiClient class for making API requests, ensuring a consistent and centralized way to manage API interactions.
 *
 * Example:
 * const { data, isLoading, error } = useGamesData();
 * if (isLoading) return <LoadingIndicator />;
 * if (error) return <ErrorDisplay message={error.message} />;
 * return <GamesList games={data?.results} />;
 */

import ApiClient from '../services/api-client';
import { useQuery } from '@tanstack/react-query';


export interface PlatformDetail {
    id: number;
    name: string;
}

export interface Platform {
    platform: PlatformDetail;
}

export interface Genres {
    id: number;
    name: string;
}

export interface Game {
    id: number;
    slug: string;
    name: string;
    released: string;
    background_image: string;
    metacritic: number;
    platforms: Platform[];
    genres: Genres[];

}

interface GamesApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
}

function useGamesData() {

    return useQuery<GamesApiResponse>({
        queryKey: ['Games'],
        queryFn: () => ApiClient.get<GamesApiResponse>("/games", {
            params: {
                page_size: 40
            }
        }),
        staleTime: 10 * 1000

    })
}

export default useGamesData;