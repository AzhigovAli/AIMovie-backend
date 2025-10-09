import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMovieDto {
  /**
   * Название фильма
   */
  @IsString()
  @ApiProperty({
    default: 'The Shawshank Redemption',
  })
  title: string;

  /**
   * Тип фильма (movie | series | cartoon)
   */
  @ApiProperty({
    default: 'movie',
  })
  type: 'movie' | 'series' | 'cartoon';

  /**
   * Год выпуска
   */
  @ApiProperty({
    default: 1994,
  })
  year: number;

  /**
   * Длительность
   */
  @ApiProperty({
    default: 142,
  })
  runtime: string;

  /**
   * Режиссёр
   */
  @ApiProperty({
    default: 'Frank Darabont',
  })
  director: string;

  /**
   * Актёры
   */
  @ApiProperty({
    default: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
  })
  actors: string[];

  /**
   * Жанры
   */
  @ApiProperty({
    default: ['Crime', 'Drama'],
  })
  genres: string[];

  /**
   * Описание
   */
  @ApiProperty({
    default:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  })
  plot: string;

  /**
   * Постер
   */
  @ApiProperty({
    default:
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  })
  poster: string;

  /**
   * Рейтинг IMDB
   */
  @ApiProperty({
    default: 9.3,
  })
  imdbRating: number;

  /**
   * Идентификатор IMDB
   */
  @ApiProperty({
    default: 'tt0144084',
  })
  imdbID: string;

  /**
   * Количество сезонов
   */
  @ApiProperty({
    default: 1,
  })
  seasons?: number;

  /**
   * Количество серий
   */
  @ApiProperty({
    default: 10,
  })
  episodes?: number;
}
