/**
 * useCachedSortingFiltering Hook Documentation
 *
 * Overview:
 * The useCachedSortingFiltering hook performs client-side filtering and sorting
 * of a game list based on user-selected criteria such as genre, platform, sorting options, and search queries.
 * This approach enhances the user experience by dynamically updating the game list to match user preferences.
 *
 * Purpose:
 * To provide a responsive and dynamic interface for users to filter and sort game lists
 * according to various criteria without the need for additional data fetching.
 *
 * Input Parameters:
 * - gamesData: Array of game objects to be filtered and sorted.
 * - selectedGenre: Optional string representing the user-selected genre.
 * - selectedPlatform: Optional string representing the user-selected platform.
 * - sortOption: String specifying how the list should be sorted (e.g., 'Newest', 'Oldest', 'Highest Score', 'Lowest Score').
 * - searchQuery: Optional string for filtering games by name.
 *
 * Processing Logic:
 * 1. Filters the list of games based on the presence of a genre, platform, or search query.
 * 2. Sorts the filtered list according to the specified sorting option.
 * 3. Updates the list reactively on input criteria changes using the useMemo hook, optimizing performance by memoizing the result.
 *
 * Return Value:
 * - Returns a memoized array of game objects that are filtered and sorted according to the specified criteria.
 *
 * Example Usage:
 * ```tsx
 * const filteredAndSortedGames = useCachedSortingFiltering({
 *   gamesData,
 *   selectedGenre: 'Action',
 *   selectedPlatform: 'PC',
 *   sortOption: 'Newest',
 *   searchQuery: 'witcher'
 * });
 * // Use `filteredAndSortedGames` in your component to display a list of games.
 * ```
 *
 * Note:
 * This hook is designed to abstract the filtering and sorting logic from UI components,
 * making it easier to manage state and render logic separately.
 * It leverages the useMemo hook to optimize performance by avoiding unnecessary recalculations.
 */

import {useMemo} from 'react';
import {Game} from './useGamesData';

interface UseCachedSortingFilteringProps {
    gamesData: Game[];
    selectedGenre: string | null;
    selectedPlatform: string;
    sortOption: string;
    searchQuery: string;
}

function useCachedSortingFiltering({ gamesData, selectedGenre, selectedPlatform, sortOption, searchQuery }: UseCachedSortingFilteringProps) {
    return useMemo(() => {
        let processedGames = [...gamesData];

        if (selectedGenre || selectedPlatform || searchQuery) {
            processedGames = processedGames.filter(game => {
                const matchesGenre = !selectedGenre || game.genres.some(genre => genre.name === selectedGenre);
                const matchesPlatform = !selectedPlatform || game.platforms.some(platform => platform.platform.name.includes(selectedPlatform));
                const matchesSearch = !searchQuery || game.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesGenre && matchesPlatform && matchesSearch;
            });
        }

        switch (sortOption) {
            case 'Newest':
                return processedGames.sort((a, b) => new Date(b.released ?? '').getTime() - new Date(a.released ?? '').getTime());
            case 'Oldest':
                return processedGames.sort((a, b) => new Date(a.released ?? '').getTime() - new Date(b.released ?? '').getTime());
            case 'Highest Score':
                return processedGames.sort((a, b) => (b.metacritic ?? 0) - (a.metacritic ?? 0));
            case 'Lowest Score':
                return processedGames.sort((a, b) => (a.metacritic ?? 0) - (b.metacritic ?? 0));
            default:
                return processedGames; // Return processed games without sorting if no sort option matches
        }
    }, [gamesData, selectedGenre, selectedPlatform, sortOption, searchQuery])
}


export default useCachedSortingFiltering;
