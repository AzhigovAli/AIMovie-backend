import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('/search')
  @ApiQuery({ name: 'query', required: true })
  async aiSearch(@Query('query') query: string) {
    return this.moviesService.aiSearch(query);
  }
}
