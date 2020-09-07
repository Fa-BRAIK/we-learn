import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { Playlist } from '../playlists/playlist.entity'

@Entity()
export class Objective extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() title: string
  @Column() description: string

  @ManyToOne(
    type => Playlist,
    playlist => playlist.objectives,
    { eager: false },
  )
  playlist: Playlist
}
