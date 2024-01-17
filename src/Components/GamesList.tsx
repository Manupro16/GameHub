import {Text, Box, Flex, useBreakpointValue} from '@chakra-ui/react';
import Dropdowns from "./Dropdowns.tsx";
import GamesCard from "./GameCard.tsx";
import useGamesData from "../hooks/useGamesData";
import SkeletonGameCard from './SkeletonGameCard';


interface GamesListProps {
    selectedGenre: string | null;
}

function GamesList({ selectedGenre }: GamesListProps) {


  const paddingValue = useBreakpointValue({ base: 4, sm: 6, md: 8 });
  // @ts-ignore
  const { data, error, loading } = useGamesData();

  const filteredGames = selectedGenre ? data?.results.filter(game => game.genres.some(genre => genre.name === selectedGenre)) : data?.results;

  return (
    <Box as="section" paddingLeft={paddingValue}>
      <Text fontSize="4xl" as="b" mb={4}>
        Games
      </Text>

      <Dropdowns />
      <Flex wrap="wrap" justify="space-around" gap={6}>
          {loading ? (
              Array(10).fill(null).map((_, index) => <SkeletonGameCard key={index} />)
        ) : ( filteredGames && filteredGames.length > 0 ? (
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
              <Text fontSize="lg" color="gray.500" marginTop={10} >No games found for the genre '{selectedGenre}'.</Text>
          ))}
      </Flex>
    </Box>
  );
}

export default GamesList;


