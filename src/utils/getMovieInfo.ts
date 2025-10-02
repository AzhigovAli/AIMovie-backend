import { AxiosInstance } from 'axios';
import { MovieEntity } from 'src/movies/entities/movie.entity';
import { MovieInfo, OmdbType } from 'src/movies/types/movieInfo.type';

export async function getMovieInfo(
  ai: Function,
  axios: AxiosInstance,
  allMovies: MovieEntity[],
): Promise<MovieInfo> {
  const allTitles = allMovies.map((m) => m.title).join(', ');

  const movieName = await ai([
    {
      role: 'system',
      content: `Ты эксперт в поиске фильмов. Выбирай название фильма, сериала или мультфильма на английском. Не повторяй следующие названия: ${allTitles}. Просто возвращай одно название без лишних слов и символов.`,
    },
  ]);

  if (!movieName) {
    throw new Error('AI не вернул название фильма');
  }

  const response: OmdbType = await axios.get(
    `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${process.env.OMDB_API_KEY}`,
  );

  return {
    movie: {
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
    },
  };
}
