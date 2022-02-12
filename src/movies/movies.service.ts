import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  createMovie(movieData: CreateMovieDto) {
    const newMovie = {
      id: uuid(),
      ...movieData,
    };

    this.movies.push(newMovie);
    return newMovie;
  }

  getMovieById(movieId: string): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) {
      throw new NotFoundException(`Movie by id ${movieId} not found`);
    }
    return movie;
  }

  removeMovieById(movieId: string) {
    this.getMovieById(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== movieId);
  }

  patchMovie(movieId: string, movieData: UpdateMovieDto) {
    const patchedMovie = this.getMovieById(movieId);
    this.removeMovieById(movieId);
    this.movies.push({ ...patchedMovie, ...movieData });
  }
}
