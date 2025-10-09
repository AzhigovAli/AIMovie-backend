import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { AiService } from '../ai/ai.service';
import { parsedResult } from '../utils/parsedResult';

const DEFAULT_MOVIE_TYPES = ['movie', 'series', 'cartoon'];

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
    private readonly aiService: AiService,
  ) {}

  /**
   * Создаёт новый фильм в базе данных
   * @param dto - данные нового фильма
   */
  async create(dto: CreateMovieDto) {
    return this.moviesRepository.save(dto);
  }

  /**
   * Возвращает все фильмы определённого типа или всех типов по умолчанию
   * @param type - тип фильма (movie | series | cartoon)
   */
  async findAll(type?: 'movie' | 'series' | 'cartoon') {
    try {
      if (type) {
        return this.moviesRepository.find({ where: { type } });
      }

      return this.moviesRepository.find({
        where: { type: In(['movie', 'series', 'cartoon']) },
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  /**
   * Выполняет поиск фильмов с помощью AI по текстовому запросу
   * @param query - текст запроса пользователя
   */
  async aiSearch(query: string) {
    try {
      const movies = await this.moviesRepository.find();

      const { result } = await parsedResult(
        query,
        movies,
        this.aiService.createRequestAI.bind(this.aiService),
      );

      return this.moviesRepository.findBy({ title: In(result) });
    } catch (error) {
      console.error('Error in aiSearch:', error);
      throw error;
    }
  }
}
