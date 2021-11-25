import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id = 0;

  @Column({
    length: 100,
    type: 'text'
  })
  name = '';
}
