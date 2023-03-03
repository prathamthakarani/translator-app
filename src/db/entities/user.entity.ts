import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { logging } from '../log.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @OneToMany(()=>logging, (logId)=>logId.userId)
  userId: string;

  @Column({ unique: true})
  userEmail: string;

  @Column()
  userPassword: string;

}