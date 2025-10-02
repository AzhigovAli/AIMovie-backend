import { CreateMovieDto } from '../dto/create-movie.dto';

export interface MovieInfo {
  movie: CreateMovieDto;
}

export interface OmdbType {
  data: {
    Title: string;
    Type: 'movie' | 'series' | 'cartoon';
    Year: string;
    Runtime: string;
    Director: string;
    Actors: string;
    Genre: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    imdbID: string;
  };
}
