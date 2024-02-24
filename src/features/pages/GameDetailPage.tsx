import { Text, Heading } from '@chakra-ui/react';
import useGameStore, { GameStoreState } from '../pages/gameStore';
import useIndividualGameData from "./useIndividualGameData";
import { stripHtmlTags } from './stripHtmlTags.js.ts';


function GameDetailPage() {
    const selectedGameId = useGameStore((state: GameStoreState) => state.selectedGameId)
    const {data} = useIndividualGameData(selectedGameId)
    const cleanDescription = stripHtmlTags(data?.description);

    return(
        <>
            <Heading>{data?.name}</Heading>
            <Text>{cleanDescription}</Text>
        </>
    )
}

export default GameDetailPage