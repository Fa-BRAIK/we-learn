import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule, PlaylistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
