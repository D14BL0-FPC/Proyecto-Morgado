"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
let PokemonService = class PokemonService {
    pokemon = [
        { id: 1, name: 'Bulbasaur', type: 'Grass', hp: 45 },
        { id: 2, name: 'Charmander', type: 'Fire', hp: 39 },
        { id: 3, name: 'Squirtle', type: 'Water', hp: 44 },
        { id: 4, name: 'Pikachu', type: 'Electric', hp: 35 },
        { id: 5, name: 'Snorlax', type: 'Normal', hp: 160 },
        { id: 6, name: 'Mewtwo', type: 'Psychic', hp: 106 },
    ];
    findAll(name, type, minHp) {
        let filteredPokemon = this.pokemon;
        if (name) {
            filteredPokemon = filteredPokemon.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (type) {
            filteredPokemon = filteredPokemon.filter((p) => p.type.toLowerCase() === type.toLowerCase());
        }
        if (minHp) {
            const hpValue = parseInt(minHp, 10);
            if (!isNaN(hpValue)) {
                filteredPokemon = filteredPokemon.filter((p) => p.hp > hpValue);
            }
        }
        return filteredPokemon;
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)()
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map