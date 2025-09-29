import { Entity } from 'typeorm';

@Entity('movie')
export class MovieEntity {
  id: number;
  title: string;
  type: 'movie' | 'series' | 'cartoon';
  year: number;
  runtime: number;
  director: string;
  actors: string[];
  genres: string[];
  plot: string;
  poster: string;
  imdbRating: number;
  imdbID: string;
  seasons?: number;
  episodes?: number;
}
