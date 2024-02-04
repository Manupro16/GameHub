/**
 * useGamesData Hook
 *
 * Purpose:
 * Fetches and manages the pagination of game data from the RAWG Video Games Database API.
 * It uses React Query's `useInfiniteQuery` for efficient data fetching, caching, infinite scrolling, and synchronization.
 *
 * Features:
 * - Efficient data fetching and state management for game listings.
 * - Supports infinite scrolling through pagination.
 * - Caching and background updating for a better user experience.
 * - Integrated error handling and loading state management.
 *
 * Usage:
 * Ideal for building components that require a list of games with the ability to load more on demand, such as infinite scrolling lists.
 *
 * Example:
 * ```tsx
 * const { data, error, fetchNextPage, hasNextPage, isLoading } = useGamesData();
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>An error occurred: {error.message}</div>;
 * return (
 *   <div>
 *     {data.pages.map((page, i) => (
 *       <React.Fragment key={i}>
 *         {page.results.map(game => <GameComponent key={game.id} game={game} />)}
 *       </React.Fragment>
 *     ))}
 *     {hasNextPage && <button onClick={() => fetchNextPage()}>Load More</button>}
 *   </div>
 * );
 * ```
 *
 * Data Model:
 * The hook structures game data using the `Game` interface, which includes comprehensive details necessary for displaying game listings.
 *
 * Return Value:
 * The hook returns an object with properties to manage the fetched data and query state, including:
 * - `data`: An object with pages of games data, each containing a list of games.
 * - `error`: An error object if an error occurred during fetching.
 * - `isLoading`: Boolean indicating if the initial query is in progress.
 * - `fetchNextPage`: Function to load the next page of data.
 * - `hasNextPage`: Boolean indicating if there are more pages to load.
 *
 * Pagination Handling:
 * Pagination is managed automatically by React Query based on the `getNextPageParam` function, which extracts the next page number from the API response.
 *
 * Refetching Strategy:
 * By default, data is refetched in the background when the window regains focus to ensure data freshness without manual refresh.
 *
 * Error Handling:
 * Errors during data fetching are managed by React Query and made accessible via the `error` and `isError` properties for easy integration into UI error handling logic.
 *
 * Dependencies:
 * Relies on the `ApiClient` class for making API requests, abstracting away direct API call mechanics and centralizing configuration.
 */

import ApiClient from '../services/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';


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

export interface GamesApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
}

function useGamesData() {

    function fetchGamesData(pageParam: number): Promise<GamesApiResponse> {

        return ApiClient.get<GamesApiResponse>('/games', {
            params: {
                page: pageParam,
                page_size: 20,
            },
        });
    }


    return useInfiniteQuery<GamesApiResponse, Error>({
        queryKey: ['Games'],
        queryFn: ({ pageParam = 1 }) => fetchGamesData(pageParam as number),
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const url = new URL(lastPage.next);
            const nextPage = url.searchParams.get('page');
            return nextPage ? parseInt(nextPage, 10) : undefined
        },
        initialPageParam: 1, // Data will be refetched every 2 hours
        refetchOnWindowFocus: false,
    });
}

export default useGamesData;