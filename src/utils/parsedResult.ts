import { MovieEntity } from 'src/movies/entities/movie.entity';

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
      content: `Ты умный поиск по фильмам. У тебя есть список фильмов с названием и сюжетом ${detailsStr}.

          <title>Тут хранятся все названия фильмов, сериалов и мультфильмов из БД</title>
          <plot>Тут хранятся все сюжеты фильмов, сериалов и мультфильмов из БД</plot>

          Ты получаешь пользовательский запрос: "${query}".

          Найди только те фильмы, у которых plot или title максимально похож на запрос.
          Верни результат строго в формате JSON массива названий фильмов: ["Название1", "Название2"].`,
    },
  ]);

  const result = JSON.parse(aiResult || '[]');

  return { result };
}
