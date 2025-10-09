import { MovieEntity } from 'src/movies/entities/movie.entity';
import { getAiMessageContent } from './aiMessageContent';

/**
 * Функция для парсинга ответа AI из строки в JSON
 *
 * @param query Пользовательский запрос
 * @param movies Список фильмов
 * @param createRequestAI Функция для запроса AI
 * @returns Массив с названиями фильмов
 */
export async function parsedResult(
  query: string,
  movies: MovieEntity[],
  createRequestAI: Function,
): Promise<{ result: string[] }> {
  const detailsStr = `
      <title>${movies.map((m) => m.title)}</title>
      <plot>${movies.map((m) => m.plot)}</plot>
      `;

  const aiResult = await createRequestAI([
    {
      role: 'system',
      content: getAiMessageContent(query, detailsStr),
    },
  ]);

  const result = JSON.parse(aiResult || '[]');

  return { result };
}
