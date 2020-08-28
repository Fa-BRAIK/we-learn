import { Injectable } from '@nestjs/common'
import { PlaylistsRepository } from './playlists.repository'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(PlaylistsRepository)
    private readonly repository: PlaylistsRepository,
  ) {}

  async create(): Promise<void> {
    console.log('create')
  }
}
