import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  private movies = [
    { id: 1, title: 'Inception', releaseDate: '2010-07-16' },
    { id: 2, title: 'Interstellar', releaseDate: '2014-11-07' },
    { id: 3, title: 'The Matrix', releaseDate: '1999-03-31' },
    { id: 4, title: 'Avengers: Endgame', releaseDate: '2019-04-26' },
  ];

  findAll(title?: string, startDate?: string, endDate?: string) {
    let filteredMovies = this.movies;

    if (title) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase()),
      );
    }

    if (startDate && endDate) {
      filteredMovies = filteredMovies.filter((movie) => {
        const releaseDate = new Date(movie.releaseDate);
        return (
          releaseDate >= new Date(startDate) && releaseDate <= new Date(endDate)
        );
      });
    }

    return filteredMovies;
  }
}
