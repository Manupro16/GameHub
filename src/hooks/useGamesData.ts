import ApiService from '../services/api-service';


export interface PlatformDetail {
    id: number;
    name: string;
    // Include other relevant fields if needed
}

export interface Platform {
    platform: PlatformDetail;
    // Include other relevant fields if needed
}

export interface Genres {
    id: number;
    name: string;
}

interface Game {
    id: number;
    slug: string;
    name: string;
    released: string;
    background_image: string;
    metacritic: number;
    platforms: Platform[];
    genres: Genres[];

}

interface GamesApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Game[];
}

function useGamesData() {
    return ApiService<GamesApiResponse>(`/games`);
}

export default useGamesData;