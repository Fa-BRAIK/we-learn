import {
  IsString,
  MinLength,
  MaxLength,
  IsUrl,
  IsArray,
  ARRAY_MIN_SIZE,
  IsNotEmpty,
  ArrayUnique,
  ArrayMinSize,
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
}
