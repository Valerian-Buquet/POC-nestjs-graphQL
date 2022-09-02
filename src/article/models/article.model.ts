import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../building-blocks/models/baseModel.model';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Article extends BaseModel {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;
}
