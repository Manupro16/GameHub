import ApiService from '../services/api-service';


interface PlatformDetail {
    id: number;
    name: string;
    slug: string;
    // Include other relevant fields if needed
}

interface Platform {
    platform: PlatformDetail;
    // Include other relevant fields if needed
}

interface Game {
    id: number;
    slug: string;
    name: string;
    released: string;
    background_image: string;
    metacritic: number;
    platforms: Platform[];
    // Add other fields from the API response as needed
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