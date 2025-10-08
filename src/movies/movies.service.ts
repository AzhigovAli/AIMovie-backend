import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { In, Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AiService } from '../ai/ai.service';
import { parsedResult } from '../utils/parsedResult';

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

      const { result } = await parsedResult(
        query,
        movies,
        this.aiRepository.createRequestAI.bind(this.aiRepository),
      );

      return this.moviesRepository.findBy({ title: In(result) });
    } catch (error) {
      console.log(error);
    }
  }
}
