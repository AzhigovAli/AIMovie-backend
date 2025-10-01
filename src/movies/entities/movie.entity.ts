import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: ['movie', 'series', 'cartoon'] })
  type: 'movie' | 'series' | 'cartoon';

  @Column()
  year: number;

  @Column()
  runtime: string;

  @Column()
  director: string;

  @Column('text', { array: true })
  actors: string[];

  @Column('text', { array: true })
  genres: string[];

  @Column()
  plot: string;

  @Column()
  poster: string;

  @Column({ type: 'float' })
  imdbRating: number;

  @Column()
  imdbID: string;

  @Column({ nullable: true })
  seasons?: number;

  @Column({ nullable: true })
  episodes?: number;
}
