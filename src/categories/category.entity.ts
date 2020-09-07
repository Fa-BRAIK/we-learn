import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Playlist } from '../playlists/playlist.entity'

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string
  @Column() description: string

  @ManyToMany(type => Playlist)
  playlists: Playlist[]
}
