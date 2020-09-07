import {
  Controller,
  UseGuards,
  Post,
  Get,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Put,
  Param,
  ParseIntPipe,
  Delete,
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
  public async findUser(@GetUser() user: User): Promise<Playlist[]> {
    return await this.service.findUser(user)
  }

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
    @Body(ValidationPipe) createPlaylistDto: CreatePlaylistDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.service.update(createPlaylistDto, id)
  }

  @Put('update/:id/cover')
  @UseInterceptors(FileInterceptor('cover', { fileFilter: imageFileFilter }))
  public async updateCoverPicture(
    @UploadedFile() cover: Express.Multer.File,
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.service.updateCoverPicture(cover, user, id)
  }

  @Delete('delete/:id')
  public async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    await this.service.delete(id, user)
  }
}
