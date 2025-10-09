import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * @param type Тип фильма
   * @returns Список фильмов
   */
  @Get()
  @ApiQuery({ name: 'type', required: false })
  findAll(@Query('type') type: 'movie' | 'series' | 'cartoon') {
    return this.moviesService.findAll(type);
  }

  /**
   * Поиск с ИИ
   * @param query Пользовательский запрос
   * @returns Список названий фильмов
   */
  @Get('/search')
  @ApiQuery({ name: 'query', required: true })
  async aiSearch(@Query('query') query: string) {
    return this.moviesService.aiSearch(query);
  }
}
