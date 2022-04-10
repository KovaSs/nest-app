import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  // Query,
} from '@nestjs/common';

import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // searchMovie(@Query('year') year: string): string {
  //   return `Here we search movie by year: ${year}`;
  // }

  @Get(':id')
  getMovieById(@Param('id') movieId: string): Movie {
    return this.moviesService.getMovieById(movieId);
  }

  @Post()
  createMovie(@Body() movieData: Movie) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  removeMovieById(@Param('id') movieId: string) {
    return this.moviesService.removeMovieById(movieId);
  }

  @Patch(':id')
  patchMovie(@Param('id') movieId: string, @Body() updatedData) {
    return this.moviesService.patchMovie(movieId, updatedData);
  }
}
