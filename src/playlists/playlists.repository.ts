import { Playlist } from './playlist.entity'
import { Repository, EntityRepository } from 'typeorm'

@EntityRepository(Playlist)
export class PlaylistsRepository extends Repository<Playlist> {}
