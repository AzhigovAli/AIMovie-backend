import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { In, Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { AiService } from 'src/ai/ai.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
    private readonly aiRepository: AiService,
  ) {}

  async create(dto: CreateMovieDto) {
    return this.moviesRepository.save(dto);
  }

  async findAll(type: string) {
    try {
      return this.moviesRepository.find({
        where: {
          type: In(type ? [type] : ['movie', 'series', 'cartoon']),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async aiSearch(query: string) {
    try {
      const movies = await this.moviesRepository.find();

      const detailsStr = `
      <title>${movies.map((m) => m.title)}</title>
      <plot>${movies.map((m) => m.plot)}</plot>
      `;

      const result = await this.aiRepository.createRequestAI([
        {
          role: 'system',
          content: `Ты умный поиск по фильмам. У тебя есть список фильмов с названием и сюжетом ${detailsStr}.

          <title>Тут хранятся все названия фильмов, сериалов и мультфильмов из БД</title>
          <plot>Тут хранятся все сюжеты фильмов, сериалов и мультфильмов из БД</plot>

          Ты получаешь пользовательский запрос: "${query}".

          Найди только те фильмы, у которых plot или title максимально похож на запрос.
          Верни результат строго в формате JSON массива названий фильмов: ["Название1", "Название2"].`,
        },
      ]);

      const parsedResult = JSON.parse(result || '[]');

      return this.moviesRepository.findBy({ title: In(parsedResult) });
    } catch (error) {
      console.log(error);
    }
  }
}
