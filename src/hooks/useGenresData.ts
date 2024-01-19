/**
 * useGenresData Hook
 *
 * Purpose:
 * Fetches and provides genre data from the RAWG Video Games Database API.
 * This hook is designed to retrieve a list of game genres, each with associated games.
 *
 * Usage:
 * This hook is mainly used in the GenresList component to render a list of game genres,
 * along with a count of games available in each genre and a background image representing the genre.
 *
 * Data Model:
 * The hook uses the Genre interface, which includes details like id, name, games count,
 * image background, and a list of games associated with each genre.
 *
 * API Response Structure:
 * - count: Total number of genres available.
 * - next: URL for the next page of results.
 * - previous: URL for the previous page of results.
 * - results: Array of genre objects.
 *
 * Return Value:
 * This hook returns an object containing the genre data (or null if not loaded),
 * a loading state, and an error state (if any error occurs during the API call).
 *
 * Error Handling:
 * Any errors encountered during the API call are caught and returned as part of the hook's return value.
 *
 * Dependencies:
 * Relies on the ApiService custom hook for performing API requests.
 *
 * Example:
 * const { data, loading, error } = useGenresData();
 * if (loading) return <LoadingIndicator />;
 * if (error) return <ErrorDisplay message={error} />;
 * return <GenresList genres={data.results} />;
 */

import ApiService from '../services/api-service';

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
    return ApiService<GenreApiResponse>(`/genres`);

}

export default useGenresData;