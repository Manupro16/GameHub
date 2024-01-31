/**
 * GamesList Component Documentation
 *
 * Overview:
 * The GamesList component is responsible for displaying a list of video games.
 * It utilizes the `useGamesData` hook to fetch the list of games from the RAWG Video Games Database API
 * and the `useCachedSortingFiltering` hook to apply user-selected filters and sorting options to the list.
 * The component supports filtering by genre, platform, and search query, as well as sorting by newest, oldest,
 * highest score, and lowest score.
 *
 * Features:
 * - Dynamic fetching of games data based on user interactions.
 * - Caching of game data to optimize network usage and enhance user experience.
 * - Filtering and sorting of games based on various criteria.
 * - Display of a loading indicator during data fetching and an error message for any errors encountered.
 * - Responsive design that adjusts the layout and presentation of games based on screen size.
 *
 * Props:
 * - selectedGenre: A string representing the user-selected genre to filter games by.
 * - selectedPlatform: A string representing the user-selected platform to filter games by.
 * - sortOption: A string representing the user-selected sorting option for ordering games.
 * - searchQuery: A string representing the user's search query to filter games by name.
 *
 * Usage:
 * This component is used within the main application UI to present the list of games to the user.
 * It interacts with user inputs provided through the NavBar and Dropdown components to dynamically
 * update the list based on the selected filters and sorting options.
 *
 * Example:
 * ```
 * <GamesList
 *   selectedGenre="Action"
 *   selectedPlatform="PC"
 *   sortOption="Newest"
 *   searchQuery="witcher"
 * />
 * ```
 *
 * Note:
 * The GamesList component is a key part of the application's interactive features, providing users
 * with a flexible and responsive interface for exploring the video games database.
 */



import {Text, Box, Flex, useBreakpointValue} from '@chakra-ui/react';
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

    const { data: gamesApiResponse, isLoading, error } = useGamesData();
    const gamesData = gamesApiResponse?.results ?? [];
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
        </Box>
    );
}

export default GamesList;


