import { IsString, MinLength, MaxLength, Matches } from 'class-validator'

const link_regex: RegExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/

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
  @Matches(link_regex, { message: 'Invalid Link' })
  link: string
}
