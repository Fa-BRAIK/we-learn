import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { User } from '../users/user.entity'
import { Category } from '../categories/category.entity'
import { Tag } from '../tags/tag.entity'

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

  @ManyToMany(type => Category)
  @JoinTable()
  categories: Category[]

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[]
}
