import {
  Controller,
  UseGuards,
  Post,
  Get,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Req,
  InternalServerErrorException,
  Res,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PlaylistsService } from './playlists.service'
import { AuthGuard } from '@nestjs/passport'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/users/user.entity'
import { Playlist } from './playlist.entity'
import { imageFileFilter } from 'src/config/multer.config'

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
  @UseInterceptors(FileInterceptor('cover', { fileFilter: imageFileFilter }))
  public async create(
    @UploadedFile() cover: Express.Multer.File,
    @Body(ValidationPipe) createPlaylistDto: CreatePlaylistDto,
    @GetUser() user: User,
  ): Promise<Playlist> {
    return await this.service.create(createPlaylistDto, cover, user)
  }

  @Put('update/:id')
  public async update(
    @Body(ValidationPipe) CreatePlaylistDto: CreatePlaylistDto,
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Playlist> {
    return null
  }
}

//res.sendFile(cover.filename, { root: 'temp' })
