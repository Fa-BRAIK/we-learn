import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { User } from 'src/users/user.entity'

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() title: string
  @Column({ type: 'text', nullable: true }) description: string
  @Column() link: string
  @Column({ nullable: true }) cover: string
  @Column() userId: number

  @ManyToOne(
    type => User,
    user => user.playlists,
    { eager: false },
  )
  user: User
}
