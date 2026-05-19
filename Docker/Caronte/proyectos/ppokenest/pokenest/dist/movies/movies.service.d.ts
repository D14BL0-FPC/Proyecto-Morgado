export declare class MoviesService {
    private movies;
    findAll(title?: string, startDate?: string, endDate?: string): {
        id: number;
        title: string;
        releaseDate: string;
    }[];
}
