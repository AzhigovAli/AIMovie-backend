import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { AiService } from 'src/ai/ai.service';

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

  async findAll() {
    const allMovies = await this.moviesRepository.find();
    const allTitles = allMovies.map((m) => m.title).join(', ');

    const movieName = await this.aiRepository.createRequestAI([
      {
        role: 'system',
        content: `Ты эксперт в поиске фильмов. Выбирай название фильма, сериала или мультфильма на английском. Не повторяй следующие названия: ${allTitles}. Просто возвращай одно название без лишних слов и символов.`,
      },
    ]);

    if (!movieName) {
      throw new Error('AI не вернул название фильма');
    }

    const response: any = await this.httpService.axiosRef.get(
      `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${process.env.OMDB_API_KEY}`,
    );

    await this.create({
      title: response.data.Title,
      type: response.data.Type,
      year: Number(response.data.Year),
      runtime: response.data.Runtime,
      director: response.data.Director,
      actors: response.data.Actors.split(',').map((a: string) => a.trim()),
      genres: response.data.Genre.split(',').map((g: string) => g.trim()),
      plot: response.data.Plot,
      poster: response.data.Poster,
      imdbRating: Number(response.data.imdbRating),
      imdbID: response.data.imdbID,
    });

    return this.moviesRepository.find();
  }
}
