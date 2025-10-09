import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  /**
   * ID пользователя
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Email пользователя
   */
  @Column()
  email: string;

  /**
   * ФИО пользователя
   */
  @Column()
  fullName: string;

  /**
   * Пароль пользователя
   */
  @Column()
  password: string;
}
