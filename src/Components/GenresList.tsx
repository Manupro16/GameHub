import {Text, Image, Flex, List, ListItem, Box, Link} from '@chakra-ui/react';


function GenresList() {

    const handleGenreClick = (genre: string) => {
        // Handle the click event for the genre
        console.log("Genre clicked:", genre);
    };


    return (
        <Box as='section' padding={[2, 4, 6]}>
            <Text fontSize={['2xl', '3xl', '4xl']} as='b' mb={4}>Genres</Text>
            <List marginTop='4' spacing={3}>
                <ListItem>
                    <Flex alignItems='center' gap={[1, 2, 3]}>
                        <Image
                            src='https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg'
                            boxSize={['40px', '50px', '60px']}
                            objectFit='cover'
                            borderRadius='10px'
                            alt='Action Genre'
                        />
                        <Link
                            fontSize={['sm', 'md', 'lg']}
                            _hover={{ textDecoration: 'underline' }}
                            onClick={() => handleGenreClick('Action')}
                        >
                            Action
                        </Link>
                    </Flex>
                </ListItem>
            </List>
        </Box>
    )
}

export default GenresList;