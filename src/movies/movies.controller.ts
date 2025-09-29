import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('movies')
@ApiBearerAuth()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiQuery(CreateUserDto)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }
}
