import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() title: string
  @Column({ type: 'text', nullable: true }) description: string
  @Column() link: string
  @Column({ nullable: true }) cover: string
}
