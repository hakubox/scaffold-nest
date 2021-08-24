import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: '猫模型' })
export class CatCreateDto {
  
  @Field(type => ID)
  id: string;
  
  @Field()
  @ApiProperty({ example: 'kitty', description: '猫名' })
  @IsNotEmpty({ message: '猫的姓名不能为空' })
  name: string;

  @Field()
  @ApiProperty({ type: 'integer', example: 10, description: '年龄' })
  @IsNotEmpty({ message: '猫的年龄不能为空' })
  // @IsInt()
  // @Max(30)
  // @Min(1)
  age: number;

  @Field()
  @ApiProperty({ example: '缅因猫', description: '品种', required: false })
  breed: string;
}