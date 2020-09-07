import {
  IsString,
  MinLength,
  MaxLength,
  IsUrl,
  IsArray,
  IsNotEmpty,
  ArrayUnique,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator'

export class CreatePlaylistDto {
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  title: string

  @IsString()
  @MinLength(20)
  @MaxLength(1000)
  description: string

  @IsString()
  @IsUrl()
  link: string

  @IsArray()
  @IsNotEmpty()
  @ArrayUnique()
  @ArrayMinSize(1)
  categories: number[]

  @IsArray()
  @IsNotEmpty()
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  tags: string[]

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  objectives: { title: string; description: string }[]
}
