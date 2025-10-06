import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { AiModule } from 'src/ai/ai.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    ScheduleModule.forRoot(),
    AiModule,
  ],
})
export class MoviesModule {}
