import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PlaylistsModule } from './playlists/playlists.module'
import { FilesModule } from './files/files.module'
import { CategoriesModule } from './categories/categories.module'
import { TagsModule } from './tags/tags.module';
import { ObjectivesModule } from './objectives/objectives.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    PlaylistsModule,
    FilesModule,
    CategoriesModule,
    TagsModule,
    ObjectivesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
