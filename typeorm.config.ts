import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from './src/users/entities/user.entity';
import { MovieEntity } from './src/movies/entities/movie.entity';

dotenv.config({ path: process.env.CONFIG_ROOT || '.env' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, MovieEntity],
  migrations: ['src/migrations/*.ts'],
});
