import {
  Controller,
  UseGuards,
  Post,
  Get,
  Body,
  ValidationPipe,
} from '@nestjs/common'
import { PlaylistsService } from './playlists.service'
import { AuthGuard } from '@nestjs/passport'
import { CreatePlaylistDto } from './dto/create-playlist.dto'

@Controller('playlists')
@UseGuards(AuthGuard())
export class PlaylistsController {
  constructor(private readonly service: PlaylistsService) {}

  @Get()
  /**
   * returns a result for a search of playlists
   */
  public async findFilter(): Promise<void> {}

  @Post('create')
  public async create(
    @Body(ValidationPipe) createPlaylistDto: CreatePlaylistDto,
  ): Promise<void> {
    console.log(createPlaylistDto)

    this.service.create()
  }
}
