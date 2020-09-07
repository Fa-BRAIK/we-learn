import { Playlist } from './playlist.entity'
import { Repository, EntityRepository } from 'typeorm'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { User } from 'src/users/user.entity'
import { Category } from 'src/categories/category.entity'
import { Tag } from 'src/tags/tag.entity'
import { InternalServerErrorException } from '@nestjs/common'

@EntityRepository(Playlist)
export class PlaylistsRepository extends Repository<Playlist> {
  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
    user: User,
  ): Promise<Playlist> {
    const { title, description, link, categories, tags } = createPlaylistDto

    const playlist_tags: Tag[] = []

    await tags.forEach(async name => {
      try {
        const tag = new Tag()
        tag.name = name
        await tag.save()

        playlist_tags.push(tag)
      } catch (e) {
        if (e.code === 'ER_DUP_ENTRY') {
          playlist_tags.push(await Tag.findOne({ name }))
        } else throw new InternalServerErrorException()
      }
    })

    const playlist = new Playlist()
    playlist.title = title
    playlist.description = description
    playlist.link = link
    playlist.user = user
    playlist.categories = await Category.findByIds(categories)
    playlist.tags = playlist_tags
    await playlist.save()

    return playlist
  }
}
