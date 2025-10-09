import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class MovieEntity {
  /**
   * ID фильма
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Название фильма
   */
  @Column()
  title: string;

  /**
   * Тип фильма
   */
  @Column({ type: 'enum', enum: ['movie', 'series', 'cartoon'] })
  type: 'movie' | 'series' | 'cartoon';

  /**
   * Год выпуска
   */
  @Column()
  year: number;

  /**
   * Длительность
   */
  @Column()
  runtime: string;

  /**
   * Режиссёр
   */
  @Column()
  director: string;

  /**
   * Актеры
   */
  @Column('text', { array: true })
  actors: string[];

  /**
   * Жанры
   */
  @Column('text', { array: true })
  genres: string[];

  /**
   * Сюжет
   */
  @Column()
  plot: string;

  /**
   * Постер
   */
  @Column()
  poster: string;

  /**
   * Рейтинг IMDB
   */
  @Column({ type: 'float' })
  imdbRating: number;

  /**
   * ID фильма в IMDB
   */
  @Column()
  imdbID: string;

  /**
   * Количество сезонов
   */
  @Column({ nullable: true })
  seasons?: number;

  /**
   * Количество серий
   */
  @Column({ nullable: true })
  episodes?: number;
}
