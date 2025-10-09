import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';

@Entity('users')
export class CreateUserDto {
  /**
   * Email пользователя
   */
  @ApiProperty({
    default: 'test@test.ru',
  })
  email: string;

  /**
   * Полное имя пользователя
   */
  @ApiProperty({
    default: 'Мистер Кредо',
  })
  fullName: string;

  /**
   * Пароль пользователя
   */
  @ApiProperty({
    default: '123',
  })
  password: string;
}
