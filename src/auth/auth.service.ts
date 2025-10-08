import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ email: string; fullName: string } | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);

      if (user) {
        throw new ForbiddenException(
          'Пользователь с таким email уже существует',
        );
      }

      const newUser = await this.usersService.create(dto);

      return { token: this.jwtService.sign({ id: newUser.id }) };
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }

  async login(user: UserEntity) {
    const token = this.jwtService.sign({ id: user.id });

    return {
      token: token,
    };
  }
}
