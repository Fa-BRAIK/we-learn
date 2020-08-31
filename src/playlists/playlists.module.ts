import { Module } from '@nestjs/common'
import { PlaylistsController } from './playlists.controller'
import { PlaylistsService } from './playlists.service'
import { PlaylistsRepository } from './playlists.repository'
import { AuthModule } from 'src/auth/auth.module'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    AuthModule,
    MulterModule.register({
      dest: './temp',
    }),
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistsRepository],
})
export class PlaylistsModule {}
