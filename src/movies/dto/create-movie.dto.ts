import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @ApiProperty({
    default: 'The Shawshank Redemption',
  })
  title: string;
  @ApiProperty({
    default: 'movie',
  })
  type: 'movie' | 'series' | 'cartoon';
  @ApiProperty({
    default: 1994,
  })
  year: number;
  @ApiProperty({
    default: 142,
  })
  runtime: string;
  @ApiProperty({
    default: 'Frank Darabont',
  })
  director: string;
  @ApiProperty({
    default: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
  })
  actors: string[];
  @ApiProperty({
    default: ['Crime', 'Drama'],
  })
  genres: string[];
  @ApiProperty({
    default:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  })
  plot: string;
  @ApiProperty({
    default:
      'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  })
  poster: string;
  @ApiProperty({
    default: 9.3,
  })
  imdbRating: number;
  @ApiProperty({
    default: 'tt0144084',
  })
  imdbID: string;
  @ApiProperty({
    default: 1,
  })
  seasons?: number;
  @ApiProperty({
    default: 10,
  })
  episodes?: number;
}
