export declare class PokemonService {
    private pokemon;
    findAll(name?: string, type?: string, minHp?: string): {
        id: number;
        name: string;
        type: string;
        hp: number;
    }[];
}
