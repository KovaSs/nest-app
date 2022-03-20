import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  createMovie(movieData: Movie) {
    const newMovie = {
      id: uuid(),
      ...movieData,
    };

    this.movies.push(newMovie);
    return newMovie;
  }

  getMovieById(movieId: string): Movie {
    return this.movies.find((movie) => movie.id === movieId);
  }

  removeMovieById(movieId: string): boolean {
    this.movies = this.movies.filter((movie) => movie.id !== movieId);
    return true;
  }
}
