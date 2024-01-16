import ApiService from '../services/api-service';


interface Platform {
    platform: {
        id: number;
        name: string;
    }
}

interface Game {
    id: number;
    name: string;
    released: string;
    background_image: string;
    metacritic: number;
    platforms: Platform[];
}

interface GamesApiResponse {
    count: number;
    results: Game[];
}

function useGamesData() {
    return ApiService<GamesApiResponse>(`/games`);
}

export default useGamesData;