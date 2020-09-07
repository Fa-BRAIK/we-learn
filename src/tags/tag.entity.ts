import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
} from 'typeorm'
import { Playlist } from '../playlists/playlist.entity'

@Entity()
@Unique(['name'])
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  @ManyToMany(type => Playlist)
  playlists: Playlist[]
}
