import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
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

  describe('testing function getMovieById', () => {
    it('should be return movie', () => {
      const movie = service.createMovie({
        title: 'Iron man',
        year: 2010,
        genres: ['Fantasy', 'Marvel'],
      });
      const result = service.getMovieById(movie.id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(movie.id);
    });

    it('should be return 404 error', () => {
      const movieId = 'test-id';
      try {
        service.getMovieById(movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Movie by id ${movieId} not found`);
      }
    });
  });
});
