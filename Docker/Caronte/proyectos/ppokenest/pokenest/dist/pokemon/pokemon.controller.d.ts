import { PokemonService } from './pokemon.service';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    getPokemon(name?: string, type?: string, minHp?: string): {
        id: number;
        name: string;
        type: string;
        hp: number;
    }[];
}
