import { Injectable } from '@nestjs/common'
import { PlaylistsRepository } from './playlists.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { Playlist } from './playlist.entity'
import { User } from 'src/users/user.entity'
import * as fs from 'fs-extra'

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistsRepository)
    private readonly repository: PlaylistsRepository,
  ) {}

  async create(
    createPlaylistDto: CreatePlaylistDto,
    cover: Express.Multer.File,
    user: User,
  ): Promise<Playlist> {
    const playlist: Playlist = await this.repository.createPlaylist(
      createPlaylistDto,
      user,
    )

    const fileExtension = cover.mimetype.substr(6),
      path = `/users/${user.id}/playlists/${playlist.id}/cover.${fileExtension}`

    playlist.cover = path
    await playlist.save()

    this.saveImage(cover, path)

    playlist.user = undefined
    return playlist
  }

  private async saveImage(
    cover: Express.Multer.File,
    path: string,
  ): Promise<void> {
    const img = await fs.readFileSync(cover.path)

    try {
      fs.outputFile(`uploads/${path}`, img)
      fs.remove(cover.path)
    } catch (e) {}
  }
}
