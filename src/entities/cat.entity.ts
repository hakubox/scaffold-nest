import { IsNotEmpty, Max, Min } from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@ObjectType({ description: '猫模型' })
export class Cat {
  
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  @ApiProperty({ example: '', description: 'Id' })
  @IsNotEmpty({ message: 'Id不能为空' })
  id: string;
  
  @Column({ type: 'varchar', length: 200 })
  @Field()
  @ApiProperty({ example: 'kitty', description: '猫名' })
  @IsNotEmpty({ message: '猫的姓名不能为空' })
  name: string;

  @Column({ type: 'int' })
  @Field()
  @ApiProperty({ example: 10, description: '年龄' })
  @IsNotEmpty({ message: '猫的年龄不能为空' })
  @Max(30)
  @Min(1)
  age: number;

  @Column({ type: 'varchar', length: 200 })
  @Field()
  @ApiProperty({ example: '缅因猫', description: '品种' })
  breed: string;
}