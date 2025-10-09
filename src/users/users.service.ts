import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  /**
   * Создаёт нового пользователя в базе данных
   */
  create(dto: CreateUserDto) {
    return this.usersRepository.save(dto);
  }

  /**
   * Возвращает всех пользователей
   */
  findAll() {
    return this.usersRepository.find();
  }

  /**
   * Возвращает пользователя по email
   */
  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Возвращает пользователя по id
   */
  findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   * Валидация пользователя
   * @param email Email пользователя
   * @param password Пароль пользователя
   * @returns Данные пользователя
   */
  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * Валидация доступа
   * @param id ID пользователя
   * @returns ID пользователя
   */
  async validateAccess(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new UnauthorizedException('У вас нет доступа');
    }

    return {
      id: user.id,
    };
  }
}
