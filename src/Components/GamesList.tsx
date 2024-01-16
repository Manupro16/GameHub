import {Text, Box, Flex, useBreakpointValue} from '@chakra-ui/react';
import Dropdowns from "./Dropdowns.tsx";
import GamesCard from "./GameCard.tsx";
function GamesList() {

    const paddingValue = useBreakpointValue({ base: 4, sm: 6, md: 8 });
    // const cardWidth = useBreakpointValue({ base: "100%", sm: "48%", md: "31%" });

    return (
        <Box as='section' paddingLeft={paddingValue}>
            <Text fontSize='4xl' as='b' mb={4}>Games</Text>
            <Dropdowns />
            <Flex wrap='wrap' justify="space-around" gap={6} >
                <GamesCard />
                <GamesCard />
                <GamesCard />
                <GamesCard />
                <GamesCard />
                <GamesCard />
                <GamesCard />
                <GamesCard />
                <GamesCard />
                <GamesCard />



            </Flex>
        </Box>
    )
}


export default GamesList