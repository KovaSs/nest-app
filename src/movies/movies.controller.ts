import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  Body,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'Here will be return all movies!';
  }

  @Get('search')
  searchMovie(@Query('year') year: string): string {
    return `Here we search movie by year: ${year}`;
  }

  @Get(':id')
  getOneMovie(@Param('id') movieId: string): string {
    return `Here will be return movie by id: ${movieId}`;
  }

  @Post()
  createMovie(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  removeMovie(@Param('id') movieId: string): string {
    return `This request will be remove movie by id: ${movieId}`;
  }

  @Patch(':id')
  patchMovie(@Param('id') movieId: string, @Body() updatedData): string {
    return {
      movieId,
      ...updatedData,
    };
  }
}
