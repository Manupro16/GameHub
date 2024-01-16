import ApiService from '../services/api-service';

interface Game {
    id: number;
    name: string;
    added: number;
}

interface Genre {
    id: number;
    name: string;
    games_count: number;
    image_background: string;
    games: Game[];
}

interface GenreApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Genre[];
}

function useGenresData() {
    return ApiService<GenreApiResponse>(`/genres`);

}

export default useGenresData;