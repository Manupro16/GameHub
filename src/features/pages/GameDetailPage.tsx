import { Heading } from '@chakra-ui/react';
import useGameStore, { GameStoreState } from '../pages/gameStore';
import useIndividualGameData from "./useIndividualGameData";
import { stripHtmlTags } from './stripHtmlTags.js.ts';
import ShowMoreText from '../components/ShowMoreText';
import GameAttributes from "../components/GameAttributes.tsx";




function GameDetailPage() {
    const selectedGameId = useGameStore((state: GameStoreState) => state.selectedGameId)
    const {data} = useIndividualGameData(selectedGameId)
    const cleanDescription = stripHtmlTags(data?.description);






    return(
        <>
            <Heading>{data?.name}</Heading>
            <ShowMoreText text={cleanDescription} wordLimit={300} />
            {data && <GameAttributes
                platforms={data.platforms}
                genres={data.genres}
                metascore={data.metacritic}
                publishers={data.publishers}
            />}

        </>
    )
}

export default GameDetailPage