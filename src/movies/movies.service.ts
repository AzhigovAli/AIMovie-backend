import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}
  async create(dto: CreateMovieDto) {
    return this.moviesRepository.create(dto);
  }

  async findAll() {
    const client = new OpenAI({
      baseURL: 'https://router.huggingface.co/v1',
      apiKey: process.env.HF_TOKEN,
    });

    const chatCompletion = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3.2-Exp:novita',
      messages: [
        {
          role: 'user',
          content: 'What is the capital of France?',
        },
      ],
    });

    return chatCompletion.choices[0].message.content;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }
}
