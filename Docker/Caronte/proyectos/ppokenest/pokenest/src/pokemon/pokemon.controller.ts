import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) { }

    @Get()
    getPokemon(
        @Query('name') name?: string,
        @Query('type') type?: string,
        @Query('minHp') minHp?: string,
    ) {
        return this.pokemonService.findAll(name, type, minHp);
    }
}
