import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreatePostDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly slug: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  readonly title: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly author: string = '';

  @ApiProperty({ type: String })
  @Optional()
  @IsString()
  readonly excerpt: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly content: string = '';
}
