import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let createdMovie: Movie;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    const movie = service.createMovie({
      title: 'Iron man',
      year: 2010,
      genres: ['Fantasy', 'Marvel'],
    });

    createdMovie = movie;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('testing function getAll', () => {
    it('should be returned array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('testing function createMovie', () => {
    it('should be created new movie', () => {
      expect(createdMovie).toBeDefined();
    });

    it('should be includes in array with all movies', () => {
      const allMovies = service.getAll();
      const isIncludeRemovedMovieInAllMoviesArray = allMovies.some(
        (movieItem) => movieItem.id === createdMovie.id,
      );
      expect(isIncludeRemovedMovieInAllMoviesArray).toEqual(true);
    });

    it('should be includes title', () => {
      const allMovies = service.getAll();
      const isIncludeRemovedMovieInAllMoviesArray = allMovies.some(
        (movieItem) => movieItem.title === createdMovie.title,
      );
      expect(isIncludeRemovedMovieInAllMoviesArray).toEqual(true);
    });
  });

  describe('testing function getMovieById', () => {
    it('should be return movie', () => {
      const result = service.getMovieById(createdMovie.id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(createdMovie.id);
    });

    it('should be return NotFoundException error', () => {
      const movieId = 'test-id';
      try {
        service.getMovieById(movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie by id ${movieId} not found`);
      }
    });
  });

  describe('testing function removeMovie', () => {
    it('should be remove movie', () => {
      service.removeMovieById(createdMovie.id);
      const allMovies = service.getAll();
      const isIncludeRemovedMovieInAllMoviesArray = allMovies.some(
        (movieItem) => movieItem.id === createdMovie.id,
      );
      expect(isIncludeRemovedMovieInAllMoviesArray).toEqual(false);
    });

    it('should be return NotFoundException error', () => {
      const movieId = 'test-id';
      try {
        service.removeMovieById(movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie by id ${movieId} not found`);
      }
    });
  });

  describe('testing function patchMovie', () => {
    it('should be patched title movie', () => {
      service.patchMovie(createdMovie.id, { title: 'Avatar' });
      const patchedMovie = service.getMovieById(createdMovie.id);
      expect(patchedMovie).toBeDefined();
      expect(createdMovie.title).not.toEqual(patchedMovie.title);
    });

    it('should be return NotFoundException error', () => {
      const movieId = 'test-id';
      try {
        service.patchMovie(movieId, { title: 'Avatar' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie by id ${movieId} not found`);
      }
    });
  });
});
