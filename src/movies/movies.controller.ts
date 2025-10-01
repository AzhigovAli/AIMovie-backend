import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Cron } from '@nestjs/schedule';

@Controller('movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @Cron('*/30 * * * *')
  findAll() {
    return this.moviesService.findAll();
  }
}
