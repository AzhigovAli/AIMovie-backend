import { ApiProperty } from '@nestjs/swagger';
import { Entity } from 'typeorm';

@Entity('users')
export class CreateUserDto {
  @ApiProperty({
    default: 'test@test.ru',
  })
  email: string;

  @ApiProperty({
    default: 'Мистер Кредо',
  })
  fullName: string;

  @ApiProperty({
    default: '123',
  })
  password: string;
}