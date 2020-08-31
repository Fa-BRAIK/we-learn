import { Module } from '@nestjs/common'
import { PlaylistsController } from './playlists.controller'
import { PlaylistsService } from './playlists.service'
import { PlaylistsRepository } from './playlists.repository'
import { AuthModule } from 'src/auth/auth.module'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistsRepository]),
    AuthModule,
    MulterModule.register({
      dest: './temp',
    }),
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  exports: [PlaylistsService],
})
export class PlaylistsModule {}
