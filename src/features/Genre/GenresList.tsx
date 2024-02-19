/**
 * GenresList Component
 *
 * Purpose:
 * Renders a list of game genres. Each genre is represented by a clickable GenreCategory component.
 *
 * Props:
 * - `onGenreSelect`: Function to handle the selection of a genre. It takes a string argument representing the selected genre's name.
 *
 * Usage:
 * The component is used to display a list of genres fetched from the useGenresData hook.
 * Upon clicking on a genre, the `onGenreSelect` function is triggered, which can be used to filter games based on the selected genre.
 *
 * Data Fetching and Error Handling:
 * The component uses the useGenresData hook to fetch genre data. Loading and error states are considered but not explicitly handled in this component.
 *
 * Accessibility and Design:
 * The component uses semantic HTML and responsive styles to enhance accessibility and ensure a consistent look across different screen sizes.
 */
import {Text, List, Box} from '@chakra-ui/react';
import GenreCategory from "./GenreCategory.tsx";
import useGenresData from "./useGenresData.ts";
import SkeletonGenreCategory from "../Shared/SkeletonGenreCategory.tsx";
import { useGamesStore } from "../Game"


function GenresList() {

    const { data, error, isLoading } = useGenresData();
    const { setGenre, updateFilteredSortedGames } = useGamesStore()

    function handleGenreSelect(genre: string) {
        setGenre(genre);
        updateFilteredSortedGames();
    }

    return (
        <Box as='section' padding={[2, 4, 6]}>
            <Text fontSize={['2xl', '3xl', '4xl']} as='b' mb={4}>Genres</Text>
            <List marginTop='4' spacing={3}>
                {isLoading ? (
                    Array(10).fill(null).map((_, index) => <SkeletonGenreCategory key={index} />)
                ) : error ? (
                    <Text>{error.message}</Text>
                ) : data && data.results.map((genre) => (
                    <GenreCategory key={genre.id} img_url={genre.image_background} type={genre.name} onGenreClick={() => handleGenreSelect(genre.name)} />
                ))}
            </List>
        </Box>
    )
}



export default GenresList;