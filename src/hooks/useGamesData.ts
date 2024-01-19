/**
 * useGamesData Hook
 *
 * Purpose:
 * Fetches and provides game data from the RAWG Video Games Database API.
 * This hook abstracts the API call logic and provides a clean interface to access game data.
 *
 * Usage:
 * This hook can be used in any component that requires a list of games and their details.
 * It is primarily used in the GamesList component to render a list of game cards.
 *
 * Data Model:
 * The hook leverages the Game interface, which includes details like id, name, release date,
 * background image, metacritic score, platforms, and genres.
 *
 * API Response Structure:
 * - count: Total number of games available.
 * - next: URL for the next page of results.
 * - previous: URL for the previous page of results.
 * - results: Array of game objects.
 *
 * Return Value:
 * This hook returns an object containing the game data (or null if not loaded),
 * a loading state, and an error state (if any error occurs during the API call).
 *
 * Error Handling:
 * Any errors encountered during the API call are caught and returned as part of the hook's return value.
 *
 * Dependencies:
 * Relies on the ApiService custom hook for performing API requests.
 *
 * Example:
 * const { data, loading, error } = useGamesData();
 * if (loading) return <LoadingIndicator />;
 * if (error) return <ErrorDisplay message={error} />;
 * return <GamesList games={data.results} />;
 */

import ApiService from '../services/api-service';


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
    return ApiService<GamesApiResponse>(`/games`);
}

export default useGamesData;