import {Text, List, Box} from '@chakra-ui/react';
import GenreCategory from "./GenreCategory.tsx";
import useGenresData from "../hooks/useGenresData";

interface GenresListProps {
    onGenreSelect: (genre: string) => void;
}

function GenresList({ onGenreSelect }: GenresListProps) {

    // @ts-ignore
    const { data, error, loading } = useGenresData();


    return (
        <Box as='section' padding={[2, 4, 6]}>
            <Text fontSize={['2xl', '3xl', '4xl']} as='b' mb={4}>Genres</Text>
            <List marginTop='4' spacing={3}>
                {data && data.results.map((genre) => (
                    <GenreCategory key={genre.id} img_url={genre.image_background} type={genre.name} onGenreClick={() => onGenreSelect(genre.name)} />
                ))}
            </List>
        </Box>
    )
}

export default GenresList;