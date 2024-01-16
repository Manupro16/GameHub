import {Text, List, Box} from '@chakra-ui/react';
import GenreCategory from "./GenreCategory.tsx";

function GenresList() {


    return (
        <Box as='section' padding={[2, 4, 6]}>
            <Text fontSize={['2xl', '3xl', '4xl']} as='b' mb={4}>Genres</Text>
            <List marginTop='4' spacing={3}>
                <GenreCategory />
            </List>
        </Box>
    )
}

export default GenresList;