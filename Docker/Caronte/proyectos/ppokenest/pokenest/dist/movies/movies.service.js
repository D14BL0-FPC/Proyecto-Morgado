"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
let MoviesService = class MoviesService {
    movies = [
        { id: 1, title: 'Inception', releaseDate: '2010-07-16' },
        { id: 2, title: 'Interstellar', releaseDate: '2014-11-07' },
        { id: 3, title: 'The Matrix', releaseDate: '1999-03-31' },
        { id: 4, title: 'Avengers: Endgame', releaseDate: '2019-04-26' },
    ];
    findAll(title, startDate, endDate) {
        let filteredMovies = this.movies;
        if (title) {
            filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (startDate && endDate) {
            filteredMovies = filteredMovies.filter((movie) => {
                const releaseDate = new Date(movie.releaseDate);
                return (releaseDate >= new Date(startDate) && releaseDate <= new Date(endDate));
            });
        }
        return filteredMovies;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)()
], MoviesService);
//# sourceMappingURL=movies.service.js.map