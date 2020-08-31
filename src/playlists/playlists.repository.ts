import { Playlist } from './playlist.entity'
import { Repository, EntityRepository } from 'typeorm'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { User } from 'src/users/user.entity'

@EntityRepository(Playlist)
export class PlaylistsRepository extends Repository<Playlist> {
  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
    user: User,
  ): Promise<Playlist> {
    const { title, description, link } = createPlaylistDto

    const playlist = new Playlist()
    playlist.title = title
    playlist.description = description
    playlist.link = link
    playlist.user = user
    await playlist.save()

    return playlist
  }
}
