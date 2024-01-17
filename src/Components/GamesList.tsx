import {Text, Box, Flex, useBreakpointValue} from '@chakra-ui/react';
import Dropdowns from "./Dropdowns.tsx";
import GamesCard from "./GameCard.tsx";
import useGamesData from "../hooks/useGamesData";

function GamesList() {

  const paddingValue = useBreakpointValue({ base: 4, sm: 6, md: 8 });

  // @ts-ignore
  const { data, error, loading } = useGamesData();

  return (
    <Box as="section" paddingLeft={paddingValue}>
      <Text fontSize="4xl" as="b" mb={4}>
        Games
      </Text>
      <Dropdowns />
      <Flex wrap="wrap" justify="space-around" gap={6}>
        {data &&
          data.results.map((game) => (
            <GamesCard
              key={game.id}
              game_name={game.name}
              img_url={game.background_image}
              score={game.metacritic}
              platform={game.platforms}
            />
          ))}
      </Flex>
    </Box>
  );
}

export default GamesList;
