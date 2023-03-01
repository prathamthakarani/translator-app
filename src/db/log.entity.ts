import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class logging{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  body: string;

  @Column()
  method: string;

  @CreateDateColumn()
  date: Date;
}