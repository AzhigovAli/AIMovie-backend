import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertMovie1759920000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "movie" 
        ("title", "plot", "type", "year", "runtime", "director", "actors", "genres", "poster", "imdbRating", "imdbID")
      VALUES
        ('Mario', 'A thief who steals corporate secrets ...', 'movie', 2010, '148 min', 'Christopher Nolan', 
         ARRAY['Leonardo DiCaprio','Joseph Gordon-Levitt'], ARRAY['Action','Sci-Fi'], 
         'inception.jpg', 8.8, 'tt1375666');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "movie" WHERE "imdbID" = 'tt1375666';
    `);
  }
}
