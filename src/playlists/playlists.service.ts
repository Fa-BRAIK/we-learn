import { Injectable, NotFoundException } from '@nestjs/common'
import { PlaylistsRepository } from './playlists.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { Playlist } from './playlist.entity'
import { User } from 'src/users/user.entity'
import * as fs from 'fs-extra'
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistsRepository)
    private readonly repository: PlaylistsRepository,
  ) {}

  public async findUser(user: User): Promise<Playlist[]> {
    return await this.repository.find({ where: { userId: user.id } })
  }

  public async create(
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

  public async update(
    createPlaylistDto: CreatePlaylistDto,
    id: number,
  ): Promise<void> {
    const { title, description, link } = createPlaylistDto
    const playlist = await this.repository.findOne(id)

    if (playlist) {
      playlist.title = title
      playlist.description = description
      playlist.link = link
      await playlist.save()
    } else {
      throw new NotFoundException('Playlist with giving id not found')
    }
  }

  public async updateCoverPicture(
    cover: Express.Multer.File,
    user: User,
    id: number,
  ): Promise<void> {
    try {
      const playlist = await this.repository.findOneOrFail(id)

      fs.remove(`uploads/${playlist.cover}`)

      const fileExtension = cover.mimetype.substr(6),
        path = `/users/${user.id}/playlists/${id}/cover.${fileExtension}`

      playlist.cover = path
      playlist.save()

      this.saveImage(cover, path)
    } catch (e) {
      throw new NotFoundException('Playlist with giving id not found')
    }
  }

  public async delete(id: number, user: User): Promise<void> {
    const result = await this.repository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException('Playlist with giving id not found')
    } else {
      fs.emptyDir(`uploads/users/${user.id}/playlists/${id}`)
      fs.remove(`uploads/users/${user.id}/playlists/${id}`)
    }
  }

  private async saveImage(
    cover: Express.Multer.File,
    path: string,
  ): Promise<void> {
    try {
      const compressed_images = await imagemin([`temp/${cover.filename}`], {
        destination: '',
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      })

      if (compressed_images.length > 0) {
        fs.outputFile(`uploads/${path}`, compressed_images[0].data)
        fs.remove(cover.path)
      } else {
        console.warn('Warrning: Storing image without compression')
        const img = await fs.readFileSync(cover.path)

        fs.outputFile(`uploads/${path}`, img)
        fs.remove(cover.path)
      }
    } catch (e) {
      console.error('Error storing and compressing playlist image', e)
    }
  }
}
