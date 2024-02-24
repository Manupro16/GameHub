import { useQuery } from '@tanstack/react-query';
import ApiClient from '../../API/api-client.ts';
import ms from "ms";

export interface gameApiResponse {
    name: string
    description: string
}


function useIndividualGameData(gameId: number | null) {
    return useQuery<gameApiResponse, Error >({
        queryKey: ['individualGamesData', gameId],
        queryFn: () => ApiClient.get<gameApiResponse>(`/games/${gameId}`),
        staleTime: ms('2 hours'), // Data is considered fresh for 2 hours
        refetchInterval: ms('2 hours'),
        }
    )

}


export default useIndividualGameData;