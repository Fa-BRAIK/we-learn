import { Playlist } from './playlist.entity'
import { Repository, EntityRepository, In } from 'typeorm'
import { CreatePlaylistDto } from './dto/create-playlist.dto'
import { User } from 'src/users/user.entity'
import { Category } from 'src/categories/category.entity'
import { Tag } from 'src/tags/tag.entity'
import { NotFoundException } from '@nestjs/common'
import { Objective } from 'src/objectives/objective.entity'
import { getConnection } from 'typeorm'

@EntityRepository(Playlist)
export class PlaylistsRepository extends Repository<Playlist> {
  async createPlaylist(
    createPlaylistDto: CreatePlaylistDto,
    user: User,
  ): Promise<Playlist> {
    const {
      title,
      description,
      link,
      categories,
      tags,
      objectives,
    } = createPlaylistDto

    const playlist = new Playlist()
    playlist.title = title
    playlist.description = description
    playlist.link = link
    playlist.user = user
    playlist.categories = await Category.findByIds(categories)
    playlist.tags = await this.addPlaylistTags(tags)
    playlist.objectives = await this.addPlaylistObjectives(objectives)
    await playlist.save()

    return playlist
  }

  async updatePlaylist(
    createPlaylistDto: CreatePlaylistDto,
    id: number,
  ): Promise<Playlist> {
    const playlist = await this.findOne(id)

    if (playlist) {
      const {
        title,
        description,
        link,
        categories,
        tags,
        objectives,
      } = createPlaylistDto

      playlist.title = title
      playlist.description = description
      playlist.link = link
      playlist.categories = await Category.findByIds(categories)
      playlist.tags = await this.addPlaylistTags(tags)
      playlist.objectives = await this.addPlaylistObjectives(objectives)
      await playlist.save()

      this.removeEmptyObjectives()

      return playlist
    } else {
      throw new NotFoundException('Playlist with giving id not found')
    }
  }

  private async addPlaylistTags(tags: string[]): Promise<Tag[]> {
    const playlist_tags: Tag[] = []
    const existing_tags = await Tag.find({ name: In(tags) })

    playlist_tags.push(...existing_tags)

    const remaining_tags = tags.filter(
      tag => playlist_tags.findIndex(record => record.name === tag) === -1,
    )

    for (const name of remaining_tags) {
      const tag = new Tag()
      tag.name = name
      await tag.save()
      playlist_tags.push(tag)
    }

    return playlist_tags
  }

  private async addPlaylistObjectives(
    objectives: { title: string; description: string }[],
  ): Promise<Objective[]> {
    const playlist_objectives: Objective[] = []

    for (const record of objectives) {
      const objective = new Objective()
      objective.title = record.title
      objective.description = record.description
      await objective.save()

      playlist_objectives.push(objective)
    }

    return playlist_objectives
  }

  private async removeEmptyObjectives(): Promise<void> {
    getConnection()
      .createQueryBuilder()
      .delete()
      .from(Objective)
      .where('playlistId IS NULL')
      .execute()
  }
}
