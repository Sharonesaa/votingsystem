import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxParticipants: number;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}