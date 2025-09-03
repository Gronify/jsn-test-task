import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'superhero',
})
export class SuperheroEntity extends EntityRelationalHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  real_name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  origin_description: string;

  @Column({
    type: 'text',
    array: true,
    nullable: false,
  })
  superpowers: string[];

  @Column({
    type: 'varchar',
    nullable: false,
  })
  catch_phrase: string;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  images: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
