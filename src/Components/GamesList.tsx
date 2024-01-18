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
  const { data, error, loading } = useGamesData();
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
                {loading ? (
                    Array(10).fill(null).map((_, index) => <SkeletonGameCard key={index} />)
                ) : error ? (
                    <Text fontSize="lg" color="gray.500" marginTop={10}>
                        Error on request: {error.message}
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


