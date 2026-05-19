import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    getMovies(title?: string, startDate?: string, endDate?: string): {
        id: number;
        title: string;
        releaseDate: string;
    }[];
}
