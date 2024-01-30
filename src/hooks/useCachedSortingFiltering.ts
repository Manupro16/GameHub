/**
 * useCachedSortingFiltering Hook Documentation
 *
 * Overview:
 * The useCachedSortingFiltering hook is designed to perform client-side filtering and sorting
 * of a list of games based on criteria such as genre, platform, sort option, and search query.
 * It takes a list of games and user-selected criteria as inputs and returns a filtered and sorted
 * list of games.
 *
 * Purpose:
 * This hook enhances the user experience by providing dynamic and responsive filtering and sorting
 * functionalities. It allows users to narrow down the list of games according to their preferences
 * and to sort the list based on various criteria such as release date and metacritic score.
 *
 * Input:
 * The hook accepts an object containing the following properties:
 * - gamesData: An array of Game objects to be filtered and sorted.
 * - selectedGenre: A string representing the user-selected genre to filter games by (optional).
 * - selectedPlatform: A string representing the user-selected platform to filter games by (optional).
 * - sortOption: A string representing the user-selected sorting option for ordering games.
 * - searchQuery: A string representing the user's search query to filter games by name (optional).
 *
 * Processing:
 * - Filters the gamesData based on the provided criteria (selectedGenre, selectedPlatform, searchQuery).
 * - Applies sorting to the filtered list based on the sortOption (Newest, Oldest, Highest Score, Lowest Score).
 * - Uses a React useEffect hook to reactively update the filtered and sorted list whenever the input criteria change.
 *
 * Return Value:
 * Returns an array of filtered and sorted Game objects.
 *
 * Example Usage:
 * This hook can be used in components that display a list of games, allowing for dynamic updates based on user interaction.
 * ```
 * const filteredAndSortedGames = useCachedSortingFiltering({
 *   gamesData,
 *   selectedGenre: 'Action',
 *   selectedPlatform: 'PC',
 *   sortOption: 'Newest',
 *   searchQuery: 'witcher'
 * });
 * ```
 *
 * Note:
 * This hook is part of the application's data processing layer, abstracting the logic for filtering and sorting away from UI components.
 * It provides a clean and reusable solution for handling user-driven data manipulation within the application.
 */


import { useState, useEffect } from 'react';
import { Game } from './useGamesData';

interface UseCachedSortingFilteringProps {
    gamesData: Game[];
    selectedGenre: string | null;
    selectedPlatform: string;
    sortOption: string;
    searchQuery: string;
}

function useCachedSortingFiltering({ gamesData, selectedGenre, selectedPlatform, sortOption, searchQuery }: UseCachedSortingFilteringProps) {
    const [filteredAndSortedGames, setFilteredAndSortedGames] = useState<Game[]>([]);

    useEffect(() => {
        let processedGames = gamesData;

        // Apply filters only if corresponding criteria are specified
        if (selectedGenre || selectedPlatform || searchQuery) {
            processedGames = processedGames.filter(game => {
                const matchesGenre = !selectedGenre || game.genres.some(genre => genre.name === selectedGenre);
                const matchesPlatform = !selectedPlatform || game.platforms.some(platform => platform.platform.name.includes(selectedPlatform));
                const matchesSearch = !searchQuery || game.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesGenre && matchesPlatform && matchesSearch;
            });
        }

        // Apply sorting logic regardless of filters
        switch (sortOption) {
            case 'Newest':
                processedGames.sort((a, b) => new Date(b.released ?? '').getTime() - new Date(a.released ?? '').getTime());
                break;
            case 'Oldest':
                processedGames.sort((a, b) => new Date(a.released ?? '').getTime() - new Date(b.released ?? '').getTime());
                break;
            case 'Highest Score':
                processedGames.sort((a, b) => (b.metacritic ?? 0) - (a.metacritic ?? 0));
                break;
            case 'Lowest Score':
                processedGames.sort((a, b) => (a.metacritic ?? 0) - (b.metacritic ?? 0));
                break;
        }

        setFilteredAndSortedGames(processedGames);
    }, [gamesData, selectedGenre, selectedPlatform, sortOption, searchQuery]);

    return filteredAndSortedGames;
}

export default useCachedSortingFiltering;
