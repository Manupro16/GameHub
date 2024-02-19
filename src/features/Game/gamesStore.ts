import { create } from 'zustand';
import {Game, Genres, Platform} from "./useGamesData.ts";
import { debounce } from 'lodash';

interface GameState {
    gamesData: Game[];
    filteredSortedGames: Game[];
    selectedGenre: string | null;
    selectedPlatform: string;
    sortOption: string;
    searchQuery: string;
}


interface GameActions {
    setGenre: (genre: string | null) => void;
    setPlatform: (platform: string) => void;
    setSortOption: (option: string) => void;
    setSearchQuery: (query: string) => void;
    setGamesData: (games: Game[]) => void;
    updateFilteredSortedGames: () => void;
}

const debouncedUpdateFilteredSortedGames = debounce((set, get) => {
    const { gamesData, selectedGenre, selectedPlatform, sortOption, searchQuery } = get();
    let result = [...gamesData];

    // Filtering logic
    if (selectedGenre || selectedPlatform || searchQuery) {
        result = result.filter(game => {
            const matchesGenre = !selectedGenre || game.genres.some((genre: Genres) => genre.name === selectedGenre);
            const matchesPlatform = !selectedPlatform || game.platforms.some((platform: Platform) => platform.platform.name.includes(selectedPlatform));
            const matchesSearch = !searchQuery || game.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesGenre && matchesPlatform && matchesSearch;
        });
    }

    // Sorting logic
    switch (sortOption) {
        case 'Newest':
            result.sort((a, b) => new Date(b.released ?? '').getTime() - new Date(a.released ?? '').getTime());
            break;
        case 'Oldest':
            result.sort((a, b) => new Date(a.released ?? '').getTime() - new Date(b.released ?? '').getTime());
            break;
        case 'Highest Score':
            result.sort((a, b) => (b.metacritic ?? 0) - (a.metacritic ?? 0));
            break;
        case 'Lowest Score':
            result.sort((a, b) => (a.metacritic ?? 0) - (b.metacritic ?? 0));
            break;
    }

    set({ filteredSortedGames: result });
}, 300);


const useGamesStore = create<GameState & GameActions>((set, get) => ({
    // Initial state
    gamesData: [],
    filteredSortedGames: [],
    selectedGenre: null,
    selectedPlatform: '',
    sortOption: '',
    searchQuery: '',

    // Actions
    setGenre: (genre: string | null) => set({ selectedGenre: genre }),
    setPlatform: (platform: string) => set({ selectedPlatform: platform }),
    setSortOption: (option: string) => set({ sortOption: option }),
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    setGamesData: (games: Game[]) => set({ gamesData: games }),
    updateFilteredSortedGames: () => debouncedUpdateFilteredSortedGames(set, get),
}));

export default useGamesStore;