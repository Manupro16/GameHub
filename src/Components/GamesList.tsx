/**
 * GamesList Component
 *
 * This component displays a list of video games based on the selected genre, platform, sort option, and search query.
 * It utilizes the `useGamesData` hook to fetch the list of games from an API and the `useCachedSortingFiltering` hook
 * to apply client-side filtering and sorting based on the user's selections. The component is designed to be responsive,
 * adjusting its layout based on the current breakpoint. Additionally, it provides a "Load More" button to fetch additional
 * games if available.
 *
 * Props:
 * - selectedGenre: The genre selected by the user for filtering the games list.
 * - selectedPlatform: The platform selected by the user for filtering the games list.
 * - sortOption: The option selected by the user for sorting the games list.
 * - searchQuery: The query entered by the user for searching within the games list.
 *
 * Usage:
 * <GamesList
 *   selectedGenre="Action"
 *   selectedPlatform="PC"
 *   sortOption="Newest"
 *   searchQuery=""
 * />
 *
 * The component structure includes a header displaying the current category, a flex container for the game cards,
 * and conditionally rendered content based on the loading state, presence of an error, or the filtered games list.
 */



import { Text, Box, Flex, useBreakpointValue, Button} from '@chakra-ui/react';
import GamesCard from "./GameCard.tsx";
import SkeletonGameCard from './SkeletonGameCard';
import useCachedSortingFiltering from "../hooks/useCachedSortingFiltering.ts";
import useGamesData from "../hooks/useGamesData.ts";




interface GamesListProps {
    selectedGenre: string | null;
    selectedPlatform: string;
    sortOption: string;
    searchQuery: string;
}


function GamesList({ selectedGenre, selectedPlatform, sortOption, searchQuery }: GamesListProps) {
    const paddingValue = useBreakpointValue({ base: 4, sm: 6, md: 8 });

    const { data, isLoading, error, fetchNextPage, hasNextPage } = useGamesData();
    const gamesData = data?.pages.flatMap(page => page.results) ?? [];
    const  filteredGames  = useCachedSortingFiltering({ gamesData, selectedGenre, selectedPlatform, sortOption, searchQuery});


    return (
        <Box as="section" paddingLeft={paddingValue}>
            <Text fontSize="4xl" as="b" mb={4}>
                Games
            </Text>
            <Flex wrap="wrap" justify="space-around" gap={6}>
                {isLoading ? (
                    Array(20).fill(null).map((_, index) => <SkeletonGameCard key={index} />)
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
            {hasNextPage && (
                <Flex justifyContent='center' marginTop='4'>
                    <Button onClick={() => fetchNextPage()} isLoading={isLoading}>
                        Load More
                    </Button>
                </Flex>
            )}
        </Box>
    );
}

export default GamesList;


