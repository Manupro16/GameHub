/**
 * GamesList Component Documentation
 *
 * Overview:
 * The GamesList component renders a responsive list of video games, incorporating features such as filtering, sorting,
 * and infinite scrolling. It leverages `useGamesData` for fetching game data from an API and `useCachedSortingFiltering`
 * for client-side processing based on user inputs. The inclusion of the `react-infinite-scroll-component` allows for
 * efficient loading of additional games as the user scrolls, enhancing the browsing experience.
 *
 * Features:
 * - Responsive design that adapts to various screen sizes and breakpoints.
 * - Dynamic filtering and sorting based on user selections for genre, platform, and other criteria.
 * - Infinite scrolling to seamlessly load more games as the user scrolls down, with a "Load More" button as a fallback.
 * - Skeleton loaders to indicate loading states, providing a smooth user experience.
 *
 * Props:
 * - selectedGenre: Filter games by a specific genre.
 * - selectedPlatform: Filter games by a specific platform.
 * - sortOption: Sort the games list according to criteria such as release date or score.
 * - searchQuery: Filter games by matching text query.
 *
 * Usage Example:
 * ```jsx
 * <GamesList
 *   selectedGenre="Action"
 *   selectedPlatform="PC"
 *   sortOption="Newest"
 *   searchQuery="witcher"
 * />
 * ```
 *
 * Implementation Details:
 * - The component first fetches a paginated list of games using `useGamesData`. This hook is configured to support
 *   infinite query behavior, fetching additional pages of data as needed.
 * - The `useCachedSortingFiltering` hook is applied to the fetched data for client-side filtering and sorting, based
 *   on the props provided by the user.
 * - The `react-infinite-scroll-component` is utilized to wrap the list of game cards, triggering additional data fetches
 *   from `useGamesData` when the user scrolls near the bottom of the list.
 * - A "Load More" button is also provided as an alternative method for triggering the fetch of additional games.
 * - Skeleton loaders are displayed during data fetching to indicate loading states, enhancing the visual feedback for
 *   users.
 *
 * Note:
 * This component plays a crucial role in the application's user interface, presenting a dynamic and interactive list of
 * games that responds to user inputs and scrolling behavior.
 */




import { Text, Box, Flex, useBreakpointValue} from '@chakra-ui/react';
import GamesCard from "./GameCard.tsx";
import SkeletonGameCard from '../Shared/SkeletonGameCard.tsx';
import useGamesData from "./useGamesData.ts";
import InfiniteScroll from 'react-infinite-scroll-component';
import  useGamesStore  from "./gamesStore";
import React, { useEffect } from "react";


interface SkeletonArrayProps {
    isLoading: boolean;
    hasNextPage: boolean;
}




function GamesList() {
    const paddingValue = useBreakpointValue({ base: 4, sm: 6, md: 8 });

    const { data, isLoading, error, fetchNextPage, hasNextPage } = useGamesData();
    const { setGamesData, filteredSortedGames, selectedGenre, updateFilteredSortedGames } = useGamesStore()

    useEffect(() => {
        if (data) {
            const gamesData = data?.pages.flatMap(page => page.results) ?? [];
            setGamesData(gamesData);
            updateFilteredSortedGames()
        }
    }, [data, setGamesData]);

    const SkeletonArray:React.FC<SkeletonArrayProps> = ({ isLoading, hasNextPage }) => {
        if (!isLoading || !hasNextPage) return null;

        return (
            <>
                {Array(5).fill(null).map((_, index) => <SkeletonGameCard key={index} />)}
            </>
        );
    };


    return (
        <Box as="section" paddingLeft={paddingValue}>
            <Text fontSize="4xl" as="b" mb={4}>
                Games
            </Text>
            <InfiniteScroll
                dataLength={filteredSortedGames.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<SkeletonArray isLoading={isLoading} hasNextPage={hasNextPage} />}
                endMessage={
                <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                </p>
            }>
                <Flex wrap="wrap" justify="space-around" gap={6}>
                    { error ? (
                        <Text fontSize="lg" color="gray.500" marginTop={10}>
                            Error on request: {error?.message}
                        </Text>
                    ) : filteredSortedGames && filteredSortedGames.length > 0 ? (
                        filteredSortedGames.map((game) => (
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
            </InfiniteScroll>
        </Box>
    );
}

export default GamesList;


