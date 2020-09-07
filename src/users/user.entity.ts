import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Playlist } from '../playlists/playlist.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() username: string
  @Column() salt: string
  @Column() password: string

  @OneToMany(
    type => Playlist,
    playlist => playlist.user,
    { eager: true, onDelete: 'CASCADE' },
  )
  playlists: Playlist[]

  async validatePassword(password: string): Promise<boolean> {
    return this.password === (await bcrypt.hash(password, this.salt))
  }
}
