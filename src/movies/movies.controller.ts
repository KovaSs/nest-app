import { Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'Here will be return all movies!';
  }

  @Get('/:id')
  getOneMovie(@Param('id') movieId: string): string {
    return `Here will be return movie by id: ${movieId}`;
  }

  @Post()
  createMovie(): string {
    return `This request will be create new movie`;
  }

  @Delete('/:id')
  removeMovie(@Param('id') movieId: string): string {
    return `This request will be remove movie by id: ${movieId}`;
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: string): string {
    return `This request will be update movie by id: ${movieId}`;
  }
}
