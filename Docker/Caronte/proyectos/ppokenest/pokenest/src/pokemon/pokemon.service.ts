import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonService {
    private pokemon = [
        { id: 1, name: 'Bulbasaur', type: 'Grass', hp: 45 },
        { id: 2, name: 'Charmander', type: 'Fire', hp: 39 },
        { id: 3, name: 'Squirtle', type: 'Water', hp: 44 },
        { id: 4, name: 'Pikachu', type: 'Electric', hp: 35 },
        { id: 5, name: 'Snorlax', type: 'Normal', hp: 160 },
        { id: 6, name: 'Mewtwo', type: 'Psychic', hp: 106 },
    ];

    findAll(name?: string, type?: string, minHp?: string) {
        let filteredPokemon = this.pokemon;

        if (name) {
            filteredPokemon = filteredPokemon.filter((p) =>
                p.name.toLowerCase().includes(name.toLowerCase()),
            );
        }

        if (type) {
            filteredPokemon = filteredPokemon.filter(
                (p) => p.type.toLowerCase() === type.toLowerCase(),
            );
        }

        if (minHp) {
            const hpValue = parseInt(minHp, 10);
            if (!isNaN(hpValue)) {
                filteredPokemon = filteredPokemon.filter((p) => p.hp > hpValue);
            }
        }

        return filteredPokemon;
    }
}
