import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { In, Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { AiService } from 'src/ai/ai.service';
import { getMovieInfo } from 'src/utils/getMovieInfo';
import { MovieInfo } from './types/movieInfo.type';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
    private readonly httpService: HttpService,
    private readonly aiRepository: AiService,
  ) {}

  async create(dto: CreateMovieDto) {
    const movie = this.moviesRepository.create(dto);
    return this.moviesRepository.save(movie);
  }

  @Cron('*/30 * * * *')
  async findAll() {
    const allMovies = await this.moviesRepository.find();

    const { movie }: MovieInfo = await getMovieInfo(
      this.aiRepository.createRequestAI,
      this.httpService.axiosRef,
      allMovies,
    );

    await this.create(movie);

    return this.moviesRepository.find();
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
