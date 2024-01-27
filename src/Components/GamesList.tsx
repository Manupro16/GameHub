/**
 * GamesList Component
 *
 * This component is responsible for displaying a list of games based on various filters such as genre, platform, sorting option, and search query.
 * It fetches game data using the `useGamesData` hook and applies filters to display relevant games.
 *
 * Props:
 *  - selectedGenre: string | null - The genre selected by the user. Null if no genre is selected.
 *  - selectedPlatform: string - The platform selected by the user.
 *  - sortOption: string - The sorting option chosen by the user (e.g., 'Newest', 'Oldest').
 *  - searchQuery: string - The search query entered by the user.
 *
 * The component uses Chakra UI for layout and styling. It also uses a custom `SkeletonGameCard` component to display a loading state.
 *
 * The component's main logic involves filtering and sorting the games data based on the props provided. This is done inside a useEffect hook,
 * which re-runs whenever the props change, ensuring that the displayed games are always up to date with the user's selections.
 *
 * In case of an error during data fetching, an error message is displayed. If no games match the filters, a message indicating so is shown.
 */


import {Text, Box, Flex, useBreakpointValue} from '@chakra-ui/react';
import GamesCard from "./GameCard.tsx";
import useGamesData, { Game } from "../hooks/useGamesData";
import SkeletonGameCard from './SkeletonGameCard';
import { useEffect, useState } from 'react';


interface GamesListProps {
    selectedGenre: string | null;
    selectedPlatform: string;
    sortOption: string;
    searchQuery: string;
}


function GamesList({ selectedGenre, selectedPlatform, sortOption, searchQuery }: GamesListProps) {
    const paddingValue = useBreakpointValue({ base: 4, sm: 6, md: 8 });
    const { data, error, isLoading } = useGamesData();
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);

    function matchesFilters(game: Game) {
        const matchesGenre = !selectedGenre || game.genres.some(genre => genre.name === selectedGenre);
        const matchesPlatform = !selectedPlatform || game.platforms.some(platform => platform.platform.name.includes(selectedPlatform));
        const matchesSearch = !searchQuery || game.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesGenre && matchesPlatform && matchesSearch;
    }

    useEffect(() => {
        if (data?.results) {
            let newFilteredGames = data.results.filter(matchesFilters);

            switch (sortOption) {
                case 'Newest':
                    newFilteredGames.sort((a, b) => new Date(b.released ?? '').getTime() - new Date(a.released ?? '').getTime());
                    break;
                case 'Oldest':
                    newFilteredGames.sort((a, b) => new Date(a.released ?? '').getTime() - new Date(b.released ?? '').getTime());
                    break;
                case 'Highest Score':
                    newFilteredGames.sort((a, b) => (b.metacritic ?? 0) - (a.metacritic ?? 0));
                    break;
                case 'Lowest Score':
                    newFilteredGames.sort((a, b) => (a.metacritic ?? 0) - (b.metacritic ?? 0));
                    break;
            }

            setFilteredGames(newFilteredGames);
        }
    }, [data, selectedGenre, selectedPlatform, sortOption, searchQuery]);

    return (
        <Box as="section" paddingLeft={paddingValue}>
            <Text fontSize="4xl" as="b" mb={4}>
                Games
            </Text>
            <Flex wrap="wrap" justify="space-around" gap={6}>
                {isLoading ? (
                    Array(10).fill(null).map((_, index) => <SkeletonGameCard key={index} />)
                ) : error ? (
                    <Text fontSize="lg" color="gray.500" marginTop={10}>
                        Error on request: {error?.message}
                    </Text>
                ) : filteredGames && filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                        <GamesCard
                            key={game.id}
                            game_name={game.name}
                            img_url={game.background_image}
                            score={game.metacritic}
                            platform={game.platforms}
                        />
                    ))
                ) : (
                    <Text fontSize="lg" color="gray.500" marginTop={10}>
                        No games found for the genre '{selectedGenre}'.
                    </Text>
                )}
            </Flex>
        </Box>
    );
}

export default GamesList;


